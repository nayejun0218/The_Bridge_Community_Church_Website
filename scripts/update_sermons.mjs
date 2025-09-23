import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const PLAYLISTS = [
  { id: process.env.YT_PLAYLIST_GENESIS, series: '창세기 강해' },
  { id: process.env.YT_PLAYLIST_SPECIAL, series: '특별주일 설교' },
];

const YT_KEY = process.env.YT_API_KEY;

async function fetchPlaylistItems(playlistId, series) {
  if (!playlistId || !YT_KEY) {
    console.warn(`⚠️  플레이리스트 ID 또는 API 키가 없습니다: ${series}`);
    return [];
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  url.searchParams.set('part', 'snippet,contentDetails');
  url.searchParams.set('playlistId', playlistId);
  url.searchParams.set('maxResults', '50');
  url.searchParams.set('key', YT_KEY);

  let items = [];
  let nextPageToken = null;

  try {
    do {
      if (nextPageToken) url.searchParams.set('pageToken', nextPageToken);
      const res = await fetch(url);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMsg = errorData?.error?.message || `${res.status} ${res.statusText}`;
        throw new Error(`YouTube API 오류: ${errorMsg}`);
      }
      
      const data = await res.json();
      items = items.concat(data.items || []);
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return items.map(({ snippet, contentDetails }) => {
      const videoId = contentDetails?.videoId || snippet?.resourceId?.videoId;
      const title = snippet?.title || '';
      const published = snippet?.publishedAt || '';
      
      // 제목에서 날짜 추출 (2025.06.29 형식)
      const titleDateMatch = title.match(/(\d{4})\.(\d{1,2})\.(\d{1,2})/);
      let date = '';
      let sortDate = published; // 정렬용 기본값은 업로드 날짜
      
      if (titleDateMatch) {
        // 제목에서 날짜를 찾았으면 사용
        const [, year, month, day] = titleDateMatch;
        date = `${year}.${month.padStart(2,'0')}.${day.padStart(2,'0')}`;
        // 정렬용 날짜도 제목 날짜로 설정
        sortDate = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}T09:00:00Z`;
      } else {
        // 제목에 날짜가 없으면 업로드 날짜 사용
        const d = new Date(published);
        date = isNaN(d) ? '' :
          `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
        sortDate = published;
      }

      return {
        url: `https://youtu.be/${videoId}`,
        thumb: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        title,
        date,
        // 원본 발행 시각(정렬용) - 제목 날짜 우선
        publishedAt: sortDate,
        series,
      };
    });
  } catch (error) {
    console.error(`❌ 플레이리스트 ${series} 가져오기 실패:`, error.message);
    return [];
  }
}

async function updateSermons() {
  console.log('🚀 YouTube API를 통해 설교 데이터를 업데이트합니다...');
  
  if (!YT_KEY) {
    console.error('❌ YouTube API 키가 설정되지 않았습니다.');
    process.exit(1);
  }

  try {
    const results = await Promise.all(PLAYLISTS.map(p => fetchPlaylistItems(p.id, p.series)));
    
    // 하나의 배열로 합치고 원본 발행 시각 기준 최신순 정렬(안정적)
    const all = results
      .flat()
      .sort((a, b) => {
        const ta = Date.parse(a.publishedAt || 0) || 0;
        const tb = Date.parse(b.publishedAt || 0) || 0;
        return tb - ta; // 최신 우선
      });

    // publishedAt 필드 제거 (프론트엔드에서 불필요)
    const cleanedData = all.map(({ publishedAt, ...rest }) => rest);

    writeFileSync('sermons.json', JSON.stringify(cleanedData, null, 2));
    
    console.log(`✅ 업데이트 완료: ${cleanedData.length}개의 설교 데이터`);
    console.log(`📊 시리즈별 통계:`);
    
    const stats = cleanedData.reduce((acc, item) => {
      acc[item.series] = (acc[item.series] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(stats).forEach(([series, count]) => {
      console.log(`   - ${series}: ${count}개`);
    });
    
  } catch (error) {
    console.error('❌ 설교 데이터 업데이트 실패:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
updateSermons();

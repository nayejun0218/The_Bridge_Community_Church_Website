import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID; // 주보 폴더 ID
const DRIVE_API_KEY = process.env.DRIVE_API_KEY; // Google Drive API 키

async function fetchBulletins() {
  if (!DRIVE_FOLDER_ID || !DRIVE_API_KEY) {
    console.warn('⚠️  Google Drive API 키 또는 폴더 ID가 없습니다.');
    return [];
  }

  try {
    // Google Drive API로 폴더 내 PDF 파일들 가져오기
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.set('q', `'${DRIVE_FOLDER_ID}' in parents and mimeType='application/pdf'`);
    url.searchParams.set('orderBy', 'createdTime desc'); // 최신순
    url.searchParams.set('fields', 'files(id,name,createdTime,webViewLink,webContentLink)');
    url.searchParams.set('key', DRIVE_API_KEY);

    const res = await fetch(url);
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`Google Drive API 오류: ${errorData?.error?.message || res.statusText}`);
    }
    
    const data = await res.json();
    
    return (data.files || []).map(file => {
      // 파일명에서 날짜 추출 (예: 2025-09-22-주보.pdf)
      const dateMatch = file.name.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      let date = '';
      
      if (dateMatch) {
        const [, year, month, day] = dateMatch;
        date = `${year}.${month.padStart(2,'0')}.${day.padStart(2,'0')}`;
      } else {
        // 파일명에 날짜가 없으면 생성 날짜 사용
        const d = new Date(file.createdTime);
        date = `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
      }

      return {
        id: file.id,
        name: file.name,
        date,
        viewLink: file.webViewLink, // Google Drive에서 보기
        downloadLink: file.webContentLink, // 다운로드 링크
        createdTime: file.createdTime
      };
    });

  } catch (error) {
    console.error('❌ 주보 데이터 가져오기 실패:', error.message);
    return [];
  }
}

async function updateBulletins() {
  console.log('📋 Google Drive에서 주보 데이터를 업데이트합니다...');
  
  try {
    const bulletins = await fetchBulletins();
    
    // 최신순 정렬
    bulletins.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
    
    writeFileSync('bulletins.json', JSON.stringify(bulletins, null, 2));
    
    console.log(`✅ 업데이트 완료: ${bulletins.length}개의 주보 데이터`);
    
    if (bulletins.length > 0) {
      console.log(`📊 최신 주보: ${bulletins[0].name} (${bulletins[0].date})`);
    }
    
  } catch (error) {
    console.error('❌ 주보 데이터 업데이트 실패:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
updateBulletins();

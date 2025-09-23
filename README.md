# The Bridge Community Church Website

더브릿지커뮤니티 교회 공식 웹사이트

## 🚀 주요 기능

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **자동 설교 업데이트**: GitHub Actions로 매주 월요일 YouTube 플레이리스트 동기화
- **빠른 로딩**: 정적 호스팅 최적화, CDN 캐싱 지원

## 📋 설정 방법

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정 (.env)
```env
YT_API_KEY=your_youtube_api_key_here
YT_PLAYLIST_GENESIS=your_genesis_playlist_id_here
YT_PLAYLIST_SPECIAL=your_special_playlist_id_here
PORT=3000
```

### 3. GitHub Secrets 설정
Repository Settings > Secrets and variables > Actions에서 추가:
- `YT_API_KEY`: YouTube Data API v3 키
- `YT_PLAYLIST_GENESIS`: 창세기 강해 플레이리스트 ID
- `YT_PLAYLIST_SPECIAL`: 특별주일 설교 플레이리스트 ID

## 🖥️ 로컬 개발

### 개발 서버 실행
```bash
npm run dev
```

### 수동 설교 데이터 업데이트
```bash
npm run update-sermons
```

## 📺 설교 데이터 자동 업데이트

- **주기**: 매주 월요일 오전 9시 (KST)
- **방식**: GitHub Actions가 YouTube API를 호출하여 `sermons.json` 업데이트
- **배포**: 변경사항 자동 커밋 → 정적 호스팅 자동 배포

## 🌐 배포

### Netlify
1. GitHub 연동
2. Build command: `npm install`
3. Publish directory: `/`

### Vercel
1. GitHub 연동
2. Framework: Other
3. Build Command: `npm install`
4. Output Directory: `./`

### GitHub Pages
1. Settings > Pages > Deploy from a branch
2. Source: `main` branch / `/ (root)`

## 📁 프로젝트 구조

```
├── .github/workflows/
│   └── update-sermons.yml     # 주간 자동 업데이트
├── scripts/
│   └── update_sermons.mjs     # 설교 데이터 업데이트 스크립트
├── style/                     # CSS 파일들
├── images/                    # 이미지 리소스
├── page/                      # 하위 페이지들
├── sermons.json              # 설교 데이터 (자동 업데이트)
├── index.html                # 메인 페이지
├── server_simple.js          # 로컬 개발용 서버
└── package.json
```

## 🔧 유지보수

### YouTube API 할당량 모니터링
- 무료 계정: 일일 10,000 단위
- 주간 업데이트: 약 200 단위 사용
- [Google Cloud Console](https://console.cloud.google.com/)에서 확인

### 설교 시리즈 추가
1. YouTube에서 새 플레이리스트 생성
2. `scripts/update_sermons.mjs`의 `PLAYLISTS` 배열에 추가
3. GitHub Secrets에 플레이리스트 ID 추가

## 📞 문의

- 웹사이트: [더브릿지커뮤니티 교회](https://your-domain.com)
- 이메일: contact@thebridgecommunity.church
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 서빙 (보안 강화)
app.use(express.static(__dirname, {
  dotfiles: 'ignore',
  etag: true,
  maxAge: '1h',
  setHeaders: (res, path) => {
    // JSON 파일은 캐시 시간 단축 (매주 업데이트되므로)
    if (path.endsWith('.json')) {
      res.set('Cache-Control', 'public, max-age=3600'); // 1시간
    }
    // HTML 파일은 항상 최신 버전 확인
    if (path.endsWith('.html')) {
      res.set('Cache-Control', 'public, max-age=300'); // 5분
    }
  }
}));

// SPA 라우팅 지원 (모든 경로를 index.html로)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🌐 정적 호스팅 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`🔗 http://localhost:${PORT} 에서 확인하세요.`);
  console.log('📺 설교 데이터는 GitHub Actions로 주간 자동 업데이트됩니다.');
});

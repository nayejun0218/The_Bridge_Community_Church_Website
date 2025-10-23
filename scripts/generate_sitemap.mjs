#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// 사이트맵 생성 함수
function generateSitemap() {
  const baseUrl = 'https://tbcc.or.kr';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // 페이지 우선순위 정의
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/page/sermon/sermon.html', priority: '0.9', changefreq: 'weekly' },
    { url: '/page/sermon/bulletin.html', priority: '0.8', changefreq: 'weekly' },
    { url: '/page/church-intro/preview.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/page/church-intro/pastor.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/page/ministry/worship.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/page/contact/contact.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/page/contact/location.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/page/church-intro/history.html', priority: '0.7', changefreq: 'monthly' },
    { url: '/page/ministry/online.html', priority: '0.7', changefreq: 'monthly' },
    { url: '/page/ministry/volunteer.html', priority: '0.7', changefreq: 'monthly' },
    { url: '/page/church-intro/faq.html', priority: '0.6', changefreq: 'monthly' },
    { url: '/page/contact/offering.html', priority: '0.6', changefreq: 'monthly' }
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  pages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// robots.txt 생성 함수
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# 주요 페이지들
Sitemap: https://tbcc.or.kr/sitemap.xml

# 크롤링 지연 (서버 부하 방지)
Crawl-delay: 1

# 특정 파일 제외
Disallow: /node_modules/
Disallow: /scripts/
Disallow: /*.json$
Disallow: /server_simple.js
Disallow: /package.json
Disallow: /package-lock.json`;
}

// 파일 생성
try {
  fs.writeFileSync('public/sitemap.xml', generateSitemap());
  fs.writeFileSync('public/robots.txt', generateRobotsTxt());
  console.log('✅ public/sitemap.xml과 public/robots.txt가 성공적으로 생성되었습니다!');
} catch (error) {
  console.error('❌ 파일 생성 중 오류 발생:', error);
}

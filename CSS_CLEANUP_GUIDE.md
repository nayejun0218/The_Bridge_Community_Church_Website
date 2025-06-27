# CSS 정리 및 반응형 개선 가이드

## 완료된 작업

### 1. index.html 정리 완료
- 모든 인라인 스타일 제거
- CSS 클래스로 대체하여 유지보수성 향상
- 모바일 반응형 디자인 완전 적용

### 2. 새로운 CSS 클래스 추가 (style.css)

#### 가이드 섹션 스타일
```css
.guide-section
.guide-cards
.guide-card-link
.guide-card
```

#### 성경 강해 시리즈 섹션
```css
.bible-series-section
.bible-series-slider-wrapper
.bible-series-slider
.slider-prev, .slider-next
```

#### 브릿지 소셜 섹션
```css
.bridge-social-section
.bridge-social-cards
.bridge-social-card-link
.bridge-social-card
.bridge-social-logo
.bridge-social-text
```

#### 연락처 정보 카드
```css
.contact-info-cards
.contact-info-card
.contact-info-content
.contact-info-text
.contact-info-text.blue
.contact-info-text.small
.contact-info-text.margin-top
.contact-info-text.margin-bottom
```

#### 기타 공통 스타일
```css
.welcome-bridge-message
.welcome-bridge-message.blue
.quote-block
.quote-author
.location-cards
.sermon-section-title-wrap
#toggle-sermon-list
.sermon-section-title.margin-top
h2.no-margin-top
```

### 3. 완전한 반응형 디자인
- 1200px, 1024px, 900px, 768px, 600px, 480px 브레이크포인트
- 모든 요소의 폰트 크기, 패딩, 마진 최적화
- 모바일에서 햄버거 메뉴 완전 작동

## 남은 작업 (다른 HTML 파일들)

### 1. page/contact/contact.html ✅ 완료
- 인라인 스타일 제거 완료
- 새로운 CSS 클래스 적용 완료

### 2. page/info/offering.html
현재 인라인 스타일:
```html
<p style="margin-bottom:2.5rem;">
<div class="bridge-social-cards" style="display:grid; grid-template-columns:1fr; gap:2.2rem; max-width:480px; margin:2.5rem auto 2rem auto;">
<div class="bridge-social-card-link" style="pointer-events:none; cursor:default;">
<div style="display:flex; flex-direction:column; gap:0.2rem; margin-left:1.2rem;">
<span class="bridge-social-text" style="font-weight:700; font-size:1.1rem;">
<span class="bridge-social-text" style="color:#1976d2; font-size:1.05rem;">
<blockquote style="text-align:center; font: size 1.2rem; color:#8c8682; font-style:italic; margin:3.5rem auto 2.5rem auto; max-width:900px;">
<span style="display:inline-block; margin-top:1.2rem; font-size:0.8rem; color:#6ca77a; font-style:normal;">
```

변경 방법:
```html
<p class="contact-info-text margin-bottom">
<div class="contact-info-cards">
<div class="contact-info-card">
<div class="contact-info-content">
<span class="contact-info-text">
<span class="contact-info-text blue">
<blockquote class="quote-block">
<span class="quote-author">
```

### 3. page/contact/welcome.html
현재 인라인 스타일:
```html
<div class="welcome-bridge-message" style="margin-top:2rem; font-size:1.08rem; color:#3498db; line-height:1.7; text-align:center;">
```

변경 방법:
```html
<div class="welcome-bridge-message blue">
```

### 4. page/sharing/sermon.html
현재 인라인 스타일:
```html
<div class="sermon-section-title-wrap" style="display: flex; align-items: center; justify-content: space-between;">
<button id="toggle-sermon-list" style="background:none;border:none;cursor:pointer;font-size:2rem;line-height:1;outline:none;padding:0 0.5rem;">
<div class="sermon-section-title" style="margin-top:2.5rem;">
```

변경 방법:
```html
<div class="sermon-section-title-wrap">
<button id="toggle-sermon-list">
<div class="sermon-section-title margin-top">
```

### 5. page/sharing/prayer.html
현재 인라인 스타일:
```html
<p style="margin-top:1.2rem; color:#555; font-size:0.98rem;">
```

변경 방법:
```html
<p class="contact-info-text small margin-top">
```

### 6. page/about/location.html
현재 인라인 스타일:
```html
<div class="bridge-social-cards" style="display:grid; grid-template-columns:repeat(2,1fr); gap:2.2rem; max-width:600px; margin:2.5rem auto 0 auto;">
```

변경 방법:
```html
<div class="location-cards">
```

### 7. page/about/pastor.html
현재 인라인 스타일:
```html
<h2 style="margin-top:0;">
```

변경 방법:
```html
<h2 class="no-margin-top">
```

## CSS 클래스 사용법

### 1. 연락처 정보 카드
```html
<div class="contact-info-cards">
  <div class="contact-info-card">
    <div class="bridge-social-card">
      <img src="..." class="bridge-social-logo">
      <div class="contact-info-content">
        <span class="contact-info-text">내용</span>
      </div>
    </div>
  </div>
</div>
```

### 2. 인용문
```html
<blockquote class="quote-block">
  인용문 내용
  <span class="quote-author">작성자</span>
</blockquote>
```

### 3. 위치 정보 카드
```html
<div class="location-cards">
  <!-- 카드 내용 -->
</div>
```

### 4. 제목 스타일
```html
<h2 class="no-margin-top">제목</h2>
<div class="sermon-section-title margin-top">제목</div>
```

## 모바일 반응형 특징

### 1. 햄버거 메뉴
- 768px 이하에서 자동 표시
- 완전한 모바일 네비게이션 지원
- 드롭다운 메뉴 모바일 최적화

### 2. 그리드 레이아웃
- 데스크톱: 5열 (가이드), 3열 (소셜)
- 태블릿: 3-2열
- 모바일: 1열

### 3. 폰트 크기 조정
- 데스크톱: 2rem (제목), 1rem (본문)
- 태블릿: 1.8rem (제목), 0.95rem (본문)
- 모바일: 1.4rem (제목), 0.85rem (본문)

### 4. 패딩/마진 최적화
- 데스크톱: 4rem 섹션 패딩
- 태블릿: 3.5rem 섹션 패딩
- 모바일: 2.5rem 섹션 패딩

## 다음 단계

1. 위에 나열된 HTML 파일들의 인라인 스타일을 제거하고 CSS 클래스로 대체
2. 각 페이지별로 테스트하여 모바일 반응형 확인
3. 필요시 추가 CSS 클래스 생성
4. 전체 사이트 모바일 사용성 검증

## 주의사항

- 기존 기능은 그대로 유지
- 모든 스타일 변경은 CSS 파일에서만 수행
- HTML 파일은 구조와 콘텐츠만 담당
- 반응형 디자인은 모든 화면 크기에서 테스트 필요 
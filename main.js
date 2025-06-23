// 카드/버튼 호버 애니메이션
const quickCards = document.querySelectorAll('.quick-link-card');
quickCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.06)';
    card.style.boxShadow = '0 6px 24px rgba(44,62,80,0.13)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});

// 공지사항 롤링(자동 슬라이드)
const noticeList = document.getElementById('notice-rolling');
if (noticeList) {
  let idx = 0;
  const items = Array.from(noticeList.children);
  setInterval(() => {
    items.forEach((li, i) => {
      li.style.display = (i === idx) ? 'list-item' : 'none';
    });
    idx = (idx + 1) % items.length;
  }, 3500);
  // 최초 1개만 보이게
  items.forEach((li, i) => { li.style.display = (i === 0) ? 'list-item' : 'none'; });
}

// 부드러운 스크롤(내부 anchor 이동)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 헤더 동적 효과(스크롤 시 그림자)
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 2px 8px rgba(44,62,80,0.13)';
      header.style.background = '#fff';
    } else {
      header.style.boxShadow = '';
      header.style.background = '';
    }
  }
});

// AOS(스크롤 애니메이션) 초기화
if (window.AOS) {
  AOS.init({
    duration: 800,
    once: true
  });
}

// 배너 슬라이드
(function() {
  const banners = document.querySelectorAll('.banner-img');
  const dots = document.querySelectorAll('.banner-dots .dot');
  let idx = 0;
  function showBanner(i) {
    banners.forEach((img, n) => img.classList.toggle('active', n === i));
    dots.forEach((dot, n) => dot.classList.toggle('active', n === i));
    idx = i;
  }
  function nextBanner() { showBanner((idx+1)%banners.length); }
  let timer = setInterval(nextBanner, 4000);
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { showBanner(i); clearInterval(timer); timer = setInterval(nextBanner, 4000); });
  });
})();

// 탭/아코디언
(function() {
  const btns = document.querySelectorAll('.tab-btn');
  const tabs = document.querySelectorAll('.tab-content');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });
})();

// 스크롤 프로그레스 바
(function() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (window.scrollY / h) * 100;
    if (bar) bar.style.width = percent + '%';
  });
})();

// 로딩 인트로
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 900);
});
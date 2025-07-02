// 햄버거 메뉴 기능 초기화 함수
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const dropdowns = document.querySelectorAll('.dropdown');
  
  console.log('햄버거 메뉴 초기화:', { hamburger, navLinks, overlay, dropdownsLength: dropdowns.length });
  
  // 햄버거 메뉴 토글
  if (hamburger && navLinks && overlay) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('햄버거 메뉴 클릭됨');
      
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
      
      console.log('클래스 상태:', {
        hamburgerActive: hamburger.classList.contains('active'),
        navLinksActive: navLinks.classList.contains('active'),
        overlayActive: overlay.classList.contains('active')
      });
    });
    
    // 오버레이 클릭 시 메뉴 닫기
    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // 메뉴 외부 클릭 시 닫기 (오버레이 제외)
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && !overlay.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // 모바일 아코디언 드롭다운
    dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('a');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (link && menu) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            // 아코디언: 자신만 active, 나머지는 닫힘
            dropdowns.forEach(other => {
              if (other !== dropdown) {
                other.classList.remove('active');
              }
            });
            dropdown.classList.toggle('active');
          }
        });
      }
    });
    
    // 링크 클릭 시 메뉴 닫기 (하위 메뉴만)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          // 상위 카테고리(드롭다운 토글)는 닫지 않음
          if (link.parentElement.classList.contains('dropdown')) {
            // preventDefault는 이미 아코디언에서 처리됨
            return;
          }
          // 하위 메뉴(실제 페이지 이동)만 닫기
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  } else {
    console.log('햄버거 메뉴 또는 네비게이션 링크를 찾을 수 없음');
  }
}

// 헤더 로드 후 햄버거 메뉴 초기화
function loadHeaderAndInit() {
  fetch('header.html')
    .then(res => res.text())
    .then(data => { 
      document.getElementById('header').innerHTML = data;
      // 헤더가 실제로 DOM에 삽입된 직후에 바로 초기화
      initHamburgerMenu();
    })
    .catch(error => {
      console.error('헤더 로드 실패:', error);
    });
}

// 페이지 로드 시 헤더 로드 및 초기화
if (document.getElementById('header')) {
  loadHeaderAndInit();
} else {
  document.addEventListener('DOMContentLoaded', initHamburgerMenu);
}

// 모든 페이지에서 헤더 로드 후 햄버거 메뉴 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 헤더가 이미 로드되어 있는지 확인
  const header = document.querySelector('header');
  if (header) {
    // 헤더가 이미 있으면 바로 초기화
    setTimeout(initHamburgerMenu, 100);
  } else {
    // 헤더가 없으면 로드 후 초기화
    loadHeaderAndInit();
  }
});

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

let isArabic = true;
let isDark = true;

window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 50);
});

const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 90);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(r => obs.observe(r));

function toggleLang() {
  isArabic = !isArabic;
  const html = document.documentElement;
  html.setAttribute('lang', isArabic ? 'ar' : 'en');
  html.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
  document.getElementById('langLabel').textContent = isArabic ? 'English' : 'عربي';

  document.querySelectorAll('[data-ar]').forEach(el => {
    const val = isArabic ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    if (val !== null) {
      el.innerHTML = val;
    }
  });

  document.getElementById('footerText').innerHTML = isArabic
    ? '© 2025 محمد شحاته — مترجم لغة إشارة معتمد | صُنع بـ <span class="gold">❤️</span> من أجل مجتمع الصم'
    : '© 2025 Mohamed Shahata — Certified Sign Language Interpreter | Made with <span class="gold">❤️</span> for the Deaf community';

  updateThemeLabel();
}

function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle('light', !isDark);
  document.getElementById('themeIcon').textContent = isDark ? '☀️' : '🌙';
  updateThemeLabel();
}

function updateThemeLabel() {
  const label = document.getElementById('themeLabel');
  if (isDark) label.textContent = isArabic ? 'فاتح' : 'Light';
  else label.textContent = isArabic ? 'داكن' : 'Dark';
}

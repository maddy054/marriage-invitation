/* ═══════════════════════════════════════════════
   WEDDING INVITATION — TRANSLATIONS & ANIMATIONS
   ═══════════════════════════════════════════════ */

/* ── Translation Data ── */
const translations = {
  en: {
    hero_eyebrow:       'With the blessings of God',
    groom_name:         'Ayyalu Samy',
    bride_name:         'Jayasutha',
    hero_subtitle:      'are joyfully united in holy matrimony',
    families_label:     'The Families',
    groom_side:         "Groom's Family",
    groom_father:       'Mr. P. Ayyalusamy',
    groom_father_rel:   'Father',
    groom_mother:       'Mrs. A. Jeevarani',
    groom_mother_rel:   'Mother',
    groom_address:      'Koottupannai',
    groom_personal:     'B.E., Motherson Robis, Chennai',
    bride_side:         "Bride's Family",
    bride_father:       'Mr. K. Subburaj',
    bride_father_rel:   'Father',
    bride_mother:       'Mrs. S. Susila',
    bride_mother_rel:   'Mother',
    bride_address:      'Kulathulvaipatti',
    bride_personal:     'B.E.',

    ceremony_label:     'The Ceremony',
    muhurtham_label:    'Muhurtham',
    muhurtham_time:     '7.35 a.m. – 9.00 a.m.',
    date_label:         'Date',
    wedding_date:       '25th October 2026',
    day_label:          'Day',
    wedding_day:        'Sunday',
    venue_label:        'Venue',
    venue_name:         'Sivanarayanan Thirumana Mandapam',
    venue_address:      'Main Road, Kayathar',

    directions_label:   'How to Reach Us',
    directions_sub:     'We look forward to your gracious presence',
    directions_btn:     'Get Directions',

    closing_message:    'Mr. P. Ayyalusamy &amp; Mrs. A. Jeevarani, Koottupannai<br>and Mr. K. Subburaj &amp; Mrs. S. Susila, Kulathulvaipatti<br>cordially solicit your esteemed presence with family and friends.',
    closing_compliments:'Best Compliments: Relatives &amp; Friends',
    closing_tamil_verse:'வாழ்க வளமுடன் — May you flourish with abundance',
  },

  ta: {
    hero_eyebrow:       'இறைவன் அருளால்',
    groom_name:         'அய்யலுசாமி',
    bride_name:         'ஜெயசுதா',
    hero_subtitle:      'திருமண வாழ்வில் இணைகின்றனர்',

    families_label:     'குடும்பங்கள்',
    groom_side:         'மணமகன் குடும்பம்',
    groom_father:       'திரு. பி. அய்யலுசாமி',
    groom_father_rel:   'தந்தை',
    groom_mother:       'திருமதி. அ. ஜீவராணி',
    groom_mother_rel:   'தாய்',
    groom_address:      'கூட்டுப்பண்ணை',
    groom_personal:     'B.E., மதர்சன் ரோபிஸ், சென்னை',
    bride_side:         'மணமகள் குடும்பம்',
    bride_father:       'திரு. கே. சுப்புராஜ்',
    bride_father_rel:   'தந்தை',
    bride_mother:       'திருமதி. எஸ். சுசீலா',
    bride_mother_rel:   'தாய்',
    bride_address:      'குளத்துள்வாய்பட்டி',
    bride_personal:     'B.E.',

    ceremony_label:     'திருமண நிகழ்வு',
    muhurtham_label:    'முகூர்த்த நேரம்',
    muhurtham_time:     'காலை 7.35 – 9.00',
    date_label:         'தேதி',
    wedding_date:       '25 அக்டோபர் 2026',
    day_label:          'நாள்',
    wedding_day:        'ஞாயிற்றுக்கிழமை',
    venue_label:        'திருமண மண்டபம்',
    venue_name:         'சிவநாராயணன் திருமண மண்டபம்',
    venue_address:      'மெயின் ரோடு, கயத்தார்',

    directions_label:   'வழி அறிவுரை',
    directions_sub:     'உங்கள் வருகையை மனமார வேண்டுகிறோம்',
    directions_btn:     'வழிகாட்டி பெறுக',

    closing_message:    'திரு. பி. அய்யலுசாமி &amp; திருமதி. அ. ஜீவராணி, கூட்டுப்பண்ணை<br>மற்றும் திரு. கே. சுப்புராஜ் &amp; திருமதி. எஸ். சுசீலா, குளத்துள்வாய்பட்டி<br>ஆகியோர் உங்களை அன்புடன் அழைக்கின்றனர்.',
    closing_compliments:'சுப மங்கள வாழ்த்துக்கள்: உறவினர்கள் &amp; நண்பர்கள்',
    closing_tamil_verse:'வாழ்க வளமுடன் — நீங்கள் வளமுடன் வாழட்டும்',
  }
};

/* ── Language State ── */
let currentLang = localStorage.getItem('inv-lang') || 'en';

function applyLanguage(lang, animate = false) {
  const body = document.body;
  const elements = document.querySelectorAll('[data-i18n]');

  if (animate) {
    body.classList.add('lang-switching');
    setTimeout(() => body.classList.remove('lang-switching'), 400);
  }

  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = translations[lang][key];
    if (text !== undefined) {
      el.innerHTML = text;
    }
  });

  // Toggle Tamil font class
  if (lang === 'ta') {
    body.classList.add('lang-ta');
    document.documentElement.setAttribute('lang', 'ta');
  } else {
    body.classList.remove('lang-ta');
    document.documentElement.setAttribute('lang', 'en');
  }

  // Update toggle button states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  currentLang = lang;
  localStorage.setItem('inv-lang', lang);
}

/* ── Toggle Button Wiring ── */
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    if (lang !== currentLang) {
      applyLanguage(lang, true);
    }
  });
});

/* ═══════════════════════════════════════════════
   ENTRANCE ANIMATIONS — IntersectionObserver
   ═══════════════════════════════════════════════ */
const animClasses = [
  '.anim-fade-up',
  '.anim-slide-left',
  '.anim-slide-right',
  '.anim-fade-in',
  '.anim-scale-in',
];

const animElements = document.querySelectorAll(animClasses.join(','));

// Respect reduced-motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Make everything visible immediately
  animElements.forEach(el => {
    el.style.opacity = '1';
    el.classList.add('is-visible');
  });
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  animElements.forEach(el => observer.observe(el));

  // Immediately reveal elements already in viewport on load
  // (above-fold hero content)
  const revealInViewport = () => {
    animElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-visible');
        observer.unobserve(el);
      }
    });
  };

  // Run after a brief paint delay so CSS is applied first
  requestAnimationFrame(() => requestAnimationFrame(revealInViewport));
}

/* ── Init: apply saved language on load ── */
applyLanguage(currentLang, false);

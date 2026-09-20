/* ═══════════════════════════════════════════════
   WEDDING INVITATION — ENVELOPE INTRO + MUSIC
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Petal emitter ── */
  function spawnPetals(container) {
    const petals = ['🌸', '🌺', '✿', '❀', '🌼'];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'intro-petal';
      el.textContent = petals[i % petals.length];
      el.style.left = (Math.random() * 100) + '%';
      el.style.fontSize = (0.7 + Math.random() * 0.8) + 'rem';
      el.style.animationDuration = (8 + Math.random() * 10) + 's';
      el.style.animationDelay = (Math.random() * 6) + 's';
      container.appendChild(el);
    }
  }

  /* ── Build intro DOM ── */
  function buildIntro() {
    const overlay = document.createElement('div');
    overlay.id = 'intro-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Wedding invitation opening');

    overlay.innerHTML = `
      <div class="envelope-scene">
        <!-- Envelope -->
        <div class="envelope-wrap" id="envelope-wrap" role="button" tabindex="0" aria-label="Open the invitation">
          <div class="envelope-body">
            <!-- Letter card inside -->
            <div class="envelope-letter">
              <span class="letter-ornament">✦ ✦ ✦</span>
              <span class="letter-monogram">A &amp; J</span>
              <span class="letter-ornament">✦ ✦ ✦</span>
            </div>
          </div>
          <!-- Flap -->
          <div class="envelope-flap">
            <div class="envelope-flap-face"></div>
            <div class="envelope-flap-inner"></div>
          </div>
          <!-- Wax seal -->
          <div class="envelope-seal" aria-hidden="true">🌸</div>
        </div>

        <!-- Text -->
        <div class="intro-text">
          <p class="intro-eyebrow">You are cordially invited</p>
          <h1 class="intro-title">Ayyalu Samy &amp; Jayasutha</h1>
          <p class="intro-subtitle">are joyfully united in holy matrimony</p>
        </div>

        <!-- CTA -->
        <button class="intro-cta" id="intro-open-btn" type="button" aria-label="Open the invitation">
          Open Invitation
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>

        <!-- Music hint -->
        <p class="intro-music-hint" aria-live="polite">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          Music will play when you open the invitation
        </p>
      </div>
    `;

    spawnPetals(overlay);
    document.body.appendChild(overlay);
    return overlay;
  }

  /* ── Music: play once on intro dismiss ── */
  function attemptMusicPlay() {
    // Signal to music.js that user has interacted — dispatch a synthetic click
    // so the onFirstInteraction handler in music.js fires
    document.dispatchEvent(new Event('intro-opened'));
  }

  /* ── Dismiss intro and reveal invitation ── */
  function openInvitation(overlay) {
    overlay.classList.add('is-exiting');
    // Restore scroll and focus
    document.body.style.overflow = '';
    // After transition, remove overlay entirely
    overlay.addEventListener('transitionend', () => {
      overlay.remove();
    }, { once: true });
    // Attempt music play (user gesture context)
    attemptMusicPlay();
    // Mark as seen so we don't show again this session
    sessionStorage.setItem('inv-intro-seen', '1');
  }

  /* ── Envelope open animation then dismiss ── */
  function triggerEnvelopeOpen(overlay) {
    const wrap = overlay.querySelector('#envelope-wrap');
    if (!wrap || wrap.classList.contains('is-open')) return;
    wrap.classList.add('is-open');
    // After envelope animation completes, dismiss overlay
    setTimeout(() => openInvitation(overlay), 1100);
  }

  /* ── Init ── */
  function init() {
    // Skip intro if already seen this session
    if (sessionStorage.getItem('inv-intro-seen')) return;

    // Lock scroll while intro is showing
    document.body.style.overflow = 'hidden';

    const overlay = buildIntro();

    const openBtn = overlay.querySelector('#intro-open-btn');
    const envelopeWrap = overlay.querySelector('#envelope-wrap');

    // CTA button click
    openBtn.addEventListener('click', () => triggerEnvelopeOpen(overlay));

    // Envelope click/keyboard
    envelopeWrap.addEventListener('click', () => triggerEnvelopeOpen(overlay));
    envelopeWrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerEnvelopeOpen(overlay);
      }
    });

    // Escape key to skip
    document.addEventListener('keydown', function onEsc(e) {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', onEsc);
        openInvitation(overlay);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

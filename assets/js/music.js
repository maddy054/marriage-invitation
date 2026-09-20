/* ═══════════════════════════════════════════════
   WEDDING INVITATION — OPENING CHIME (Web Audio API)
   Plays a single brief, tasteful tone when the invitation is opened.
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /**
   * Synthesise a gentle wedding chime using the Web Audio API.
   * Three harmonically-related sine tones fade in and decay naturally —
   * total duration ≈ 2.4 s, non-looping.
   */
  function playOpeningChime() {
    let ctx;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return; // Audio not supported — fail silently
    }

    // Resume context if it was suspended (required in some browsers)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.04);
    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.4);
    masterGain.connect(ctx.destination);

    // Chime frequencies: root, major-third, perfect-fifth (E4, G#4, B4 ≈ 329, 415, 494 Hz)
    const notes = [329.63, 415.30, 493.88];
    const offsets = [0, 0.12, 0.24]; // stagger each note slightly

    notes.forEach(function (freq, i) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Gentle vibrato for warmth
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(5.5, ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(ctx.currentTime + offsets[i]);
      lfo.stop(ctx.currentTime + 2.4);

      gain.gain.setValueAtTime(0, ctx.currentTime + offsets[i]);
      gain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + offsets[i] + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offsets[i] + 2.2);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(ctx.currentTime + offsets[i]);
      osc.stop(ctx.currentTime + offsets[i] + 2.4);
    });

    // Close context after chime finishes to free resources
    setTimeout(function () {
      ctx.close();
    }, 3000);
  }

  /* ── Listen for the intro-opened event dispatched by intro.js ── */
  document.addEventListener('intro-opened', function () {
    playOpeningChime();
  }, { once: true });

})();

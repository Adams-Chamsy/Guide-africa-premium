/**
 * Sound Design utility (Item 74)
 * Subtle optional sounds for luxury interactions
 * Disabled by default — user must opt-in via Settings
 */

let soundEnabled = false;

// Check localStorage for sound preference
try {
  soundEnabled = localStorage.getItem('guideafrica_sounds') === 'true';
} catch (e) {
  // silent
}

export const setSoundEnabled = (enabled) => {
  soundEnabled = enabled;
  try {
    localStorage.setItem('guideafrica_sounds', enabled.toString());
  } catch (e) {
    // silent
  }
};

export const isSoundEnabled = () => soundEnabled;

// Lazy-load Howler only when sounds are enabled
let Howl = null;
const loadHowler = async () => {
  if (Howl) return;
  try {
    const module = await import('howler');
    Howl = module.Howl;
  } catch (e) {
    // silent
  }
};

// Sound cache
const soundCache = {};

const playSound = async (url, volume = 0.3) => {
  if (!soundEnabled) return;
  await loadHowler();
  if (!Howl) return;

  if (!soundCache[url]) {
    soundCache[url] = new Howl({ src: [url], volume, preload: true });
  }
  soundCache[url].play();
};

// Pre-built sound effects using Web Audio API as fallback
const createTone = (frequency, duration, volume = 0.1) => {
  if (!soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.value = volume;
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    // Web Audio not available
  }
};

// Public API for sound effects
export const sounds = {
  click: () => createTone(800, 0.08, 0.05),
  favorite: () => {
    createTone(523, 0.1, 0.06);
    setTimeout(() => createTone(659, 0.1, 0.06), 80);
    setTimeout(() => createTone(784, 0.15, 0.06), 160);
  },
  notification: () => {
    createTone(880, 0.15, 0.08);
    setTimeout(() => createTone(1047, 0.2, 0.08), 150);
  },
  success: () => {
    createTone(523, 0.1, 0.05);
    setTimeout(() => createTone(659, 0.1, 0.05), 100);
    setTimeout(() => createTone(784, 0.15, 0.05), 200);
    setTimeout(() => createTone(1047, 0.2, 0.05), 300);
  },
  error: () => {
    createTone(330, 0.2, 0.06);
    setTimeout(() => createTone(262, 0.3, 0.06), 200);
  },
};

export default sounds;

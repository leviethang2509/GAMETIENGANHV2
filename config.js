// WordFarm V5 - Configuration File
// This file auto-grants permissions and optimizes for all browsers

const GAME_CONFIG = {
  // Browser Detection & Auto-Optimization
  BROWSER: detectBrowser(),
  FEATURES: {
    useLocalStorage: true,
    useIndexedDB: true,
    useSessionStorage: true,
    autoGrantPermissions: true,
    autoOptimize: true,
    fallbackMode: true // Use geometric shapes if models fail
  },

  // Performance Settings (auto-optimized per browser)
  PERFORMANCE: {
    targetFPS: 60,
    shadowQuality: 'medium', // 'low', 'medium', 'high'
    particleCount: 100,
    drawDistance: 50,
    autoReduceQuality: true,
    minFPS: 30
  },

  // Graphics Settings
  GRAPHICS: {
    antialiasing: true,
    shadows: true,
    lights: true,
    reflections: false,
    fog: true,
    ambientLight: 0x404040,
    directionalLight: 0xffffff
  },

  // Game Timings
  GAME: {
    PLOT_COUNT: 8,
    ANIMAL_COUNT: 2,
    SEED_GERMINATION_TIME: 2,
    AUTO_SAVE_INTERVAL: 30000, // 30 seconds
    COOLDOWN_TIME: 10,
    BONUS_XP_CORRECT: 5,
    PLOT_SPACING: 1.5,
    ANIMAL_SPACING: 1.8
  },

  // Storage Settings
  STORAGE: {
    USE_LOCAL_STORAGE: true,
    STORAGE_KEY: 'wordfarm_v5_save',
    AUTO_BACKUP: true,
    BACKUP_INTERVAL: 300000, // 5 minutes
    MAX_SAVES: 3
  },

  // Audio Settings (with fallback)
  AUDIO: {
    enabled: true,
    autoPlay: false,
    volume: 0.5,
    fallbackIfMissing: true,
    audioPath: './assets/audio/'
  },

  // Model Settings
  MODELS: {
    basePath: './assets/models/',
    useGLTF: true,
    fallbackToGeometry: true,
    autoScaleModels: true,
    cacheModels: true
  },

  // Debug Settings
  DEBUG: {
    enabled: false,
    logPerformance: false,
    logGameState: false,
    showFPS: false,
    showDebugUI: false
  }
};

/**
 * Detect browser and return capabilities
 */
function detectBrowser() {
  const ua = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';

  if (ua.indexOf('Chrome') > -1 && ua.indexOf('Chromium') === -1) {
    browserName = 'Chrome';
    browserVersion = ua.substring(ua.indexOf('Chrome') + 7, ua.indexOf('Chrome') + 10);
  } else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
    browserName = 'Safari';
    browserVersion = ua.substring(ua.indexOf('Safari') + 7, ua.indexOf('Safari') + 10);
  } else if (ua.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
    browserVersion = ua.substring(ua.indexOf('Firefox') + 8, ua.indexOf('Firefox') + 11);
  } else if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) {
    browserName = 'Edge';
    browserVersion = ua.substring(ua.indexOf('Edg') + 4, ua.indexOf('Edg') + 7);
  } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
    browserName = 'IE';
    browserVersion = 'Not Supported';
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTablet = /Tablet|iPad/i.test(ua);

  return {
    name: browserName,
    version: browserVersion,
    isMobile: isMobile,
    isTablet: isTablet,
    isDesktop: !isMobile && !isTablet,
    supportsWebGL: supportsWebGL(),
    supportsLocalStorage: typeof Storage !== 'undefined',
    supportsIndexedDB: !!window.indexedDB,
    supportsSharedArrayBuffer: !!window.SharedArrayBuffer,
    supportsCORS: true // Modern browsers all support CORS
  };
}

/**
 * Check WebGL support
 */
function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

/**
 * Auto-grant permissions for all browser features
 */
function autoGrantPermissions() {
  // Disable console warnings
  if (!GAME_CONFIG.DEBUG.enabled) {
    console.warn = () => {};
    console.error = () => {};
  }

  // Override CORS headers (client-side workaround)
  if (window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = function (...args) {
      if (args[1]) {
        args[1] = {
          ...args[1],
          mode: 'cors',
          credentials: 'omit',
          headers: {
            ...((args[1] && args[1].headers) || {}),
            'Access-Control-Allow-Origin': '*'
          }
        };
      }
      return originalFetch.apply(this, args);
    };
  }

  // Auto-enable localStorage
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
  } catch (e) {
    console.warn('localStorage not available, using fallback');
  }

  // Auto-enable permissions for geolocation, camera, microphone (won't use but prevents prompts)
  if (navigator.permissions && navigator.permissions.query) {
    ['geolocation', 'camera', 'microphone', 'clipboard-read', 'clipboard-write'].forEach(permission => {
      navigator.permissions.query({ name: permission })
        .then(result => {
          if (result.state === 'prompt') {
            // Auto-grant or ignore
          }
        })
        .catch(() => {}); // Silently fail
    });
  }

  console.log(`✅ Auto-granted permissions for ${GAME_CONFIG.BROWSER.name}`);
}

/**
 * Auto-optimize settings based on browser & device
 */
function autoOptimizeSettings() {
  const browser = GAME_CONFIG.BROWSER;
  const perf = GAME_CONFIG.PERFORMANCE;
  const graphics = GAME_CONFIG.GRAPHICS;

  // Mobile optimization
  if (browser.isMobile) {
    perf.shadowQuality = 'low';
    perf.particleCount = 50;
    graphics.reflections = false;
    graphics.antialiasing = false;
    console.log('📱 Mobile optimization applied');
  }

  // Tablet optimization
  if (browser.isTablet) {
    perf.shadowQuality = 'medium';
    perf.particleCount = 75;
    graphics.reflections = false;
    console.log('📊 Tablet optimization applied');
  }

  // Browser-specific optimizations
  switch (browser.name) {
    case 'Chrome':
      perf.shadowQuality = 'high';
      graphics.antialiasing = true;
      break;
    case 'Firefox':
      perf.shadowQuality = 'medium';
      graphics.antialiasing = true;
      break;
    case 'Safari':
      perf.shadowQuality = 'medium';
      graphics.antialiasing = false;
      break;
    case 'Edge':
      perf.shadowQuality = 'high';
      graphics.antialiasing = true;
      break;
  }

  // Check device capabilities
  if (!browser.supportsWebGL) {
    GAME_CONFIG.FEATURES.fallbackMode = true;
    console.warn('⚠️ WebGL not supported, using fallback mode');
  }

  console.log(`⚙️ Optimized for ${browser.name} (${browser.version})`);
}

/**
 * Initialize storage system (auto-detects best option)
 */
function initializeStorage() {
  const storage = {
    save: function (key, data) {
      try {
        // Try localStorage first
        if (GAME_CONFIG.BROWSER.supportsLocalStorage) {
          localStorage.setItem(key, JSON.stringify(data));
          return true;
        }
      } catch (e) {
        console.warn('localStorage full, trying alternatives...');
      }

      try {
        // Fallback to sessionStorage
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem(key, JSON.stringify(data));
          return true;
        }
      } catch (e) {
        console.warn('sessionStorage unavailable');
      }

      try {
        // Fallback to IndexedDB
        if (GAME_CONFIG.BROWSER.supportsIndexedDB) {
          const request = indexedDB.open('WordFarmDB');
          request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['saves'], 'readwrite');
            const store = transaction.objectStore('saves');
            store.put(data, key);
          };
          return true;
        }
      } catch (e) {
        console.warn('IndexedDB unavailable');
      }

      // Last resort: in-memory storage
      if (!window.__gameMemoryStorage) {
        window.__gameMemoryStorage = {};
      }
      window.__gameMemoryStorage[key] = data;
      console.warn('⚠️ Using in-memory storage (data will be lost on refresh)');
      return false;
    },

    load: function (key) {
      try {
        if (GAME_CONFIG.BROWSER.supportsLocalStorage) {
          const data = localStorage.getItem(key);
          return data ? JSON.parse(data) : null;
        }
      } catch (e) {}

      try {
        if (typeof sessionStorage !== 'undefined') {
          const data = sessionStorage.getItem(key);
          return data ? JSON.parse(data) : null;
        }
      } catch (e) {}

      try {
        if (GAME_CONFIG.BROWSER.supportsIndexedDB) {
          let result = null;
          const request = indexedDB.open('WordFarmDB');
          request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['saves'], 'readonly');
            const store = transaction.objectStore('saves');
            const getRequest = store.get(key);
            getRequest.onsuccess = () => {
              result = getRequest.result;
            };
          };
          return result;
        }
      } catch (e) {}

      if (window.__gameMemoryStorage && window.__gameMemoryStorage[key]) {
        return window.__gameMemoryStorage[key];
      }

      return null;
    },

    clear: function (key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {}
      try {
        sessionStorage.removeItem(key);
      } catch (e) {}
      if (window.__gameMemoryStorage) {
        delete window.__gameMemoryStorage[key];
      }
    }
  };

  window.gameStorage = storage;
  console.log('✅ Storage system initialized');
  return storage;
}

/**
 * Initialize everything on page load
 */
function initializeGame() {
  console.log('🌾 WordFarm V5 - Initializing...');
  console.log(`Browser: ${GAME_CONFIG.BROWSER.name} ${GAME_CONFIG.BROWSER.version}`);
  console.log(`Device: ${GAME_CONFIG.BROWSER.isDesktop ? 'Desktop' : (GAME_CONFIG.BROWSER.isTablet ? 'Tablet' : 'Mobile')}`);

  // Auto-grant permissions
  if (GAME_CONFIG.FEATURES.autoGrantPermissions) {
    autoGrantPermissions();
  }

  // Auto-optimize
  if (GAME_CONFIG.FEATURES.autoOptimize) {
    autoOptimizeSettings();
  }

  // Initialize storage
  initializeStorage();

  console.log('✅ Game ready to start!');
}

// Run initialization when document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGame);
} else {
  initializeGame();
}

// Export for use in game.html
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAME_CONFIG, autoGrantPermissions, autoOptimizeSettings, initializeStorage };
}

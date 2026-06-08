# 👨‍💻 WordFarm V5 - Developer Guide

## Advanced Customization & Extension Guide

This guide is for developers who want to modify, extend, or customize WordFarm V5 beyond the basic setup.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Code Structure](#code-structure)
3. [Adding Quiz Questions](#adding-quiz-questions)
4. [Creating New Crops](#creating-new-crops)
5. [Creating New Animals](#creating-new-animals)
6. [Working with 3D Models](#working-with-3d-models)
7. [Modifying UI](#modifying-ui)
8. [Adding Audio](#adding-audio)
9. [Advanced Mechanics](#advanced-mechanics)
10. [Performance Optimization](#performance-optimization)
11. [Debugging Tips](#debugging-tips)

---

## Architecture Overview

### Game State Flow

```
User Input (Click)
    ↓
Raycaster Intersection Detection (onMouseClick)
    ↓
Plot Type Check (crop/animal/windmill)
    ↓
Show Appropriate Quiz Modal
    ↓
User Answers Quiz
    ↓
Validate Answer
    ├─ Correct → Execute Action (plant/feed/mill)
    ├─ Update gameState
    ├─ Update HUD
    └─ Play Sound
    ├─ Wrong → Lock plot / Show error
    └─ Play error sound
    ↓
Auto-Save every 30 seconds
```

### Data Model

```
gameState = {
  plots: {
    0-7: { state: 'empty'|'growing'|'ripe', crop: {...}, plantedAt: timestamp }
  },
  animals: {
    100-101: { state: 'idle'|'eating'|'ready', animal: {...}, feedStartedAt: timestamp }
  },
  xp: number,
  coins: number,
  harvests: number,
  quizzes: number,
  inventory: {
    corn: number,
    carrot: number,
    tomato: number,
    apple: number,
    eggs: number,
    milk: number,
    flour: number
  },
  cooldownPlots: { plotId: remainingSeconds },
  windmillState: 'ready'|'processing'
}
```

---

## Code Structure

### Section Breakdown in game.html

```javascript
Lines 1-50        // HTML Head & Meta
Lines 51-400      // CSS Styling (organized by component)
Lines 401-650     // HTML Body structure (HUD, Overlays, Buttons)
Lines 651-750     // Game Data (CROPS, ANIMALS, QUIZZES, CONFIG)
Lines 751-850     // Game State & Initialization
Lines 851-950     // Model Loading & Three.js Setup
Lines 951-1100    // Scene Creation (lights, ground, plots, animals)
Lines 1101-1200   // Mesh Creation (crops, animals, materials)
Lines 1201-1350   // Game Logic (planting, harvesting, feeding)
Lines 1351-1450   // Quiz System (showing, answering, validation)
Lines 1451-1550   // Animation Loop (grow, animate, update)
Lines 1551-1650   // Event Handlers (mouse, click, resize)
Lines 1651-1750   // UI Updates & Toast Messages
Lines 1751-1850   // Audio System
Lines 1851-1950   // Save/Load System
Lines 1951-2100   // Initialization & Window Events
```

### Key Functions

| Function | Purpose | Called By |
|----------|---------|-----------|
| `initModelLoader()` | Load .glb files asynchronously | window.load |
| `initThreeJS()` | Create Three.js scene | window.load |
| `createPlot(id, x, y, z, type)` | Add plot to scene | initThreeJS |
| `plantCrop(plotId, crop)` | Plant crop in plot | answerVocab |
| `feedAnimal(animalId, animal)` | Feed animal | answerGrammar |
| `harvestCrop(plotId)` | Collect mature crop | handleCropClick |
| `collectAnimal(animalId)` | Collect product | handleAnimalClick |
| `showQuiz(type, plotId, animalId)` | Display quiz modal | handleClick |
| `answerVocab/Grammar(idx)` | Process quiz answer | quiz button click |
| `submitScramble()` | Process scramble answer | submit button |
| `animate()` | Main game loop | requestAnimationFrame |
| `updateHUD()` | Refresh UI display | game state changes |
| `saveGame()` | Save to localStorage | button / auto |

---

## Adding Quiz Questions

### Adding Vocabulary Questions

```javascript
// Find this section in game.html (~line 650):
const ENGLISH_QUIZZES = {
  vocab: [
    { id: 1, question: "What is the Vietnamese word for 'farm'?", 
      options: ['Nhà hàng', 'Trang trại', 'Cây cối', 'Đất đai'], 
      correct: 1 },  // Index of correct answer (0-3)
    
    // ADD YOUR QUESTION HERE:
    { id: 21, question: "Translate 'thịt gà' into English", 
      options: ['Chicken meat', 'Pork', 'Beef', 'Fish'], 
      correct: 0 },
  ],
  // ...
};
```

**Important Notes:**
- `id` must be unique per quiz type
- `correct` is the 0-based index of correct answer
- Keep question concise (fits in modal)
- Use clear, unambiguous options

### Adding Grammar Questions

```javascript
const ENGLISH_QUIZZES = {
  // ...
  grammar: [
    // ... existing questions ...
    
    // ADD YOUR QUESTION:
    { id: 111, question: "The farmers ___ planting crops right now", 
      options: ['is', 'are', 'am', 'been'], 
      correct: 1 },  // "are" is correct
  ]
};
```

### Adding Scramble Questions

```javascript
const ENGLISH_QUIZZES = {
  // ...
  scramble: [
    // ... existing questions ...
    
    // ADD YOUR QUESTION:
    { id: 209, words: ['chicken', 'the', 'in', 'lives', 'The'], 
      answer: 'The chicken lives in the' },  // Exact final sentence
  ]
};
```

**Scramble Notes:**
- `words` array is automatically shuffled
- `answer` is the EXACT final sentence (case-sensitive)
- Words joined with spaces: `words.join(' ')`
- Test user input against exact match

---

## Creating New Crops

### Add to CROPS Object

```javascript
const CROPS = {
  // ... existing crops ...
  
  // ADD NEW CROP:
  strawberry: {
    id: 'strawberry',           // Unique identifier
    name: 'Strawberry',         // Display name
    emoji: '🍓',                // Emoji for UI
    growTime: 35,               // Seconds to mature
    xp: 8,                      // XP earned on harvest
    coins: 20,                  // Coins earned
    model: 'Strawberry.glb'     // 3D model filename
  }
};
```

### Update Inventory Display

Find the inventory section in HTML (~line 435) and add:

```html
<div class="inventory-item">
  <span>🍓 Strawberry:</span>
  <span id="invStrawberry">0</span>
</div>
```

### Update HUD Update Function

Find `updateHUD()` (~line 1750) and add:

```javascript
function updateHUD() {
  // ... existing updates ...
  document.getElementById('invStrawberry').textContent = gameState.inventory.strawberry;
}
```

### Update Initial gameState

Find the window.load event (~line 1950) and ensure inventory has new item:

```javascript
inventory: { 
  carrot: 0, 
  corn: 0, 
  tomato: 0, 
  apple: 0,
  strawberry: 0,  // ADD THIS
  eggs: 0, 
  milk: 0, 
  flour: 0 
}
```

### Add Model File

1. Create `Strawberry.glb` 3D model (or use geometric fallback)
2. Place in `assets/models/Strawberry.glb`
3. Game automatically loads on startup

---

## Creating New Animals

### Add to ANIMALS Object

```javascript
const ANIMALS = {
  // ... existing animals ...
  
  // ADD NEW ANIMAL:
  pig: {
    id: 'pig',                  // Unique identifier
    name: 'Pig',                // Display name
    emoji: '🐷',                // Emoji
    feedTime: 40,               // Seconds to feed
    xp: 18,                     // XP for collecting
    coins: 60,                  // Coins for collecting
    collectItem: 'pork',        // Inventory item to collect
    model: 'Pig.glb'            // 3D model file
  }
};
```

### Add to Inventory

```html
<!-- In HTML inventory section -->
<div class="inventory-item">
  <span>🥓 Pork:</span>
  <span id="invPork">0</span>
</div>
```

### Update HUD

```javascript
function updateHUD() {
  // ... existing ...
  document.getElementById('invPork').textContent = gameState.inventory.pork;
}
```

### Update Initial State

```javascript
inventory: {
  // ... crops ...
  eggs: 0,
  milk: 0,
  pork: 0,  // ADD THIS
  flour: 0
}
```

### Add Animal Plot to Scene

Find `initThreeJS()` (~line 900) and modify animal creation:

```javascript
// Create 3+ animal plots (increase from 2)
for (let i = 0; i < 3; i++) {  // Changed from 2 to 3
  const posX = (i - 1) * GAME_CONFIG.PLOT_SPACING;  // Spread out better
  const posZ = 4.5;
  createPlot(i + 100, posX, 0, posZ, 'animal');
}

// Update ANIMAL_COUNT in GAME_CONFIG
ANIMAL_COUNT: 3
```

---

## Working with 3D Models

### Understanding GLB Files

GLB (GL Transmission Format Binary) files contain:
- 3D geometry (vertices, faces, UV maps)
- Materials (colors, textures, roughness)
- Animations (if included)
- Embedded textures

### Loading Custom Models

The game uses GLTFLoader to load models. Supported formats:
- `.glb` - Binary format (recommended)
- `.gltf` - Text format
- Embedded textures only (no external file references)

### Creating Models

#### Option 1: Download from Quaternius
- Visit https://quaternius.com/
- Search for models
- Download GLTF format
- Copy `.glb` files to `assets/models/`

#### Option 2: Use Blender (Free)
```
1. Download Blender (blender.org)
2. Create 3D model
3. Export → glTF 2.0 (.glb)
   - Settings: Include animations if needed
4. Save to assets/models/
```

#### Option 3: Use Other Tools
- **Tinkercad**: Online 3D modeling → Export as .obj → Convert with tool
- **Sketchfab**: Download CC0 models in glTF format
- **TurboSquid**: Free 3D models

### Model Scale & Position

Current scaling in code (~line 1140):

```javascript
function createCropMesh(crop, position) {
  if (model) {
    mesh = model.clone();
    mesh.scale.set(1.5, 1.5, 1.5);  // ADJUST THIS
  }
}

function createAnimalMesh(animal, position) {
  if (model) {
    mesh = model.clone();
    mesh.scale.set(1.2, 1.2, 1.2);  // ADJUST THIS
  }
}
```

**Test different scales:**
- `0.5, 0.5, 0.5` - Small
- `1.0, 1.0, 1.0` - Normal
- `2.0, 2.0, 2.0` - Large

### Model Fallbacks

If model not found, game creates geometric shape:

```javascript
// Crop fallback (line 1145)
if (!model) {
  const geom = new THREE.SphereGeometry(0.5, 16, 16);
  const mat = new THREE.MeshStandardMaterial({ color: 0x90EE90 });
  mesh = new THREE.Mesh(geom, mat);
}

// Animal fallback (line 1160)
if (!model) {
  const geom = new THREE.BoxGeometry(0.8, 1, 1);
  const mat = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
  mesh = new THREE.Mesh(geom, mat);
}
```

You can customize fallback shapes here.

---

## Modifying UI

### Changing Colors

**HUD Colors** (~line 100):
```css
#hud {
  border: 3px solid #4caf50;  /* Change this color */
  background: rgba(0, 0, 0, 0.9);
}

.hud-stat-value { 
  color: #4caf50;  /* Change this color */
}
```

**Quiz Panel Colors** (~line 250):
```css
.quiz-panel {
  background: linear-gradient(135deg, #2d5016 0%, #4caf50 100%);
  /* Change these gradient colors */
}
```

### Changing Fonts

Find CSS section (~line 50):
```css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /* Change to: 'Arial', 'Times New Roman', or any Google Font */
}
```

Add Google Font:
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">

<!-- Then use in CSS -->
body { font-family: 'Roboto', sans-serif; }
```

### Adding Custom Buttons

Example: Add a "Settings" button

```html
<!-- Add to HUD buttons section (~line 420) -->
<button class="hud-btn" onclick="showSettings()">⚙️ Settings</button>

<!-- Add modal for settings -->
<div id="settingsOverlay" class="quiz-overlay hidden">
  <div class="quiz-panel">
    <div style="color: #fff; font-size: 1.3em; margin-bottom: 20px;">Settings</div>
    <label><input type="checkbox" id="soundToggle" checked> Sound Effects</label>
    <br><br>
    <button onclick="closeSettings()" style="width: 100%; padding: 10px; background: #4caf50; color: #fff; border: none; border-radius: 6px; cursor: pointer;">Close</button>
  </div>
</div>
```

Add JavaScript functions:
```javascript
function showSettings() {
  document.getElementById('settingsOverlay').classList.remove('hidden');
}

function closeSettings() {
  document.getElementById('settingsOverlay').classList.add('hidden');
}
```

---

## Adding Audio

### Audio File Setup

1. Create `assets/audio/` folder
2. Add MP3 files:
   - `bgm.mp3` - Background music
   - `click.mp3` - UI click
   - `correct.mp3` - Correct answer
   - `wrong.mp3` - Wrong answer
   - `harvest.mp3` - Harvest sound

### Audio Format Requirements

- **Format**: MP3 (best browser support)
- **Bitrate**: 128-192 kbps
- **Sample Rate**: 44.1 kHz
- **Duration**: 
  - BGM: 1-3 minutes (loops)
  - Effects: 0.5-2 seconds

### Adjusting Volume

Find `initAudio()` (~line 1800):

```javascript
function initAudio() {
  sounds.bgm = new Howl({ 
    src: ['./assets/audio/bgm.mp3'], 
    loop: true, 
    volume: 0.3,  // 0-1, change this
    onloaderror: () => console.warn('BGM not found')
  });
  sounds.correct = new Howl({
    src: ['./assets/audio/correct.mp3'],
    volume: 0.6,  // Change this
  });
}
```

### Adding New Sound

```javascript
const sounds = {
  bgm: null,
  click: null,
  correct: null,
  wrong: null,
  harvest: null,
  levelup: null  // ADD THIS
};

function initAudio() {
  // ... existing sounds ...
  sounds.levelup = new Howl({
    src: ['./assets/audio/levelup.mp3'],
    volume: 0.7,
    onloaderror: () => console.warn('Level up sound not found')
  });
}

// Use it:
playSound('levelup');
```

---

## Advanced Mechanics

### Adding a Shop/Upgrade System

```javascript
// Add to gameState
gameState.upgrades = {
  fasterGrowth: false,
  doubleCoins: false,
  extraXP: false
};

// Add purchase function
function buyUpgrade(upgradeId, cost) {
  if (gameState.coins >= cost) {
    gameState.coins -= cost;
    gameState.upgrades[upgradeId] = true;
    showToast('✅ Upgrade purchased!', 'success');
    updateHUD();
  } else {
    showToast('❌ Not enough coins', 'error');
  }
}

// Apply upgrades in harvestCrop()
function harvestCrop(plotId) {
  const plot = gameState.plots[plotId];
  if (plot.state !== 'ripe' || !plot.crop) return;

  const crop = plot.crop;
  let xp = crop.xp;
  let coins = crop.coins;
  
  // Apply upgrades
  if (gameState.upgrades.doubleCoins) coins *= 2;
  if (gameState.upgrades.extraXP) xp *= 1.5;
  
  gameState.inventory[crop.id]++;
  gameState.xp += xp;
  gameState.coins += coins;
  // ... rest of harvest
}
```

### Adding Difficulty Levels

```javascript
const DIFFICULTY = {
  EASY: {
    growTime: 0.7,      // 30% faster
    quizCount: 10,      // Fewer questions
    coinMultiplier: 1.5
  },
  NORMAL: {
    growTime: 1.0,
    quizCount: 38,
    coinMultiplier: 1.0
  },
  HARD: {
    growTime: 1.3,      // 30% slower
    quizCount: 38,
    coinMultiplier: 0.8
  }
};

let currentDifficulty = DIFFICULTY.NORMAL;

// Apply in plantCrop
function plantCrop(plotId, crop) {
  const plot = gameState.plots[plotId];
  plot.state = 'growing';
  plot.crop = crop;
  plot.plantedAt = Date.now();
  
  // Apply difficulty multiplier
  plot.growTime = crop.growTime * currentDifficulty.growTime;
}
```

### Adding Achievements

```javascript
const ACHIEVEMENTS = {
  firstHarvest: { name: 'First Harvest', icon: '🌾' },
  tenHarvests: { name: 'Busy Farmer', icon: '🤠' },
  hundredXP: { name: 'Scholar', icon: '🎓' },
  allCrops: { name: 'Diverse Farm', icon: '🌈' }
};

let unlockedAchievements = [];

function checkAchievements() {
  if (gameState.harvests === 1 && !unlockedAchievements.includes('firstHarvest')) {
    unlockAchievement('firstHarvest');
  }
  if (gameState.harvests === 10 && !unlockedAchievements.includes('tenHarvests')) {
    unlockAchievement('tenHarvests');
  }
  if (gameState.xp >= 100 && !unlockedAchievements.includes('hundredXP')) {
    unlockAchievement('hundredXP');
  }
}

function unlockAchievement(id) {
  unlockedAchievements.push(id);
  const achievement = ACHIEVEMENTS[id];
  showToast(`🏆 Achievement Unlocked: ${achievement.name}!`, 'success');
  playSound('levelup');
}

// Call in animate() loop
function animate() {
  // ... existing code ...
  checkAchievements();
}
```

---

## Performance Optimization

### Reducing Draw Calls

Current optimization:
- Model cloning (shared geometry)
- Batch rendering
- Shadow map optimization

Further optimization:
```javascript
// Use InstancedMesh for many identical objects
function createInstancedCrops() {
  const geometry = new THREE.SphereGeometry(0.5, 16, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0x90EE90 });
  const instanceCount = GAME_CONFIG.PLOT_COUNT;
  const mesh = new THREE.InstancedMesh(geometry, material, instanceCount);
  
  // Position each instance
  const dummy = new THREE.Object3D();
  for (let i = 0; i < instanceCount; i++) {
    dummy.position.set(x, y, z);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  scene.add(mesh);
}
```

### Reducing Shadow Complexity

```javascript
// Smaller shadow map for faster rendering
directionalLight.shadow.mapSize.width = 1024;   // From 2048
directionalLight.shadow.mapSize.height = 1024;  // From 2048

// Or disable shadows for some objects
cropMesh.castShadow = false;  // Plants don't need to cast shadows
```

### Using LOD (Level of Detail)

```javascript
function createCropMesh(crop, position) {
  let mesh;
  
  // Low-detail fallback
  const lodMesh = new THREE.LOD();
  const highDetail = loadedModels[crop.model];
  const lowDetail = new THREE.SphereGeometry(0.5, 8, 8);  // Fewer segments
  
  lodMesh.addLevel(highDetail.clone(), 0);      // Show high-detail when close
  lodMesh.addLevel(new THREE.Mesh(lowDetail, material), 10);  // Switch at distance 10
  
  mesh = lodMesh;
  scene.add(mesh);
  return mesh;
}
```

---

## Debugging Tips

### Enable Debug Output

Add to top of game.html `<script>` section:
```javascript
const DEBUG = true;

function debugLog(...args) {
  if (DEBUG) console.log('[DEBUG]', ...args);
}

// Use in game logic
debugLog('Crop planted:', cropId, crop.name);
debugLog('Game state:', gameState);
```

### Inspect Game State

Open browser DevTools (F12) and in Console:
```javascript
// View current game state
console.log(gameState);

// Check specific plot
console.log(gameState.plots[0]);

// Check inventory
console.log(gameState.inventory);

// Manually trigger events
harvestCrop(0);
showQuiz('vocab', 0);

// Modify values for testing
gameState.xp += 100;
gameState.coins += 1000;
updateHUD();
```

### Performance Monitoring

```javascript
// Add FPS counter
let fps = 0, lastTime = Date.now();

function animate() {
  requestAnimationFrame(animate);
  
  const now = Date.now();
  const delta = now - lastTime;
  fps = Math.round(1000 / delta);
  
  if (fps < 55) console.warn('Low FPS:', fps);  // Alert on slow frames
  
  // ... rest of animate
}
```

### Check Three.js Errors

```javascript
// Enable Three.js debug
renderer.debug.checkShaderErrors = true;

// Check for WebGL errors
const gl = renderer.getContext();
const error = gl.getError();
if (error) console.error('WebGL Error:', error);
```

### Test Quiz Logic

```javascript
// Force specific quiz
gameState.currentQuiz = ENGLISH_QUIZZES.vocab[0];
showQuiz('vocab', 0);

// Test answer validation
answerVocab(1);  // Submit index 1

// Check if correct
console.log('Is correct?', 1 === ENGLISH_QUIZZES.vocab[0].correct);
```

---

## Common Mistakes to Avoid

### ❌ Don't
- Modify `this.gameState` directly outside functions (breaks reactivity)
- Open game via `file://` protocol (CORS blocks models)
- Load models from different domains (CORS restrictions)
- Edit HTML without proper escaping (XSS vulnerability)
- Use `var` instead of `let`/`const` (scope confusion)

### ✅ Do
- Use `gameState` consistently (capital G)
- Always run on local server
- Keep models in same origin
- Properly escape user input
- Use `const` for constants, `let` for variables
- Comment complex logic
- Test in DevTools console first
- Use Git/version control for changes

---

## Extending Further

### Ideas for V6+
1. **Shop System** - Buy upgrades with coins
2. **Leaderboards** - Track high scores
3. **Achievements** - Unlock badges
4. **Custom Themes** - Day/night, seasons
5. **More Animals** - Sheep, horse, pig
6. **Multiplayer** - Co-op farming (WebSockets)
7. **Mobile Support** - Touch controls
8. **Cloud Save** - Firebase integration
9. **Story Mode** - Quest progression
10. **Procedural Quizzes** - AI-generated questions

---

## Resources

### Three.js Documentation
- Main Docs: https://threejs.org/docs/
- API Reference: https://threejs.org/api/
- Examples: https://threejs.org/examples/

### Model Resources
- Quaternius: https://quaternius.com/
- Sketchfab: https://sketchfab.com/
- TurboSquid: https://www.turbosquid.com/

### Learning
- MDN Web Docs: https://developer.mozilla.org/
- JavaScript.info: https://javascript.info/
- Three.js Tutorial: https://discoverthreejs.com/

### Tools
- Blender (3D Modeling): https://www.blender.org/
- VS Code (Text Editor): https://code.visualstudio.com/
- Chrome DevTools (Debugging): Built into Chrome

---

## Support & Community

- **Report Issues**: Check browser console (F12)
- **Ask Questions**: Review this guide or README_V5.md
- **Share Customizations**: Extend and share with community
- **Contribute**: Submit improvements via pull requests

---

**Happy Coding! 👨‍💻** 

Built with ❤️ for educators and learners



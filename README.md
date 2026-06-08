# 🌾 WordFarm V4 - 3D English Learning Game

## Overview

**WordFarm V4** is a 3D educational farming game that combines **Phaser-free 3D graphics**, **English vocabulary learning**, and **interactive quiz mechanics** into one engaging experience.

### Key Features

✅ **3D Isometric Farm** - Eight clickable plots rendered with Three.js  
✅ **English Learning Core** - Answer vocabulary/grammar quizzes to plant crops  
✅ **5 Unique Crops** - Strawberry, Carrot, Corn, Tomato, Apple (with unique growth times)  
✅ **3D Crop Models** - Procedurally generated using Three.js primitives (Cones, Cylinders, Spheres)  
✅ **Growth Animations** - Crops scale up as they grow, bounce when ripe  
✅ **Audio System** - Howler.js for background music and sound effects  
✅ **Save/Load System** - LocalStorage persistence (Ctrl+S to save)  
✅ **No Backend Required** - 100% client-side, works on GitHub Pages  

---

## Tech Stack

| Component | Technology | CDN |
|-----------|-----------|-----|
| 3D Graphics | Three.js r128 | `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js` |
| Audio | Howler.js 2.2 | `https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js` |
| UI Framework | Tailwind CSS | `https://cdn.tailwindcss.com` |
| Language | Vanilla JavaScript (ES6 Modules) | - |
| Storage | Browser LocalStorage | Built-in |

---

## File Structure

```
WordFarmV4/
├── index.html          ← Main HTML file (CDNs, UI overlay, styles)
├── data.js             ← Quiz database + crop configurations
├── main.js             ← Three.js scene + game logic + audio + save/load
├── assets/
│   └── audio/
│       ├── bgm.mp3          ← (TO DOWNLOAD)
│       ├── click.mp3        ← (TO DOWNLOAD)
│       ├── correct.mp3      ← (TO DOWNLOAD)
│       ├── wrong.mp3        ← (TO DOWNLOAD)
│       └── harvest.mp3      ← (TO DOWNLOAD)
└── README.md           ← This file
```

---

## Setup Instructions

### 1. Clone/Download the Files

```bash
git clone <repo-url>
cd WordFarmV4
```

### 2. Download Audio Assets

All audio files must be placed in `WordFarmV4/assets/audio/` directory.

#### **BGM (Background Music)**
- **File:** `bgm.mp3`
- **Source:** [Pixabay](https://pixabay.com/music/)
- **Search:** "Happy acoustic farm" or similar uplifting farm background music
- **Format:** MP3, loop-friendly
- **Duration:** 60+ seconds (will loop)

#### **UI Click Sound**
- **File:** `click.mp3`
- **Source:** [Kenney.nl](https://kenney.nl/assets/ui-audio)
- **Download:** UI Audio pack
- **Or Pixabay:** Search "soft click" or "button click"
- **Format:** MP3
- **Duration:** 0.2-0.5 seconds

#### **Correct Answer Chime**
- **File:** `correct.mp3`
- **Source:** [Pixabay](https://pixabay.com/sound-effects/)
- **Search:** "Correct answer chime" or "Success ding"
- **Format:** MP3
- **Duration:** 0.5-1 second

#### **Wrong Answer Buzz**
- **File:** `wrong.mp3`
- **Source:** [Pixabay](https://pixabay.com/sound-effects/)
- **Search:** "Error buzz" or "Wrong answer sound"
- **Format:** MP3
- **Duration:** 0.3-0.5 seconds

#### **Harvest/Coin Sound**
- **File:** `harvest.mp3`
- **Source:** [Kenney.nl](https://kenney.nl/assets/casino-audio) (Casino Audio Pack)
- **Or Pixabay:** Search "coin sound" or "collect sound"
- **Format:** MP3
- **Duration:** 0.5-1 second

### 3. Run with Live Server

⚠️ **IMPORTANT:** Due to ES6 Modules, you **MUST** run the game on a local server, not via `file://` protocol.

#### **Option A: Use Python**
```bash
# Python 3
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

#### **Option B: Use Node.js http-server**
```bash
npm install -g http-server
http-server
```

#### **Option C: VS Code Live Server Extension**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

#### **Option D: Use Caddy (fast, modern)**
```bash
caddy file-server --listen :8000
```

### 4. Access the Game

Open your browser and navigate to:
```
http://localhost:8000/WordFarmV4/
```

Or (if using Python's http.server):
```
http://localhost:8000/
```

---

## How to Play

### Step-by-Step Gameplay

1. **Click an Empty Plot** (brown square)
   - A random English quiz question appears

2. **Answer the Question**
   - Choose the correct option (A, B, C, or D)
   - ✅ **Correct:** Crop plants, +5 bonus XP
   - ❌ **Wrong:** Plot locked for 10 seconds, no crop plants

3. **Wait for Growth**
   - Seed stage: 2 seconds (small green sphere)
   - Growing stage: 35-60 seconds (depending on crop)
   - Crop scales up as it grows

4. **Harvest When Ripe**
   - Click the golden, bouncing crop
   - Earn XP and coins
   - Plot becomes empty again

5. **Repeat!**
   - Fill all 8 plots for maximum rewards

---

## Game Mechanics

### Crops

| Crop | Time | XP | Coins | 3D Shape |
|------|------|-----|-------|----------|
| 🍓 Strawberry | 35s | 12 | 30 | Red Cone |
| 🥕 Carrot | 40s | 10 | 25 | Orange Cone |
| 🌽 Corn | 45s | 15 | 35 | Yellow Cylinder |
| 🍅 Tomato | 50s | 20 | 45 | Red Sphere |
| 🍎 Apple | 60s | 25 | 55 | Brown Tree |

### Growth Stages

```
Empty Plot (Brown)
    ↓
[Click] → Quiz appears
    ↓
[Answer Correct] → Seed planted (green sphere, 0.5x scale)
    ↓
[Wait 2s] → Growing (scales from 0.5 to 1.0)
    ↓
[Wait 35-60s] → Ripe (golden, bouncing animation)
    ↓
[Click] → Harvest → +XP + Coins
    ↓
Empty Plot (ready for next crop)
```

### Cooldown System

- **Wrong Answer:** Plot locked for 10 seconds
- **Message:** "Plot on cooldown: Xs"
- **After Cooldown:** Plot becomes empty again

### Stats Tracking

- **⭐ XP:** Total experience points (gained from harvests + quiz bonuses)
- **💰 Coins:** Virtual currency (gained from harvests)
- **🚜 Harvests:** Total number of crops harvested

---

## Controls

| Action | Control |
|--------|---------|
| **Plant Crop** | Click empty plot |
| **Answer Quiz** | Click option A, B, C, or D |
| **Harvest** | Click ripe crop (golden, bouncing) |
| **Save Game** | Press **Ctrl+S** or click "💾 Save" button |
| **Load Game** | Click "📂 Load" button |
| **Reset Game** | Click "🔄 Reset" button (⚠️ cannot be undone) |

---

## English Quiz Database

The game includes 20 quiz questions covering:

### Categories

- **Vocabulary:** Farm terms, crop names, English ↔ Vietnamese translations
- **Grammar:** Verb tenses, sentence structure, fill-in-the-blank

### Sample Questions

1. "What is the Vietnamese word for 'farm'?"  
   Options: A) Nhà hàng, B) **Trang trại**, C) Cây cối, D) Đất đai

2. "Complete: 'The farmer ___ the crops every day.'"  
   Options: A) **waters**, B) water, C) watering, D) watered

3. "Translate: 'cà rốt' into English"  
   Options: A) Corn, B) **Carrot**, C) Cauliflower, D) Celery

---

## Save/Load System

### Data Stored

When you save the game, the following is persisted:

```javascript
{
  gameState: {
    plots: {
      0: { state, crop, timeLeft, plantedAt },
      1: { ... },
      ...
    },
    xp: 0,
    coins: 0,
    harvests: 0,
    cooldownPlots: {}
  },
  timestamp: Date.now()
}
```

### Where Data is Stored

- **Key:** `wordfarm_v4_save` in Browser **LocalStorage**
- **Persistence:** Data survives browser restart (until cache clear)
- **Auto-Save:** Every 30 seconds automatically

### How to Use

1. **Manual Save:** Press **Ctrl+S** or click "💾 Save" button
2. **Manual Load:** Click "📂 Load" button (restores from last save)
3. **Auto-Save:** Happens every 30 seconds (no action needed)
4. **Reset:** Click "🔄 Reset" button to clear all progress

---

## Audio System (Howler.js)

The game uses **Howler.js** for seamless, cross-browser audio playback.

### Audio Files & Events

| Event | File | Volume | Loop |
|-------|------|--------|------|
| Game Start | `bgm.mp3` | 0.3 | Yes |
| Plot Click | `click.mp3` | 0.5 | No |
| Correct Answer | `correct.mp3` | 0.6 | No |
| Wrong Answer | `wrong.mp3` | 0.5 | No |
| Harvest | `harvest.mp3` | 0.7 | No |

### Graceful Degradation

If audio files are missing:
- Game continues to work normally
- Console shows warning: "Audio file not found"
- UI still updates (visual feedback)

---

## 3D Graphics (Three.js)

### Scene Setup

- **Camera:** Isometric perspective (45° angle, position: 12,10,12)
- **Lighting:** Ambient (0.6) + Directional (0.8) with shadows
- **Ground:** Light green plane (20×20 units)
- **Background:** Sky blue (0x87CEEB)

### Farm Plots

- **Count:** 8 plots (2 rows × 4 columns)
- **Material:** Lambert (brown, 0x8B7355)
- **Geometry:** Box (2×0.5×2 units)
- **Interaction:** Raycasting mouse picking
- **Hover Effect:** Color changes to lighter brown

### Crop 3D Models

**Seed (Small Green Sphere)**
- Geometry: `SphereGeometry(0.3, 8, 8)`
- Color: Green (0x90EE90)
- Scale: 0.5

**Strawberry (Red Cone)**
- Geometry: `ConeGeometry(0.6, 1.5, 8)`
- Color: Red/Pink (0xFF6B9D)
- Rotation: None

**Carrot (Orange Cone)**
- Geometry: `ConeGeometry(0.6, 1.5, 8)`
- Color: Orange (0xFFA500)

**Corn (Yellow Cylinder)**
- Geometry: `CylinderGeometry(0.6, 0.6, 1.5, 8)`
- Color: Yellow (0xFFD700)

**Tomato (Red Sphere)**
- Geometry: `SphereGeometry(0.7, 16, 16)`
- Color: Red/Orange (0xFF4500)

**Apple Tree (Brown Trunk + Green Leaves)**
- Trunk: `CylinderGeometry(0.3, 0.4, 1.5, 6)` - Brown (0x8B4513)
- Leaves: `SphereGeometry(0.8, 16, 16)` - Green (0x228B22)
- Composition: THREE.Group

### Animations

**Growth Animation**
```javascript
const growProgress = (elapsed - 2s) / cropGrowTime;
const scale = 0.5 + growProgress * 0.5; // 0.5 → 1.0
cropMesh.scale.set(scale, scale, scale);
```

**Ripe Bounce Animation**
```javascript
const bounce = Math.sin(currentTime * 3) * 0.05;
cropMesh.scale.set(1 + bounce, 1 + bounce, 1 + bounce);
```

---

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| Opera | ✅ Full |
| IE 11 | ❌ Not supported |

### Requirements

- WebGL support
- ES6 Module support
- LocalStorage API
- Modern CSS (CSS Grid, Flexbox)

---

## Troubleshooting

### "Module not found" Error

**Problem:** `Uncaught TypeError: Failed to resolve module specifier`

**Solution:**
- Must run on HTTP server (not `file://` protocol)
- Use `http://localhost:8000` instead of opening HTML directly

### "Audio not found" Warning

**Problem:** Console shows "BGM not found", game has no sound

**Solution:**
- Download audio files from Pixabay/Kenney.nl (links above)
- Place in `WordFarmV4/assets/audio/`
- Ensure filenames match exactly: `bgm.mp3`, `click.mp3`, etc.
- Game continues working without audio

### Canvas Not Rendering / Black Screen

**Problem:** Three.js canvas is black or white, no farm visible

**Solution:**
- Check browser console (F12) for errors
- Ensure WebGL is enabled in browser settings
- Try different browser (Chrome recommended)
- Clear browser cache and reload

### Quiz Doesn't Appear

**Problem:** Click plot, nothing happens

**Solution:**
- Check if plot is on cooldown (10-second wait after wrong answer)
- Check browser console for errors
- Refresh page (F5)

### LocalStorage Full

**Problem:** "QuotaExceededError" when saving

**Solution:**
- Clear LocalStorage: `localStorage.clear()`
- Or delete specific save: `localStorage.removeItem('wordfarm_v4_save')`
- Or try different browser with fresh storage

---

## Deployment to GitHub Pages

### Steps

1. **Push code to GitHub**
```bash
git add .
git commit -m "Add WordFarm V4"
git push origin main
```

2. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Select "main" branch
   - Click Save

3. **Access game**
```
https://username.github.io/repo-name/WordFarmV4/
```

### Notes

- Works perfectly on GitHub Pages (static hosting)
- All assets (audio, JS) must use relative paths (`./assets/audio/...`)
- No build process needed
- No backend required

---

## Performance Optimization

### Rendering

- **FPS Target:** 60 FPS (requestAnimationFrame)
- **Shadow Quality:** 2048×2048 shadow map
- **Anti-aliasing:** Enabled
- **Geometry Reuse:** Shared geometries, unique materials

### Memory

- **Crop Meshes:** Created on-demand, destroyed on harvest
- **Audio:** Lazy-loaded, cached by Howler.js
- **LocalStorage:** ~5-10 KB per save

### Network

- **Three.js CDN:** 500 KB (cached)
- **Howler.js CDN:** 50 KB (cached)
- **Tailwind CDN:** 30 KB (JIT compilation)
- **Game Code:** ~50 KB total
- **Audio Files:** ~500 KB - 2 MB each (must download locally)

---

## Future Enhancements

Potential features to add:

- 🎨 Custom crop visual skins
- 🌍 Multiple farm scenes
- 👥 Multiplayer sync (cloud save)
- 📊 Leaderboards
- 🎯 Achievement badges
- 🗣️ Spoken audio prompts (Text-to-Speech)
- 🌙 Day/night cycle with lighting changes
- 🎭 Character/avatar system
- 🏆 Seasonal events
- 📱 Mobile touch optimization

---

## Credits

**WordFarm V4 - 3D English Learning Game**

- **Graphics Engine:** Three.js (David DaSilva)
- **Audio Library:** Howler.js (Goldfire Studios)
- **Styling:** Tailwind CSS
- **Audio Assets:** Pixabay & Kenney.nl
- **Concept:** Educational Gaming + Farm Simulation + English Learning

---

## License

This project is open source. Feel free to modify and redistribute.

---

## Support

For issues or questions:
1. Check **Troubleshooting** section above
2. Open **Developer Console** (F12) to see error messages
3. Check that all files are in correct directories
4. Verify audio files exist in `assets/audio/`

---

## Quick Start Checklist

- [ ] Download all audio files to `WordFarmV4/assets/audio/`
- [ ] Start local HTTP server (`http-server` or `python -m http.server`)
- [ ] Open browser to `http://localhost:8000/WordFarmV4/`
- [ ] Click a plot to start
- [ ] Answer the English quiz
- [ ] Watch crop grow
- [ ] Click to harvest
- [ ] Press Ctrl+S to save

---

**Happy Farming & Learning! 🌾📚**

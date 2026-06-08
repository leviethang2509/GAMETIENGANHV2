# 🚀 WordFarm V4 - Quick Start Guide

## 5-Minute Setup

### Step 1: Download Audio Files (2 min)

Go to `WordFarmV4/assets/audio/` and download these 5 files:

| File | Source | Search Term |
|------|--------|------------|
| `bgm.mp3` | [Pixabay](https://pixabay.com/music/) | "Happy acoustic farm" |
| `click.mp3` | [Kenney.nl](https://kenney.nl/assets/ui-audio) | UI Audio Pack |
| `correct.mp3` | [Pixabay](https://pixabay.com/sound-effects/) | "Correct chime" |
| `wrong.mp3` | [Pixabay](https://pixabay.com/sound-effects/) | "Error buzz" |
| `harvest.mp3` | [Pixabay](https://pixabay.com/sound-effects/) | "Coin sound" |

⚠️ **Game works without audio** - sounds are optional but recommended

### Step 2: Start Local Server (1 min)

Choose ONE option:

**Option A: Python (built-in)**
```bash
cd WordFarmV4
python -m http.server 8000
```

**Option B: Node.js**
```bash
npm install -g http-server
cd WordFarmV4
http-server
```

**Option C: VS Code Live Server**
- Install extension
- Right-click `index.html`
- Select "Open with Live Server"

### Step 3: Open Browser (1 min)

```
http://localhost:8000/
```

Or if running from parent directory:
```
http://localhost:8000/WordFarmV4/
```

### Step 4: Play! (1 min)

1. Click an empty plot
2. Answer the English quiz
3. Watch crop grow
4. Click to harvest
5. Earn XP & Coins

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Ctrl+S** | Save game |
| **F12** | Open developer console |
| **F5** | Refresh page |

---

## UI Buttons

| Button | Action |
|--------|--------|
| **💾 Save** | Save game to LocalStorage |
| **📂 Load** | Load last saved game |
| **🔄 Reset** | Clear all progress (confirm) |

---

## Troubleshooting

### Black/White Screen
- Check browser console (F12)
- Ensure WebGL is enabled
- Try Chrome browser

### No Sound
- Audio files missing from `assets/audio/`
- Download them (links above)
- Game works without sound

### "Module not found"
- Not using HTTP server
- Must use `http://localhost:8000`, not `file://`

### Can't Connect to Server
- Server didn't start properly
- Try `python -m http.server 8000` again
- Check if port 8000 is available

---

## What to Expect

✅ **3D farm** with rotating isometric view  
✅ **8 clickable plots** - brown squares  
✅ **English quizzes** - 20 questions on farming vocabulary/grammar  
✅ **Animated crops** - grow over time, bounce when ripe  
✅ **Sound effects** - (if audio files installed)  
✅ **Real-time stats** - XP, Coins, Harvests counter  
✅ **Auto-save** - every 30 seconds  

---

## Game Loop

```
Click Empty Plot
    ↓
Quiz Appears (4 options)
    ↓
    ├─ Correct ✅ → Crop plants + 5 XP bonus
    └─ Wrong ❌ → Plot locks 10s
    ↓
Wait for Growth (35-60s depending on crop)
    ↓
Crop Ripens (bounces, golden color)
    ↓
Click to Harvest → +XP + Coins
    ↓
Repeat!
```

---

## Crop Info

| Crop | Time | XP | Coins |
|------|------|-----|-------|
| 🍓 Strawberry | 35s | 12 | 30 |
| 🥕 Carrot | 40s | 10 | 25 |
| 🌽 Corn | 45s | 15 | 35 |
| 🍅 Tomato | 50s | 20 | 45 |
| 🍎 Apple | 60s | 25 | 55 |

**Bonus:** +5 XP for answering quiz correctly

---

## File Checklist

After setup, verify these files exist:

```
✅ WordFarmV4/
  ✅ index.html (main file)
  ✅ data.js (quiz database)
  ✅ main.js (game logic)
  ✅ README.md (full documentation)
  ✅ assets/audio/
    ✅ bgm.mp3
    ✅ click.mp3
    ✅ correct.mp3
    ✅ wrong.mp3
    ✅ harvest.mp3
```

---

## Next Steps

1. **Customize:** Edit `data.js` to add more quiz questions
2. **Deploy:** Push to GitHub and enable Pages
3. **Enhance:** Add new crops, sounds, or visual effects
4. **Share:** Deploy URL with friends

---

**Ready? Let's farm! 🌾**



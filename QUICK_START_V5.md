# 🚀 WordFarm V5 - Quick Start Guide

## 5-Minute Setup

### Step 1: Prepare Files (2 min)
```
WordFarmV4/
├── game.html                 ✅ Already created
├── assets/
│   ├── models/               📁 Create this folder
│   │   └── *.glb files       📥 Download 3D models (optional)
│   └── audio/                📁 Create this folder (optional)
└── README_V5.md              ✅ Already created
```

**Create empty folders if they don't exist** (game will still work with or without them).

### Step 2: Download 3D Models (Optional but Recommended) (2 min)

**Download from Quaternius:**
1. Visit: https://quaternius.com/packs/farm.html
2. Click "Download GLTF"
3. Extract ZIP file
4. Copy these files to `WordFarmV4/assets/models/`:
   - `Carrot.glb`
   - `Corn.glb`
   - `Tomato.glb`
   - `AppleTree.glb`
   - `Chicken.glb`
   - `Cow.glb`
   - `Windmill.glb`

> **No models?** Game still works perfectly! It uses geometric shapes as fallback.

### Step 3: Run the Game (1 min)

**Option A: Local Server (Recommended)**
```bash
# Windows: Open Command Prompt in WordFarmV4 folder
cd WordFarmV4
python -m http.server 8000

# Then open browser and visit:
http://localhost:8000/game.html
```

**Option B: Using Node.js**
```bash
npx http-server WordFarmV4
# Visit: http://localhost:8080/game.html
```

**Option C: Using VS Code Live Server**
- Install "Live Server" extension
- Right-click `game.html` → "Open with Live Server"

> **Important**: Don't open `game.html` directly in browser (`file://` won't work for models)

---

## First 30 Seconds Gameplay

### Loading Screen
- Game loads 3D models
- Shows progress bar (0-100%)
- Automatically launches when done

### Game Screen
- **Top-Left**: Stats (XP, Coins, Harvests, Quizzes)
- **Left Sidebar**: Inventory items
- **Bottom-Left**: Save/Load/Reset buttons
- **Bottom-Right**: Help text
- **3D World**: Your farm!

---

## Your First 5 Minutes

### Minute 1: Plant Your First Crop
1. Look at the 3D farm (8 brown squares in grid)
2. **Click any empty brown square**
3. A quiz overlay pops up with a question
4. **Click the correct answer** (English/Vietnamese translation)
5. ✅ Crop planted! Watch it grow

### Minute 2: Wait for Harvest
1. Crop automatically grows (watch the scaling animation)
2. When crop bounces up and down → **It's ripe!**
3. **Click the ripe crop**
4. ✅ Harvested! Coins & XP added

### Minute 3: Raise an Animal
1. Look at darker brown squares below the grid
2. **Click an animal plot**
3. Grammar quiz appears (fill-in-the-blank)
4. **Click the correct grammatical option**
5. ✅ Animal is eating (watch timer)

### Minute 4: Collect from Animal
1. Wait 30-35 seconds for animal to finish eating
2. Animal state changes to "ready"
3. **Click the animal again**
4. ✅ Collect Eggs or Milk!

### Minute 5: Use the Windmill
1. Harvest at least 2 Corn crops
2. Look for the windmill building (tower with rotating blades)
3. **Click the windmill**
4. Sentence scramble quiz appears
5. **Click words in correct order** to form a sentence
6. ✅ Cornmeal processed! Get flour!

---

## Quiz Quick Reference

| Quiz Type | Trigger | Example | Action |
|-----------|---------|---------|--------|
| 🌽 **Vocab** | Click empty plot | "Translate 'cà rốt'" | Choose A/B/C/D |
| 📖 **Grammar** | Click idle animal | "The cow ___ grass" | Choose correct verb |
| 🔀 **Scramble** | Click windmill (need 2 Corn) | "farm / The / is" | Order words → Submit |

---

## Controls Cheat Sheet

| Action | Result |
|--------|--------|
| **Click empty plot** | Start planting quiz |
| **Click ripe crop** | Harvest crop |
| **Click idle animal** | Start feeding quiz |
| **Click ready animal** | Collect product |
| **Click windmill** | Start processing quiz |
| **Ctrl+S** | Save game |
| **Click Load** | Restore last save |
| **Click Reset** | Start over |

---

## Tips & Tricks

### 💡 Pro Tips
- **Plant multiple crops** to always have something growing
- **Raise both animals** to get different products (eggs & milk)
- **Save often** (Ctrl+S) to protect your progress
- **Correct quizzes = bonus XP** on planting
- **Quizzes repeat** - patterns will become familiar

### 🎯 Strategies
1. **Early game**: Focus on quick-growing carrots
2. **Mid game**: Mix carrots + corn for variety
3. **Late game**: Plant corn for windmill processing

### ⚡ Speed Tips
- Carrot (🥕) grows fastest - 40 seconds
- Corn (🌽) is medium - 45 seconds  
- Apple (🍎) takes longest - 60 seconds
- Animals take 30-35 seconds

---

## Common Questions

### Q: Game is running slowly?
**A:** 
- Close other browser tabs
- Disable browser extensions
- Lower graphics quality (DevTools)
- Try a different browser

### Q: I don't see the 3D models?
**A:**
- Check browser console (F12) for 404 errors
- Verify files in `assets/models/` folder
- Make sure you're using a local server
- Fallback geometric shapes will still work

### Q: How do I get audio?
**A:**
- Download audio files from Kenney.nl
- Put in `assets/audio/` folder
- Restart game
- Audio is optional - game works silently

### Q: Quiz answers are wrong?
**A:**
- Click the exact option (not just near it)
- For scramble, click SUBMIT button when done
- Some quizzes have specific correct answers
- Read the options carefully

### Q: Where is my saved game?
**A:**
- Saves stored in browser LocalStorage
- Auto-saves every 30 seconds
- Clearing browser cache will delete saves
- Can't transfer between browsers

### Q: Can I play on my phone?
**A:**
- Not optimized for mobile (requires local server)
- Works on desktop/laptop only
- Small screen makes clicking difficult

---

## Gameplay Loop Summary

```
1. PLANT 🌱
   Click empty plot → Answer vocab quiz → Crop grows automatically

2. HARVEST 🌾
   Wait for growth → Crop bounces when ripe → Click to harvest
   Reward: XP + Coins + Inventory item

3. FEED 🐔
   Click animal plot → Answer grammar quiz → Animal eating state
   Reward: Animal ready to collect

4. COLLECT 🥛
   Wait for animal → Click ready animal → Collect eggs/milk
   Reward: XP + Coins + Inventory item

5. PROCESS ⚙️
   Have 2+ Corn → Click windmill → Answer scramble quiz
   Reward: Convert corn → flour, XP + Coins

6. REPEAT ↩️
   All crops harvested? Plant new ones!
   Auto-save keeps progress safe
```

---

## What Are the Stats?

### XP (Experience Points)
- Earned from: Planting (5 bonus), Harvesting, Collecting, Processing
- Purpose: Track progress & skill level
- No level system - just accumulate!

### Coins
- Earned from: Harvesting crops & collecting products
- Purpose: Placeholder for future shop system
- Different crops/animals earn different amounts

### Harvests
- Counts: Total crops harvested
- Resets: On game reset

### Quizzes
- Counts: Total quizzes answered (correct or wrong)
- Tracks: Your learning progress

### Inventory
- **Crops**: Corn, Carrot, Tomato, Apple
- **Products**: Eggs, Milk, Flour
- **Purpose**: Track what you have

---

## Version History

| Version | Features |
|---------|----------|
| V4 | Single-file, 8 crop plots, vocab quiz, primitives |
| **V5** | ✨ NEW: 3D models, animals, windmill, 3 quiz types, inventory |
| V6+ | Planned: Upgrades, achievements, leaderboards |

---

## Need Help?

### Troubleshooting Steps
1. **Open DevTools**: Press `F12`
2. **Check Console**: Any red errors?
3. **Verify Files**: `assets/models/` and `assets/audio/` exist?
4. **Try Different Browser**: Chrome, Firefox, or Edge
5. **Refresh Page**: Ctrl+Shift+R (hard refresh)

### Still Stuck?
- Read `README_V5.md` for detailed docs
- Check browser console for error messages
- Verify game.html opens without errors

---

## Next Steps

### Master the Game
- ✅ Complete your first harvest
- ✅ Raise both animals (chicken + cow)
- ✅ Process corn through windmill
- ✅ Reach 100+ XP
- ✅ Build a full inventory

### Customize
- Edit quiz questions (modify `ENGLISH_QUIZZES`)
- Change crop growth times
- Adjust colors/styling
- Add your own audio

### Share
- Screenshot your farm!
- Challenge friends to get highest score
- Create custom quiz questions

---

## Summary

You now have **WordFarm V5** running! 🎉

- 🌱 Plant crops & answer English quizzes
- 🐔 Raise animals & learn grammar
- ⚙️ Process goods & solve scrambles
- 📊 Track progress with inventory & stats
- 💾 Save/load your farm anytime

**Happy farming and learning!** 🌾📚

---

**Need more details?** Read `README_V5.md`

**Questions about setup?** Check the Troubleshooting section above

**Ready to customize?** Edit `game.html` directly (all in one file!)

# 🌾 WordFarm V5 - 3D English Learning Game

## Overview
WordFarm V5 is an advanced 3D farming simulation game built with **Three.js** that combines English language learning with engaging gameplay mechanics. Players plant crops, raise animals, and operate a processing mill while answering English quizzes.

### What's New in V5?
✅ **3D Model Support** - Uses GLTFLoader to load real 3D models (`.glb` files) instead of geometric primitives
✅ **Livestock System** - Feed animals (Chicken, Cow) to collect Eggs & Milk
✅ **Processing Building** - Windmill converts Corn to Flour through scramble quizzes
✅ **3 Quiz Types** - Vocabulary, Grammar, and Sentence Scramble
✅ **Inventory System** - Track crops, animals products, and processed goods
✅ **Enhanced UI** - Loading screen, inventory display, floating particles
✅ **Save/Load System** - Persistent game state with localStorage

---

## Getting Started

### 1. File Structure
```
WordFarmV4/
├── game.html                 # Main game file (SINGLE FILE - all-in-one)
├── assets/
│   ├── models/               # 3D Model files (.glb)
│   │   ├── Carrot.glb
│   │   ├── Corn.glb
│   │   ├── Tomato.glb
│   │   ├── AppleTree.glb
│   │   ├── Chicken.glb
│   │   ├── Cow.glb
│   │   ├── Windmill.glb
│   │   └── DirtPlot.glb
│   └── audio/                # Audio files (optional)
│       ├── bgm.mp3
│       ├── click.mp3
│       ├── correct.mp3
│       ├── wrong.mp3
│       └── harvest.mp3
└── README_V5.md              # This file
```

### 2. How to Run
Simply open `game.html` in any modern web browser:
```bash
# Option A: Double-click the file
game.html

# Option B: Use a local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000/WordFarmV4/game.html

# Option C: Using Node.js http-server
npx http-server
# Then visit http://localhost:8080/WordFarmV4/game.html
```

> **Important**: The game requires a local server to load `.glb` models due to CORS restrictions. Do NOT open via `file://` protocol.

---

## Gameplay Mechanics

### 🌱 Planting Crops
1. **Click** an empty brown plot
2. **Answer** a Vocabulary Quiz (4 multiple-choice options)
3. **Correct Answer** → Crop planted (grows automatically)
4. **Wait** for the crop to mature (growth timer varies by crop)
5. **Click** the ripe crop to harvest
6. **Collect** Coins & XP

**Crops Available:**
| Crop | Grow Time | XP | Coins | Model |
|------|-----------|----|----|-------|
| 🥕 Carrot | 40s | 10 | 25 | Carrot.glb |
| 🌽 Corn | 45s | 15 | 35 | Corn.glb |
| 🍅 Tomato | 50s | 20 | 45 | Tomato.glb |
| 🍎 Apple Tree | 60s | 25 | 55 | AppleTree.glb |

### 🐔 Raising Animals
1. **Click** an animal plot (darker brown, separate area)
2. **Answer** a Grammar Quiz (fill-in-the-blank)
3. **Correct Answer** → Animal enters eating state (30-35 seconds)
4. **Wait** for the animal to be ready
5. **Click** the ready animal to collect
6. **Collect** Eggs/Milk + Coins & XP

**Animals Available:**
| Animal | Feed Time | XP | Coins | Collects | Model |
|--------|-----------|----|----|----------|-------|
| 🐔 Chicken | 30s | 12 | 40 | Eggs | Chicken.glb |
| 🐄 Cow | 35s | 15 | 50 | Milk | Cow.glb |

### ⚙️ Operating the Windmill
1. **Have** 2+ Corn in inventory
2. **Click** the Windmill (building in corner)
3. **Answer** a Sentence Scramble Quiz (drag/click words to order)
4. **Correct Answer** → Windmill processes (converts 2 Corn → 1 Flour)
5. **Collect** Flour + Coins & XP

---

## Quiz Types

### 📚 Vocabulary Quiz (Crop Planting)
- **Type**: Multiple Choice (4 options)
- **Language**: Vietnamese ↔ English translation
- **Examples**:
  - "What is 'trang trại' in English?" → Farm
  - "Translate 'cà rốt' into English" → Carrot
- **Reward**: +5 bonus XP on correct answer

### 📖 Grammar Quiz (Animal Feeding)
- **Type**: Fill-in-the-blank
- **Language**: English grammar
- **Examples**:
  - "The cow ___ eating grass" → eats
  - "She ___ three eggs yesterday" → collected
- **Reward**: Animal enters feeding state

### 🔀 Scramble Quiz (Windmill Processing)
- **Type**: Sentence ordering
- **Language**: English sentence construction
- **Examples**:
  - Words: [farm, is, The, big] → "The farm is big"
  - Words: [I, love, farm, animals] → "I love farm animals"
- **Reward**: 2 Corn → 1 Flour + 50 coins

---

## HUD (Heads-Up Display)

### Top-Left Stats
```
⭐ XP:        0          # Total experience points
💰 Coins:     0          # Currency for upgrades
🚜 Harvests:  0          # Total crops harvested
🎓 Quizzes:   0          # Quizzes answered
```

### Inventory
```
📦 Inventory
🌽 Corn:      2          # Harvested crops
🥕 Carrot:    1
🍅 Tomato:    0
🍎 Apple:     0
🥚 Eggs:      1          # Animal products
🥛 Milk:      2
🌾 Flour:     0          # Processed goods
```

### Buttons (Bottom-Left)
- **💾 Save** - Save game to browser storage
- **📂 Load** - Load last saved game
- **🔄 Reset** - Reset game (confirmation required)

---

## 3D Model Setup

### Downloading Models

#### Option 1: Quaternius (Recommended)
Visit https://quaternius.com/packs/farm.html
1. Click "Download GLTF"
2. Extract the ZIP file
3. Copy `.glb` files to `WordFarmV4/assets/models/`

**Models to download:**
- Carrot.glb
- Corn.glb
- Tomato.glb
- AppleTree.glb
- Chicken.glb
- Cow.glb
- Windmill.glb
- DirtPlot.glb

#### Option 2: Using Fallback Geometric Shapes
If models aren't found, the game automatically falls back to procedural geometry (spheres, boxes, cylinders). This works but isn't as visually appealing.

### Model Directory Structure
```
WordFarmV4/
└── assets/
    └── models/
        ├── Carrot.glb
        ├── Corn.glb
        ├── Tomato.glb
        ├── AppleTree.glb
        ├── Chicken.glb
        ├── Cow.glb
        ├── Windmill.glb
        └── DirtPlot.glb
```

---

## Audio Setup (Optional)

### Audio Files
Place audio files in `WordFarmV4/assets/audio/`:
- `bgm.mp3` - Background music (loops)
- `click.mp3` - UI click sound
- `correct.mp3` - Correct answer sound
- `wrong.mp3` - Wrong answer sound
- `harvest.mp3` - Crop harvest sound

### Audio Sources
- **Kenney.nl** - Free royalty-free audio packs
- **Freesound.org** - Community sound effects
- **Zapsplat** - Free sound effects

If audio files are missing, the game will still run normally (just silently).

---

## Game Controls

| Action | Effect |
|--------|--------|
| **Move Mouse** | Highlight plots/objects |
| **Left Click** | Interact with plots, quizzes, answers |
| **Ctrl+S** (or Cmd+S) | Save game |
| **Quiz Buttons** | Click options/words to answer |

---

## Technical Details

### Technologies Used
- **Three.js** (v0.128.0) - 3D graphics
- **GLTFLoader** - Load 3D models
- **Howler.js** - Audio management
- **Tailwind CSS** - UI styling
- **JavaScript ES6** - Game logic
- **LocalStorage** - Save/load system

### Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ❌ Not supported (requires ES6)

### Performance
- **Target FPS**: 60 FPS
- **Shadows**: Enabled for realistic lighting
- **Model LOD**: Auto-scales based on distance
- **Draw calls**: Optimized with batch rendering

---

## Game Loop Flow

```
1. LOADING → Load 3D models asynchronously (shows progress bar)
2. IDLE → Wait for player interaction
3. PLOT CLICK:
   ├─ If empty → Show Vocab Quiz
   ├─ If ripe → Harvest crop
   └─ If cooldown → Show cooldown message
4. ANIMAL CLICK:
   ├─ If idle → Show Grammar Quiz
   └─ If ready → Collect product
5. WINDMILL CLICK:
   ├─ If 2+ Corn → Show Scramble Quiz
   └─ Else → Show error message
6. QUIZ ANSWERED:
   ├─ If correct → Process action (plant/feed/mill)
   ├─ Add XP/Coins/inventory items
   └─ Show success toast
7. AUTO-SAVE → Every 30 seconds
```

---

## Quiz Database

### Vocabulary Quizzes (20 questions)
Vietnamese ↔ English translation
- Farm, crop, harvest, vegetables
- Animal names (cow, chicken)
- Plant parts and soil

### Grammar Quizzes (10 questions)
Fill-in-the-blank with correct verb/tense
- Present tense: "The cow eats"
- Past tense: "She collected eggs"
- Modal verbs: "I have started"

### Scramble Quizzes (8 questions)
Arrange words into correct English sentences
- "The farm is big"
- "I love farm animals"
- "We harvest crops today"

---

## Saving & Loading

### Auto-Save
The game auto-saves every 30 seconds to browser LocalStorage:
```
Key: wordfarm_v5_save
Data: { gameState, timestamp }
```

### Manual Save
Click **💾 Save** button or press **Ctrl+S**

### Manual Load
Click **📂 Load** button to restore last saved game

### Reset
Click **🔄 Reset** to start fresh (WARNING: irreversible)

---

## Troubleshooting

### Models not loading?
1. ✅ Check file structure: `assets/models/` folder exists
2. ✅ Verify model filenames match exactly (case-sensitive on Linux)
3. ✅ Run on a local server (not `file://` protocol)
4. ✅ Check browser console for 404 errors
5. ✅ Fallback mode will use geometric shapes

### Audio not playing?
1. ✅ Check browser audio permissions
2. ✅ Verify audio files in `assets/audio/` folder
3. ✅ Check browser console for errors
4. ✅ Game works fine without audio

### Game runs slowly?
1. ✅ Reduce browser extensions
2. ✅ Close other tabs
3. ✅ Check GPU acceleration is enabled
4. ✅ Lower camera resolution in DevTools

### Quiz not appearing?
1. ✅ Ensure you clicked an empty plot (not growing/ripe)
2. ✅ Check for cooldown timers (wait if locked)
3. ✅ Try refreshing the page

---

## Customization

### Modify Quiz Questions
Edit the `ENGLISH_QUIZZES` object in `game.html`:
```javascript
const ENGLISH_QUIZZES = {
  vocab: [
    { id: 1, question: "Your question?", options: ['A', 'B', 'C', 'D'], correct: 0 },
    // Add more...
  ],
  // ...
};
```

### Adjust Growth Times
Edit `CROPS` object in `game.html`:
```javascript
const CROPS = {
  carrot: { id: 'carrot', name: 'Carrot', growTime: 40, ... },
  // Increase/decrease growTime (in seconds)
};
```

### Change Colors/Styling
Modify the `<style>` section or adjust Three.js material colors:
```javascript
const plotMat = new THREE.MeshLambertMaterial({ color: 0x8B7355 }); // Brown
// Change hex color codes
```

---

## Future Enhancements

Possible V6+ features:
- 🎯 Difficulty levels (Easy/Normal/Hard)
- 🏆 Leaderboard & achievements
- 🎨 Character skins & farm themes
- 👥 Multiplayer (co-op farming)
- 📊 Progress statistics & analytics
- 🎮 Mobile touch controls
- 🌙 Day/night cycle
- 💼 Farm shop & upgrades
- 📱 Cross-device save sync
- 🌐 Cloud save (Firebase/similar)

---

## Credits & Resources

- **Three.js** - https://threejs.org/
- **Quaternius** - 3D models (CC0 license)
- **Kenney.nl** - Sound effects
- **Howler.js** - Audio library
- **Tailwind CSS** - Utility-first CSS framework

---

## License

This project uses CC0 (public domain) 3D models from Quaternius and free audio from Kenney.nl. Feel free to modify and distribute as needed.

---

## Support

For issues, questions, or suggestions:
1. Check the **Troubleshooting** section above
2. Open browser **DevTools** (F12) → Console tab for errors
3. Verify all files are in correct directories
4. Test on a different browser

---

**Happy Farming! 🌾🎮📚**

v5.0.0 - Built with ❤️ for English learners

# 🌾 WordFarm V5 - GitHub Libraries Setup Guide

## Problem
The game was getting `GLTFLoader is not a constructor` error due to CDN script loading issues.

## Solution
Download all required libraries from GitHub locally and use them instead of CDN links.

## Required Libraries

### 1. Three.js (3D Graphics)
- **Download from:** https://github.com/mrdoob/three.js
- **What you need:**
  - `three.min.js` (main library)
  - `GLTFLoader.js` (for 3D model loading)
  - `OrbitControls.js` (optional, for camera control)

### 2. Howler.js (Audio)
- **Download from:** https://github.com/goldfire/howler.js
- **What you need:**
  - `howler.min.js` (main audio library)

### 3. Tailwind CSS
- **Download from:** https://github.com/tailwindlabs/tailwindcss
- **Alternative:** Keep CDN link (it's more reliable)

## Step-by-Step Setup

### Step 1: Create lib Directory
```bash
cd WordFarmV4
mkdir libs
cd libs
mkdir three
mkdir howler
```

### Step 2: Download Three.js
1. Go to: https://github.com/mrdoob/three.js/releases
2. Download `three.min.js` from the latest release
3. Save to: `libs/three/three.min.js`

4. For GLTFLoader:
   - Go to: https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/GLTFLoader.js
   - Click "Raw" button
   - Save file to: `libs/three/GLTFLoader.js`

### Step 3: Download Howler.js
1. Go to: https://github.com/goldfire/howler.js/releases
2. Download `howler.min.js`
3. Save to: `libs/howler/howler.min.js`

## Updated game.html Links

Replace the CDN links in game.html with:

```html
<!-- Three.js (Local) -->
<script src="./libs/three/three.min.js"></script>
<script src="./libs/three/GLTFLoader.js"></script>

<!-- Howler.js (Local) -->
<script src="./libs/howler/howler.min.js"></script>

<!-- Tailwind CSS (CDN - keep this) -->
<script src="https://cdn.tailwindcss.com"></script>
```

## Quick Download Links

### Direct Download Commands (PowerShell):
```powershell
# Create directories
mkdir libs\three, libs\howler -Force

# Download Three.js
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js" -OutFile "libs\three\three.min.js"

# Download GLTFLoader
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js" -OutFile "libs\three\GLTFLoader.js"

# Download Howler.js
Invoke-WebRequest -Uri "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js" -OutFile "libs\howler\howler.min.js"
```

## File Structure After Setup
```
WordFarmV4/
├── game.html
├── config.js
├── index.html
├── libs/
│   ├── three/
│   │   ├── three.min.js
│   │   └── GLTFLoader.js
│   └── howler/
│       └── howler.min.js
└── assets/
    ├── models/
    └── audio/
```

## Testing
1. Run: `python -m http.server 3000`
2. Open: `http://localhost:3000/WordFarmV4/game.html`
3. Check browser console for errors

## Benefits
✅ No CDN dependency
✅ Works offline
✅ Faster loading
✅ No external script failures
✅ Better for deployment

## Support
If you encounter issues:
1. Verify file paths are correct
2. Check browser console for errors
3. Ensure all files are downloaded completely
4. Restart the HTTP server

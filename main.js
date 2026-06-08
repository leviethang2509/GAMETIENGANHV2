// WordFarm V4 - Main Game Engine
// Three.js 3D Rendering + Game Logic + Audio + Save/Load

import { CROPS, CROP_ARRAY, ENGLISH_QUIZZES, GAME_CONFIG } from './data.js';

// ===== GLOBAL STATE =====
let gameState = {
  plots: {},
  xp: 0,
  coins: 0,
  harvests: 0,
  currentQuiz: null,
  selectedPlotId: null,
  cooldownPlots: {} // plotId -> cooldownTime
};

// ===== THREE.JS SETUP =====
let scene, camera, renderer, raycaster, mouse;
let plotObjects = {}; // plotId -> THREE.Object3D
let cropMeshes = {}; // plotId -> crop mesh
let startTime = Date.now();

function initThreeJS() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB); // Sky blue

  // Camera - Isometric view
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(12, 10, 12);
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Raycaster for mouse picking
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  // Ground plane
  const groundGeom = new THREE.PlaneGeometry(20, 20);
  const groundMat = new THREE.MeshLambertMaterial({ color: 0x90EE90 }); // Light green
  const ground = new THREE.Mesh(groundGeom, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Create 8 farm plots (2 rows x 4 columns)
  let plotId = 0;
  for (let z = 0; z < 2; z++) {
    for (let x = 0; x < 4; x++) {
      const posX = (x - 1.5) * GAME_CONFIG.PLOT_SPACING;
      const posZ = (z - 0.5) * GAME_CONFIG.PLOT_SPACING;
      createPlot(plotId, posX, 0, posZ);
      plotId++;
    }
  }

  // Mouse events
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('click', onMouseClick);
  window.addEventListener('resize', onWindowResize);

  // Start game loop
  animate();
}

function createPlot(id, x, y, z) {
  const plotGeom = new THREE.BoxGeometry(GAME_CONFIG.PLOT_SIZE, 0.5, GAME_CONFIG.PLOT_SIZE);
  const plotMat = new THREE.MeshLambertMaterial({ color: 0x8B7355 }); // Brown
  const plot = new THREE.Mesh(plotGeom, plotMat);
  plot.position.set(x, y, z);
  plot.castShadow = true;
  plot.receiveShadow = true;
  plot.userData = { plotId: id };
  scene.add(plot);

  plotObjects[id] = plot;

  gameState.plots[id] = {
    state: 'empty', // empty, seed, growing, ripe
    crop: null,
    timeLeft: 0,
    totalTime: 0,
    plantedAt: null
  };
}

function createCropMesh(crop, position) {
  let mesh;

  switch (crop.shape) {
    case 'cone':
      const coneGeom = new THREE.ConeGeometry(0.6, 1.5, 8);
      const coneMat = new THREE.MeshStandardMaterial({ color: crop.color });
      mesh = new THREE.Mesh(coneGeom, coneMat);
      break;

    case 'cylinder':
      const cylGeom = new THREE.CylinderGeometry(0.6, 0.6, 1.5, 8);
      const cylMat = new THREE.MeshStandardMaterial({ color: crop.color });
      mesh = new THREE.Mesh(cylGeom, cylMat);
      break;

    case 'sphere':
      const sphereGeom = new THREE.SphereGeometry(0.7, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({ color: crop.color });
      mesh = new THREE.Mesh(sphereGeom, sphereMat);
      break;

    case 'tree':
      // Apple tree: trunk (cylinder) + leaves (sphere)
      const trunkGeom = new THREE.CylinderGeometry(0.3, 0.4, 1.5, 6);
      const trunkMat = new THREE.MeshStandardMaterial({ color: crop.color });
      const trunk = new THREE.Mesh(trunkGeom, trunkMat);

      const leavesGeom = new THREE.SphereGeometry(0.8, 16, 16);
      const leavesMat = new THREE.MeshStandardMaterial({ color: crop.leafColor });
      const leaves = new THREE.Mesh(leavesGeom, leavesMat);
      leaves.position.y = 1.2;

      mesh = new THREE.Group();
      mesh.add(trunk);
      mesh.add(leaves);
      break;

    default:
      // Seed: small green sphere
      const seedGeom = new THREE.SphereGeometry(0.3, 8, 8);
      const seedMat = new THREE.MeshStandardMaterial({ color: 0x90EE90 });
      mesh = new THREE.Mesh(seedGeom, seedMat);
  }

  mesh.position.copy(position);
  mesh.position.y += 0.5; // Above the plot
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  return mesh;
}

// ===== GAME LOGIC =====

function plantCrop(plotId, crop) {
  const plot = gameState.plots[plotId];
  plot.state = 'seed';
  plot.crop = crop;
  plot.timeLeft = GAME_CONFIG.SEED_GERMINATION_TIME;
  plot.totalTime = GAME_CONFIG.SEED_GERMINATION_TIME + crop.growTime;
  plot.plantedAt = Date.now();

  // Remove old crop mesh if exists
  if (cropMeshes[plotId]) {
    scene.remove(cropMeshes[plotId]);
  }

  // Create new crop mesh (as seed)
  const plotPos = plotObjects[plotId].position;
  cropMeshes[plotId] = createCropMesh(
    { shape: 'sphere', color: 0x90EE90 }, // Seed is green sphere
    plotPos
  );

  console.log(`🌱 Planted ${crop.name} on plot ${plotId}`);
  playSound('click');
}

function harvestCrop(plotId) {
  const plot = gameState.plots[plotId];
  if (plot.state !== 'ripe') return;

  const crop = plot.crop;
  gameState.xp += crop.xp;
  gameState.coins += crop.coins;
  gameState.harvests++;

  // Remove crop mesh
  if (cropMeshes[plotId]) {
    scene.remove(cropMeshes[plotId]);
    delete cropMeshes[plotId];
  }

  // Reset plot
  plot.state = 'empty';
  plot.crop = null;
  plot.timeLeft = 0;
  plot.totalTime = 0;

  console.log(`🚜 Harvested ${crop.name} | +${crop.xp} XP, +${crop.coins} Coins`);
  playSound('harvest');
  updateHUD();
}

function showQuiz(plotId) {
  gameState.selectedPlotId = plotId;
  
  // Pick random quiz
  const quiz = ENGLISH_QUIZZES[Math.floor(Math.random() * ENGLISH_QUIZZES.length)];
  gameState.currentQuiz = quiz;

  // Show overlay
  document.getElementById('quizOverlay').classList.remove('hidden');
  document.getElementById('quizQuestion').textContent = quiz.question;
  
  const optionsDiv = document.getElementById('quizOptions');
  optionsDiv.innerHTML = '';
  quiz.options.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.className = 'quiz-option';
    btn.onclick = () => answerQuiz(idx);
    optionsDiv.appendChild(btn);
  });
}

function answerQuiz(selectedIdx) {
  const quiz = gameState.currentQuiz;
  const plotId = gameState.selectedPlotId;

  if (selectedIdx === quiz.correct) {
    // Correct answer
    console.log('✅ Correct!');
    playSound('correct');

    // Get random crop
    const crop = CROP_ARRAY[Math.floor(Math.random() * CROP_ARRAY.length)];

    // Plant crop
    plantCrop(plotId, crop);

    // Add bonus XP
    gameState.xp += GAME_CONFIG.BONUS_XP_CORRECT;

    // Close quiz
    closeQuiz();
    updateHUD();

    // Show success message
    showToast('✅ Correct! Crop planted + 5 bonus XP', 'success');
  } else {
    // Wrong answer
    console.log('❌ Wrong!');
    playSound('wrong');

    // Add cooldown
    gameState.cooldownPlots[plotId] = GAME_CONFIG.COOLDOWN_TIME;

    // Close quiz
    closeQuiz();

    // Show error message
    showToast(`❌ Wrong! Plot locked for ${GAME_CONFIG.COOLDOWN_TIME}s`, 'error');
  }
}

function closeQuiz() {
  document.getElementById('quizOverlay').classList.add('hidden');
  gameState.currentQuiz = null;
  gameState.selectedPlotId = null;
}

// ===== ANIMATION & UPDATE =====

function animate() {
  requestAnimationFrame(animate);

  const currentTime = (Date.now() - startTime) / 1000; // elapsed seconds

  // Update crop growth
  for (let plotId = 0; plotId < GAME_CONFIG.PLOT_COUNT; plotId++) {
    const plot = gameState.plots[plotId];
    const cropMesh = cropMeshes[plotId];

    if (plot.crop && cropMesh) {
      if (plot.state === 'seed') {
        const elapsed = (Date.now() - plot.plantedAt) / 1000;
        if (elapsed >= GAME_CONFIG.SEED_GERMINATION_TIME) {
          // Transition to growing
          plot.state = 'growing';
          console.log(`🌱 ${plot.crop.name} is growing`);
        }
      } else if (plot.state === 'growing') {
        const elapsed = (Date.now() - plot.plantedAt) / 1000;
        const totalGrowth = GAME_CONFIG.SEED_GERMINATION_TIME + plot.crop.growTime;
        if (elapsed >= totalGrowth) {
          // Transition to ripe
          plot.state = 'ripe';
          console.log(`🎉 ${plot.crop.name} is ripe!`);
          playSound('correct'); // Notification sound
        }
      }

      // Update scale based on growth
      if (plot.state === 'seed') {
        cropMesh.scale.set(0.5, 0.5, 0.5);
      } else if (plot.state === 'growing') {
        const elapsed = (Date.now() - plot.plantedAt) / 1000;
        const growProgress = Math.min(1, (elapsed - GAME_CONFIG.SEED_GERMINATION_TIME) / plot.crop.growTime);
        const scale = 0.5 + growProgress * 0.5;
        cropMesh.scale.set(scale, scale, scale);
      } else if (plot.state === 'ripe') {
        // Bounce animation
        const bounce = Math.sin(currentTime * 3) * 0.05;
        cropMesh.scale.set(1 + bounce, 1 + bounce, 1 + bounce);
      }
    }
  }

  // Update cooldowns
  for (const plotId in gameState.cooldownPlots) {
    gameState.cooldownPlots[plotId]--;
    if (gameState.cooldownPlots[plotId] <= 0) {
      delete gameState.cooldownPlots[plotId];
    }
  }

  renderer.render(scene, camera);
}

// ===== MOUSE INTERACTION =====

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const plotMeshes = Object.values(plotObjects);
  const intersects = raycaster.intersectObjects(plotMeshes);

  // Reset all plots
  plotMeshes.forEach(plot => {
    plot.material.color.set(0x8B7355); // Brown
  });

  // Highlight hovered plot
  if (intersects.length > 0) {
    intersects[0].object.material.color.set(0xA0826D); // Lighter brown
  }
}

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const plotMeshes = Object.values(plotObjects);
  const intersects = raycaster.intersectObjects(plotMeshes);

  if (intersects.length > 0) {
    const clickedPlot = intersects[0].object;
    const plotId = clickedPlot.userData.plotId;

    // Check cooldown
    if (gameState.cooldownPlots[plotId]) {
      showToast(`⏳ Plot on cooldown: ${gameState.cooldownPlots[plotId]}s`, 'info');
      return;
    }

    const plot = gameState.plots[plotId];

    if (plot.state === 'empty') {
      // Show quiz
      showQuiz(plotId);
    } else if (plot.state === 'ripe') {
      // Harvest
      harvestCrop(plotId);
    }
  }
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// ===== AUDIO SYSTEM (Howler.js) =====

const sounds = {
  bgm: null,
  click: null,
  correct: null,
  wrong: null,
  harvest: null
};

function initAudio() {
  // Download instructions as comments:
  // BGM: Download from Pixabay - Search "Happy acoustic farm"
  // Click: Download from Kenney.nl - "UI Audio" pack
  // Correct: Download from Pixabay - Search "Correct answer chime"
  // Wrong: Download from Pixabay - Search "Error buzz"
  // Harvest: Download from Kenney.nl - "Casino Audio" pack

  try {
    sounds.bgm = new Howl({
      src: ['./assets/audio/bgm.mp3'],
      loop: true,
      volume: 0.3,
      onloaderror: () => console.warn('BGM not found')
    });

    sounds.click = new Howl({
      src: ['./assets/audio/click.mp3'],
      volume: 0.5,
      onloaderror: () => console.warn('Click sound not found')
    });

    sounds.correct = new Howl({
      src: ['./assets/audio/correct.mp3'],
      volume: 0.6,
      onloaderror: () => console.warn('Correct sound not found')
    });

    sounds.wrong = new Howl({
      src: ['./assets/audio/wrong.mp3'],
      volume: 0.5,
      onloaderror: () => console.warn('Wrong sound not found')
    });

    sounds.harvest = new Howl({
      src: ['./assets/audio/harvest.mp3'],
      volume: 0.7,
      onloaderror: () => console.warn('Harvest sound not found')
    });

    // Start BGM
    sounds.bgm.play();
  } catch (e) {
    console.warn('Howler.js not loaded or audio files missing', e);
  }
}

function playSound(soundName) {
  if (sounds[soundName]) {
    try {
      sounds[soundName].play();
    } catch (e) {
      console.warn(`Could not play sound: ${soundName}`);
    }
  }
}

// ===== UI & HUD =====

function updateHUD() {
  document.getElementById('xpDisplay').textContent = gameState.xp;
  document.getElementById('coinsDisplay').textContent = gameState.coins;
  document.getElementById('harvestsDisplay').textContent = gameState.harvests;
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

// ===== SAVE/LOAD SYSTEM =====

function saveGame() {
  const saveData = {
    gameState,
    timestamp: Date.now()
  };
  localStorage.setItem('wordfarm_v4_save', JSON.stringify(saveData));
  showToast('💾 Game saved!', 'success');
  console.log('💾 Game saved');
}

function loadGame() {
  const saveStr = localStorage.getItem('wordfarm_v4_save');
  if (!saveStr) {
    showToast('❌ No save found', 'error');
    return;
  }

  const saveData = JSON.parse(saveStr);
  gameState = saveData.gameState;
  updateHUD();
  showToast('📂 Game loaded!', 'success');
  console.log('📂 Game loaded');
}

function resetGame() {
  if (!confirm('⚠️ Reset game? This cannot be undone!')) return;

  gameState.xp = 0;
  gameState.coins = 0;
  gameState.harvests = 0;
  gameState.plots = {};
  gameState.currentQuiz = null;
  gameState.selectedPlotId = null;
  gameState.cooldownPlots = {};

  // Remove all crop meshes
  for (const plotId in cropMeshes) {
    scene.remove(cropMeshes[plotId]);
  }
  cropMeshes = {};

  // Reinitialize plots
  let plotId = 0;
  for (let z = 0; z < 2; z++) {
    for (let x = 0; x < 4; x++) {
      const posX = (x - 1.5) * GAME_CONFIG.PLOT_SPACING;
      const posZ = (z - 0.5) * GAME_CONFIG.PLOT_SPACING;
      gameState.plots[plotId] = {
        state: 'empty',
        crop: null,
        timeLeft: 0,
        totalTime: 0,
        plantedAt: null
      };
      plotId++;
    }
  }

  localStorage.removeItem('wordfarm_v4_save');
  updateHUD();
  showToast('✅ Game reset!', 'success');
  console.log('🔄 Game reset');
}

// ===== KEYBOARD SHORTCUTS =====

window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveGame();
  }
});

// ===== INITIALIZATION =====

window.addEventListener('load', () => {
  console.log('🎮 WordFarm V4 - 3D English Learning Game Started!');

  // Load saved game if exists
  const saveStr = localStorage.getItem('wordfarm_v4_save');
  if (saveStr) {
    const saveData = JSON.parse(saveStr);
    gameState = saveData.gameState;
  } else {
    // Initialize fresh game
    for (let i = 0; i < GAME_CONFIG.PLOT_COUNT; i++) {
      gameState.plots[i] = {
        state: 'empty',
        crop: null,
        timeLeft: 0,
        totalTime: 0,
        plantedAt: null
      };
    }
  }

  initThreeJS();
  initAudio();
  updateHUD();

  // Auto-save every 30 seconds
  setInterval(() => {
    const saveData = { gameState, timestamp: Date.now() };
    localStorage.setItem('wordfarm_v4_save', JSON.stringify(saveData));
    console.log('💾 Auto-saved');
  }, 30000);

  // Expose functions globally for HTML buttons
  window.saveGame = saveGame;
  window.loadGame = loadGame;
  window.resetGame = resetGame;
  window.closeQuiz = closeQuiz;
});

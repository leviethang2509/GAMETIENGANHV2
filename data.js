// WordFarm V4 - Data Layer
// Crop Configurations & English Quiz Database

// ===== CROP CONFIGURATIONS =====
export const CROPS = {
  strawberry: {
    id: 'strawberry',
    name: 'Strawberry',
    emoji: '🍓',
    growTime: 35,
    xp: 12,
    coins: 30,
    color: 0xFF6B9D, // Red/Pink
    shape: 'cone' // Cone shape
  },
  carrot: {
    id: 'carrot',
    name: 'Carrot',
    emoji: '🥕',
    growTime: 40,
    xp: 10,
    coins: 25,
    color: 0xFFA500, // Orange
    shape: 'cone'
  },
  corn: {
    id: 'corn',
    name: 'Corn',
    emoji: '🌽',
    growTime: 45,
    xp: 15,
    coins: 35,
    color: 0xFFD700, // Yellow
    shape: 'cylinder'
  },
  tomato: {
    id: 'tomato',
    name: 'Tomato',
    emoji: '🍅',
    growTime: 50,
    xp: 20,
    coins: 45,
    color: 0xFF4500, // Red/Orange
    shape: 'sphere'
  },
  apple: {
    id: 'apple',
    name: 'Apple Tree',
    emoji: '🍎',
    growTime: 60,
    xp: 25,
    coins: 55,
    color: 0x8B4513, // Brown trunk
    leafColor: 0x228B22, // Green leaves
    shape: 'tree'
  }
};

export const CROP_ARRAY = Object.values(CROPS);

// ===== ENGLISH QUIZ DATABASE =====
// Farm & Nature Vocabulary + Grammar Questions
export const ENGLISH_QUIZZES = [
  // Vocabulary - Farm Animals & Plants
  {
    id: 1,
    question: "What is the Vietnamese word for 'farm'?",
    options: ['A) Nhà hàng', 'B) Trang trại', 'C) Cây cối', 'D) Đất đai'],
    correct: 1, // B) Trang trại
    category: 'vocabulary'
  },
  {
    id: 2,
    question: "Translate: 'crop' into Vietnamese",
    options: ['A) Vụ mùa', 'B) Cây trồng', 'C) Thu hoạch', 'D) Nông dân'],
    correct: 1, // B) Cây trồng
    category: 'vocabulary'
  },
  {
    id: 3,
    question: "What does 'harvest' mean in Vietnamese?",
    options: ['A) Bao bọc', 'B) Trồng', 'C) Thu hoạch', 'D) Gieo hạt'],
    correct: 2, // C) Thu hoạch
    category: 'vocabulary'
  },
  {
    id: 4,
    question: "Fill in: 'I like to eat fresh ___'",
    options: ['A) water', 'B) vegetables', 'C) milk', 'D) bread'],
    correct: 1, // B) vegetables
    category: 'grammar'
  },
  {
    id: 5,
    question: "Complete: 'The farmer ___ the crops every day.'",
    options: ['A) waters', 'B) water', 'C) watering', 'D) watered'],
    correct: 0, // A) waters
    category: 'grammar'
  },
  {
    id: 6,
    question: "What is 'dâu tây' in English?",
    options: ['A) Blueberry', 'B) Strawberry', 'C) Raspberry', 'D) Blackberry'],
    correct: 1, // B) Strawberry
    category: 'vocabulary'
  },
  {
    id: 7,
    question: "Translate: 'cà rốt' into English",
    options: ['A) Corn', 'B) Carrot', 'C) Cauliflower', 'D) Celery'],
    correct: 1, // B) Carrot
    category: 'vocabulary'
  },
  {
    id: 8,
    question: "What is 'ngô' in English?",
    options: ['A) Carrot', 'B) Corn', 'C) Bean', 'D) Pea'],
    correct: 1, // B) Corn
    category: 'vocabulary'
  },
  {
    id: 9,
    question: "How do you say 'cà chua' in English?",
    options: ['A) Onion', 'B) Tomato', 'C) Pepper', 'D) Cucumber'],
    correct: 1, // B) Tomato
    category: 'vocabulary'
  },
  {
    id: 10,
    question: "What is 'táo' in English?",
    options: ['A) Orange', 'B) Grape', 'C) Apple', 'D) Pear'],
    correct: 2, // C) Apple
    category: 'vocabulary'
  },
  {
    id: 11,
    question: "Fill in: 'She ___ three apples yesterday.'",
    options: ['A) eat', 'B) eats', 'C) ate', 'D) eating'],
    correct: 2, // C) ate
    category: 'grammar'
  },
  {
    id: 12,
    question: "Choose the correct sentence:",
    options: ['A) He grow vegetables.', 'B) He grows vegetables.', 'C) He growing vegetables.', 'D) He growed vegetables.'],
    correct: 1, // B) He grows vegetables.
    category: 'grammar'
  },
  {
    id: 13,
    question: "What is the plural of 'crop'?",
    options: ['A) Cropes', 'B) Crops', 'C) Cropp', 'D) Cropi'],
    correct: 1, // B) Crops
    category: 'vocabulary'
  },
  {
    id: 14,
    question: "Translate: 'nông dân' into English",
    options: ['A) Farm', 'B) Farmer', 'C) Farming', 'D) Farmland'],
    correct: 1, // B) Farmer
    category: 'vocabulary'
  },
  {
    id: 15,
    question: "Fill in: '___ you like farming?'",
    options: ['A) Do', 'B) Does', 'C) Did', 'D) Are'],
    correct: 0, // A) Do
    category: 'grammar'
  },
  {
    id: 16,
    question: "What is the English word for 'mưa'?",
    options: ['A) Sun', 'B) Rain', 'C) Snow', 'D) Wind'],
    correct: 1, // B) Rain
    category: 'vocabulary'
  },
  {
    id: 17,
    question: "Fill in: 'Plants need ___ to grow.'",
    options: ['A) light', 'B) darkness', 'C) fire', 'D) stone'],
    correct: 0, // A) light
    category: 'grammar'
  },
  {
    id: 18,
    question: "Translate: 'đất' into English",
    options: ['A) Water', 'B) Soil', 'C) Sky', 'D) Rock'],
    correct: 1, // B) Soil
    category: 'vocabulary'
  },
  {
    id: 19,
    question: "What is the opposite of 'plant' (verb)?",
    options: ['A) Harvest', 'B) Grow', 'C) Water', 'D) Sow'],
    correct: 0, // A) Harvest
    category: 'vocabulary'
  },
  {
    id: 20,
    question: "Fill in: 'This farm is ___ beautiful than that one.'",
    options: ['A) more', 'B) most', 'C) many', 'D) much'],
    correct: 0, // A) more
    category: 'grammar'
  }
];

// Game constants
export const GAME_CONFIG = {
  PLOT_COUNT: 8,
  SEED_GERMINATION_TIME: 2, // seconds
  PLOT_SIZE: 2,
  PLOT_SPACING: 4,
  CAMERA_DISTANCE: 15,
  MAX_XP_PER_SESSION: 9999,
  MAX_COINS_PER_SESSION: 9999,
  COOLDOWN_TIME: 10, // seconds after wrong answer
  BONUS_XP_CORRECT: 5 // bonus XP for correct answer
};

export default {
  CROPS,
  CROP_ARRAY,
  ENGLISH_QUIZZES,
  GAME_CONFIG
};

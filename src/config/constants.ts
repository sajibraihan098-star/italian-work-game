export const APP_NAME = 'Italian Work Game';
export const APP_TAGLINE = 'Impara italiano lavorando — Restaurant, Magazzino, Fabbrica';

export const XP_PER_SCENARIO = 50;
export const XP_PER_QUIZ = 20;
export const XP_PER_CORRECT_CHOICE = 5;

export const LEVELS = [
  { level: 1, xpRequired: 0, title: 'Principiante' },
  { level: 2, xpRequired: 100, title: 'Aiuto Cucina' },
  { level: 3, xpRequired: 250, title: 'Cameriere' },
  { level: 4, xpRequired: 500, title: 'Operatore Magazzino' },
  { level: 5, xpRequired: 900, title: 'Pronto al Lavoro' },
];

export const STORAGE_KEY = 'italian-work-game-progress';
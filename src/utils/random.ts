import { crystalColors } from '../config';

export function getRandomColor() {
  return crystalColors[Math.floor(Math.random() * crystalColors.length)];
}

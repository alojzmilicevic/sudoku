// Transform a point to a one dimensional value
import { GRID_SIZE, BoardSizes } from '../constants/constants';
import strings from '../strings/main';

export const toOneDimension = (point, width = GRID_SIZE) => point[0] * width + point[1];

// Transform a 2d point to one dimension
export const toPoint = value => ({
  x: value % GRID_SIZE,
  y: Math.floor(value / GRID_SIZE),
});

export function getGridSize(width, height) {
  const cur = Math.min(width, height);

  for (let i = 0; i < BoardSizes.length; i++) {
    const val = BoardSizes[i];

    if (cur < val) {
      return BoardSizes[i - 1];
    }
  }

  return BoardSizes[BoardSizes.length - 1];
}

export function isNotZero(value) {
  return value !== '0' && value !== 0;
}

export function getDateInfo() {
  const today = new Date();

  return { day: today.getDate(), month: strings.months[today.getMonth() + 1] };
}

export function formatTime(duration) {
  const totalSeconds = Math.floor(duration);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds / 60) % 60);
  let seconds = Math.floor(totalSeconds % 60);

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return `${hours}:${minutes}:${seconds}`;
}

export function randInt(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

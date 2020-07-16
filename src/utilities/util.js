// Transform a point to a one dimensional value
import { GRID_SIZE, BoardSizes } from '../constants/constants';

export const toOneDimension = point => point[0] * GRID_SIZE + point[1];

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

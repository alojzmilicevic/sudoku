import { Levels } from '../constants/levels';

const en = {
  congrats: 'Congrats',
  puzzleFinished: 'You finished an {0} puzzle in {1}',
  playAnother: 'Play another puzzle',
  quit: 'Quit',

  settings: {
    header: 'Settings',
    showClock: 'Show Clock',
  },

  optionsBar: {
    [Levels.EASY]: 'Easy',
    [Levels.MEDIUM]: 'Medium',
    [Levels.HARD]: 'Hard',
    help: 'Help',
    settings: 'Settings',
    reset: 'Reset Board',
    solvePuzzle: 'Solve Puzzle',
    solveCell: 'Solve Cell',
    howToPlay: 'How To Play?',
  },

  modals: {
    howToPlayHeader: 'How To Play',
    howToPlayText: 'Fill the grid with your keyboard so that every row, '
      + 'column and 3×3 box contains the digits 1 to 9, without repeating.\n\n'
      + 'Use Normal Mode to enter numbers you are confident about. '
      + 'Use Note Mode to add or remove multiple possibilities for a square. '
      + 'Use Color mode to add or remove colors to squares\n\n'
      + '- Click and drag to mark cells, hold down the Ctrl key to add more marked cells.\n'
      + '- Use arrows or W/A/S/D to navigate the board.\n'
      + '- Press Tab to change your primary tool.\n'
      + '- Hold down Shift to go into Note mode.\n'
      + '- Hold down Alt to go into normal mode.\n'
      + '3 Sudokus (Easy, Medium, and Hard) are released daily at 10:00 p.m. ET.',
  },

  keyboard: {
    normal: 'Normal',
    note: 'Note',
    color: 'Color',
  },

  months: {
    1: 'January',
    2: 'February',
    3: 'Mars',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  },
};

export default en;

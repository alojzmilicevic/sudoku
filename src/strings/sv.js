import { Levels } from '../constants/levels';

const sv = {
  congrats: 'Grattis',
  puzzleFinished: 'Du klarade ett {0} pussel på {1}',
  playAnother: 'Spela ett till sudoku',
  quit: 'Avsluta',

  settings: {
    header: 'Inställningar',
    showClock: 'Visa Tidtagarur',
  },

  optionsBar: {
    [Levels.EASY]: 'Lätt',
    [Levels.MEDIUM]: 'Medel',
    [Levels.HARD]: 'Svår',
    help: 'Hjälp',
    settings: 'Inställningar',
    reset: 'Återställ Bräde',
    solvePuzzle: 'Lös Pussel',
    solveCell: 'Lös Cell',
    howToPlay: 'Hur funkar det?',
  },

  modals: {
    howToPlayHeader: 'Hur funkar det',
    howToPlayText: 'Fill the grid with your keyboard so that every row, '
      + 'column and 3×3 box contains the digits 1 to 9, without repeating.\n\n'
      + 'Use Normal Mode to enter numbers you are confident about. '
      + 'Use Note Mode to add or remove multiple possibilities for a square. '
      + 'Use Color mode to add or remove colors to squares\n\n'
      + '3 Sudokus (Easy, Medium, and Hard) are released daily at 10:00 p.m. ET.',
  },

  months: {
    1: 'Januari',
    2: 'Februari',
    3: 'Mars',
    4: 'April',
    5: 'Maj',
    6: 'Juni',
    7: 'Juli',
    8: 'Augusti',
    9: 'September',
    10: 'Oktober',
    11: 'November',
    12: 'December',
  },
};

export default sv;

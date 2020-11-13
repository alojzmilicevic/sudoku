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
    howToPlayText: 'Fyll brädet med hjälp av tangentbordet så att varje rad, '
      + 'kolumn och 3×3 box innehåller alla siffror mellan 1 och 9, utan upprepning.\n\n'
      + 'Använd Normal-Mode för att skriva in siffror du känner dig säker på. '
      + 'Använd Kandidat-Mode för att lägga till eller ta bort möjliga siffror som kan vara i en box. '
      + 'Använd Färg-Mode för lägga till eller ta bort en färg i en ruta\n\n'
      + '- Dra med musen för att markera celler, håll i Ctrl för att lägga till markerkade rutor.\n'
      + '- Använd Piltangenterna eller W/A/S/D för att ändra markerad ruta.\n'
      + '- Tryck Tab för att byta Primärt verktyg.\n'
      + '- Håll i Shift för att gå in i Kandidat-mode.\n'
      + '- Håll i Alt för att gå in i Normal-mode.\n'
      + '3 Sudokus (Lätt, Medel och Svår) släpps varje dag klockan 10.00 svensk tid.',
  },

  keyboard: {
    normal: 'Normal',
    note: 'Kandidat',
    color: 'Färg',
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

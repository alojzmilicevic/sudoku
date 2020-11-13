import { createMuiTheme } from '@material-ui/core/styles';

export const lightMode = {
  frontColor: '#fff',
  main: '#272d36',
  secondary: '#1f242b',
  offsetColor: '#95c0de',
  darkColor: '#333',
  fadeColor: '#5f5f5f',
  lightFadeColor: 'rgba(0,0,0,0.2)',
  textColor: '#121212',

  cellColors: {
    selected: 'rgb(205,230,252)',
    thinBorder: '#11101063',
    preFilledTextColor: '#616060',
    textColor: '#508be3',
    background: '#fff',
    preFilledBackground: '#efefef',
  },

  keyboardColors: {
    borderColor: '#959595',
    textColor: '#121212',
    notSelectableColor: 'rgb(208,208,208)',
    background: '#e6e6e6',
  },
};

export const darkMode = {
  frontColor: '#fff',
  main: '#272d36',
  secondary: '#1f242b',
  offsetColor: '#95c0de',
  darkColor: '#333',
  fadeColor: '#5f5f5f',
  lightFadeColor: 'rgba(0,0,0,0.2)',

  cellColors: {
    selected: 'rgb(205,230,252)',
    thinBorder: '#11101063',
    preFilledTextColor: '#616060',
    textColor: '#508be3',
    background: '#fff',
    preFilledBackground: '#efefef',
  },

  keyboardColors: {
    borderColor: '#959595',
    textColor: 'black',
    notSelectableColor: 'rgb(208,208,208)',
    background: '#e6e6e6',
  },
};

let curMode = lightMode;

export const createTheme = (mode) => {
  curMode = mode === 'light' ? lightMode : darkMode;

  return createMuiTheme({
    palette: {
      primary: {
        ...curMode,
      },
    },
    cellColors: {
      ...curMode.cellColors,
    },
    keyboardColors: {
      ...curMode.keyboardColors,
    },
    typography: {
      fontFamily: 'Calibri, sans-serif',
      fontSize: 18,
      button: {
        padding: '6px 14px',
      },
    },
  });
};

export function getCurMode() {
  return curMode;
}

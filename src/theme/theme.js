import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const defaultBranding = {
  frontColor: '#fff',
  primaryColor: '#272d36',
  secondaryColor: '#1f242b',
  offsetColor: '#95c0de',
  darkColor: '#333',
  fadeColor: '#5f5f5f',
  lightFadeColor: 'rgba(0,0,0,0.2)',
};

const secondaryBranding = {
  main: '#fff',
  secondary: '#505050',
};

export const cellColors = {
  selected: 'rgb(205,230,252)',
  thinBorder: '#11101063',
  preFilledTextColor: '#616060',
  textColor: '#508be3',
  background: '#fff',
  preFilledBackground: '#efefef',
};

const keyboardColors = {
  borderColor: '#959595',
  textColor: 'black',
  notSelectableColor: 'rgb(208,208,208)',
  background: '#e6e6e6',
};

export const createTheme = () => createMuiTheme({
  palette: {
    primary: {
      frontColor: defaultBranding.frontColor,
      main: defaultBranding.primaryColor,
      secondary: defaultBranding.secondaryColor,
      darkColor: defaultBranding.darkColor,
      offsetColor: defaultBranding.offsetColor,
      fadeColor: defaultBranding.fadeColor,
      lightFadeColor: defaultBranding.lightFadeColor,
    },
    secondary: {
      main: secondaryBranding.main,
      dark: secondaryBranding.secondary,
    },
  },
  additionalPalette: {
    passiveButton: {
      primary: {
        main: grey[100],
        dark: grey[300],
        contrastText: defaultBranding.primaryColor,
      },
    },
    textButton: {
      lightMode: {
        main: secondaryBranding.secondary,
        hover: 'black',
        selected: 'black',
      },
    },
  },
  cellColors: {
    ...cellColors,
  },
  keyboardColors: {
    ...keyboardColors,
  },
  typography: {
    fontFamily: 'Calibri, sans-serif',
    fontSize: 18,
    button: {
      padding: '6px 14px',
    },
  },
});

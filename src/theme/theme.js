import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const defaultBranding = {
  primaryColor: '#272d36',
  secondaryColor: '#1f242b',
  thirdColor: '#95c0de',
  darkColor: '#333',
};
const secondaryBranding = {
  main: '#fff',
  secondary: '#505050',
};

export const createTheme = () => createMuiTheme({
  palette: {
    primary: {
      main: defaultBranding.primaryColor,
      secondary: defaultBranding.secondaryColor,
      darkColor: defaultBranding.darkColor,
      thirdColor: defaultBranding.thirdColor,
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
  },
  typography: {
    fontFamily: 'Calibri, sans-serif',
    fontSize: 18,
    button: {
      padding: '6px 14px',
    },
  },
});

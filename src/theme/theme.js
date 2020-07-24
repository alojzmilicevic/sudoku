import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const defaultBranding = {
  primaryColor: '#95c0de',
  secondaryColor: '#deae95',
  darkColor: '#333',
};

export const createTheme = () => createMuiTheme({
  palette: {
    primary: {
      main: defaultBranding.primaryColor,
      secondary: defaultBranding.secondaryColor,
      darkColor: defaultBranding.darkColor,
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
  },
});

import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const defaultBranding = {
  primaryColor: '#95c0de',
};

export const createTheme = () => createMuiTheme({
  palette: {
    primary: {
      main: defaultBranding.primaryColor,
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

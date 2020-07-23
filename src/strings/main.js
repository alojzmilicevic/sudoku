import LocalizedStrings from 'react-localization';
import sv from './sv';
import en from './en';

/**
 * This object maps localized strings to a key, it is used by UI components to display messages to the user.
 */
const strings = new LocalizedStrings({
  en,
  sv,
});

export default strings;

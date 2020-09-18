import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJson from './locales/en/label.json';
import koJson from './locales/ko/label.json';

// the translations
// (tip move them in a JSON file and import them)
const resource = {
  en: {
    translation: {
      hello: 'Welcome to React and react-i18next',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resource,
    lng: 'en',
    fallbackLng: 'ko',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJson from './locales/en/label.json';
import koJson from './locales/ko/label.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: enJson,
  },
  ko: {
    translation: koJson,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'en',
    fallbackLng: 'ko',

    keySeparator: false, // we do not use keys in form messages.welcome
    react: {
      wait: true,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    resources,
  });

export default i18n;

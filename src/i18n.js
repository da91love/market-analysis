import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LANG } from './consts/common';
import { KO_JSON } from './locales/ko/label';
import { EN_JSON } from './locales/en/label';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  [LANG.EN]: {
    translation: EN_JSON,
  },
  [LANG.KO]: {
    translation: KO_JSON,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: LANG.KO,
    fallbackLng: LANG.EN,

    // keySeparator: false, // we do not use keys in form messages.welcome
    react: {
      wait: true,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    resources,
  });

export default i18n;

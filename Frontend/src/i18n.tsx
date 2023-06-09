import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import TranslationEN from './locals/en.json';
import TranslationAR from './locals/ar.json';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: TranslationEN,
  },
  ar: {
    translation: TranslationAR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

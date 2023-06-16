import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import TranslationEN from './locals/en/translation.json';
import TranslationAR from './locals/ar/translation.json';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

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
    .use(HttpApi)
    .init({
        // supportedLanguage:['en','ar'],
        resources,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['cookie', 'path', 'htmlTag'],
            caches: ['cookie'],
        },
        backend: {
            loadPath: 'src/locals/{{lng}}/translation.json',
        },
        react:
            {useSuspense: false},
    });

export default i18n;
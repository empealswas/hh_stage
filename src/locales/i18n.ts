import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
//
import enLocales from './en.json';
import deLocales from './de.json';
import frLocales from './fr.json';
import gaLocales from './ga.json';
import ukLocales from './uk.json';

// ----------------------------------------------------------------------

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      de: { translations: deLocales },
      fr: { translations: frLocales },
        ga: {translations: gaLocales},
        uk: {translations: ukLocales},
    },
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

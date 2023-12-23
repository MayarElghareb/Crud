import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // English translations
        MemberList: 'Member List', // Updated translation for "Member List"
        // Add other translations as needed
      },
    },
    ar: {
      translation: {
        // Arabic translations
        MemberList: 'قائمة الأعضاء', // Updated translation for "Member List"
        // Add other translations as needed
      },
    },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

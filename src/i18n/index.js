import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { STORAGE_KEYS } from "../constants";
import enTranslation from "./locales/en.json";
import zhTranslation from "./locales/zh.json";

// Use the language storage key from constants

// Initialize i18next
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
    },
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    // Detection options
    detection: {
      // Order and from where user language should be detected
      order: ["localStorage", "navigator"],

      // Keys or params to lookup language from
      lookupLocalStorage: STORAGE_KEYS.LANGUAGE,

      // Cache user language on
      caches: ["localStorage"],

      // Only detect languages that are in the whitelist
      checkWhitelist: true,
    },

    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;

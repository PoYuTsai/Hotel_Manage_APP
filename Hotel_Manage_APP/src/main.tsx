import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n/config';
import './index.css';

// Initialize i18n before rendering
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en, zhTW, zhCN, th } from './i18n/locales';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en,
      'zh-TW': zhTW,
      'zh-CN': zhCN,
      th,
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
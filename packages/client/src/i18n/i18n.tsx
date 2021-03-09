import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import de from './locales/de.json';
import en from './locales/en.json';

// init i18n
i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: { en, de },
		lng: 'en',
		keySeparator: '.',
		interpolation: { escapeValue: false }
	})
	.then();

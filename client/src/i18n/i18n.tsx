// app
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import de from './locales/de.json';
import en from './locales/en.json';

// init i18n
i18n.use(LanguageDetector)
	// pass the i18n instance to react-i18next
	// which will make it available for all the components via the context api.
	.use(initReactI18next)
	.init({
		resources: { en, de },
		lng: 'en',
		keySeparator: '.',
		interpolation: { escapeValue: false } // react already safes from xss
	})
	.then();

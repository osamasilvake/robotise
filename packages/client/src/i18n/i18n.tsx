import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment';
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

// change language
i18n.on('languageChanged', (lng) => {
	// locale: de
	if (lng === 'de') {
		import(`moment/locale/${lng}`);
	}

	// switch
	moment.locale(lng);
});

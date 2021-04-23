import 'moment/locale/de';

import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';

import de from './locales/de.json';
import en from './locales/en.json';

// init i18n
i18n.use(initReactI18next)
	.init({
		resources: { en, de },
		lng: 'en',
		keySeparator: '.',
		interpolation: { escapeValue: false }
	})
	.then();

// change language-specific features on language change
i18n.on('languageChanged', (language: string) => moment.locale(language));

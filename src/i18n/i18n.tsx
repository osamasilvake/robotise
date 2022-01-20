import 'dayjs/locale/de';

import dayjs from 'dayjs';
import i18n from 'i18next';
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

// change daysJs locale on language change
i18n.on('languageChanged', (language: string) => dayjs.locale(language));

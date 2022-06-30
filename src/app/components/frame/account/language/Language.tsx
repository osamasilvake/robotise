import { List, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../../slices';
import { AppChangeLanguage } from '../../../../slices/app/App.slice';
import { AppLanguageTypeEnum } from '../../../../slices/app/App.slice.enum';
import { LanguageStyle } from './Language.style';

const Language: FC = () => {
	const { t } = useTranslation('FRAME');
	const classes = LanguageStyle();

	const dispatch = useDispatch<AppDispatch>();

	const languages = Object.keys(AppLanguageTypeEnum);

	/**
	 * dispatch: change language
	 * @param language
	 * @returns
	 */
	const handleLanguage = (language: string) => () => dispatch(AppChangeLanguage(language));

	return (
		<List
			disablePadding
			dense
			subheader={
				<ListSubheader className={classes.sSubHeader}>
					{t('ACCOUNT.LANGUAGES.LABEL')}
				</ListSubheader>
			}>
			{languages.map((language, index, { length }) => (
				<ListItemButton
					key={language}
					divider={index + 1 !== length}
					onClick={handleLanguage(language.toLowerCase())}
					disabled>
					<ListItemText primary={t(`ACCOUNT.LANGUAGES.${language}`)} />
				</ListItemButton>
			))}
		</List>
	);
};
export default Language;

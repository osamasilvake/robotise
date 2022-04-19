import { Translate } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppChangeLanguage, appSelector } from '../../../../slices/app/App.slice';
import { AppLanguageTypeEnum } from '../../../../slices/app/App.slice.enum';

const Language: FC = () => {
	const { t } = useTranslation('FRAME');

	const dispatch = useDispatch();
	const app = useSelector(appSelector);

	/**
	 * dispatch: change language
	 * @param language
	 * @returns
	 */
	const handleLanguage = (language: AppLanguageTypeEnum) => () =>
		dispatch(AppChangeLanguage(language));

	return (
		<ListItemButton
			disabled
			divider
			onClick={handleLanguage(
				app.currentLanguage === AppLanguageTypeEnum.EN
					? AppLanguageTypeEnum.DE
					: AppLanguageTypeEnum.EN
			)}>
			<ListItemIcon>
				<Translate />
			</ListItemIcon>
			<ListItemText
				primary={t('ACCOUNT.LANGUAGE.LABEL')}
				secondary={
					app.currentLanguage === AppLanguageTypeEnum.EN
						? t('ACCOUNT.LANGUAGE.EN')
						: t('ACCOUNT.LANGUAGE.DE')
				}
			/>
		</ListItemButton>
	);
};
export default Language;

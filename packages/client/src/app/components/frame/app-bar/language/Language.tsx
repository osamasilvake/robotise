import { ListItem, ListItemText } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { GeneralChangeLanguage, generalSelector } from '../../../../slices/general/General.slice';
import { GeneralLanguageTypeEnum } from '../../../../slices/general/General.slice.enum';
import { LanguageStyles } from './Language.style';

const Language: FC = () => {
	const { t } = useTranslation('APPBAR');
	const languageClasses = LanguageStyles();

	const dispatch = useDispatch();
	const general = useSelector(generalSelector);

	/**
	 * dispatch: change language
	 * @param language
	 * @returns
	 */
	const handleLanguage = (language: GeneralLanguageTypeEnum) => () =>
		dispatch(GeneralChangeLanguage(language));

	return (
		<ListItem
			button
			divider
			onClick={handleLanguage(
				general.currentLanguage === GeneralLanguageTypeEnum.EN
					? GeneralLanguageTypeEnum.DE
					: GeneralLanguageTypeEnum.EN
			)}>
			<ListItemText className={languageClasses.sLanguageText}>
				{(general.currentLanguage === GeneralLanguageTypeEnum.EN
					? GeneralLanguageTypeEnum.EN
					: GeneralLanguageTypeEnum.DE
				).toUpperCase()}
			</ListItemText>
			<ListItemText
				primary={t('LANGUAGE.TITLE')}
				secondary={
					general.currentLanguage === GeneralLanguageTypeEnum.EN
						? t('LANGUAGE.EN')
						: t('LANGUAGE.DE')
				}
			/>
		</ListItem>
	);
};
export default Language;

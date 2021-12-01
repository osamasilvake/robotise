import { Translate } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { GeneralChangeLanguage, generalSelector } from '../../../../slices/general/General.slice';
import { GeneralLanguageTypeEnum } from '../../../../slices/general/General.slice.enum';

const Language: FC = () => {
	const { t } = useTranslation('ACCOUNT');

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
		<ListItemButton
			disabled
			divider
			onClick={handleLanguage(
				general.currentLanguage === GeneralLanguageTypeEnum.EN
					? GeneralLanguageTypeEnum.DE
					: GeneralLanguageTypeEnum.EN
			)}>
			<ListItemIcon>
				<Translate />
			</ListItemIcon>
			<ListItemText
				primary={t('LANGUAGE.LABEL')}
				secondary={
					general.currentLanguage === GeneralLanguageTypeEnum.EN
						? t('LANGUAGE.EN')
						: t('LANGUAGE.DE')
				}
			/>
		</ListItemButton>
	);
};
export default Language;

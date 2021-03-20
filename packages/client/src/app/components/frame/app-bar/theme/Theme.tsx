import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	GeneralApplyThemePalette,
	generalSelector
} from '../../../../slices/general/General.slice';
import { GeneralThemePaletteTypeEnum } from '../../../../slices/general/General.slice.enum';
import { themePaletteStyles } from './Theme.style';

const ThemePalette: FC = () => {
	const { t } = useTranslation('APPBAR');
	const themePaletteClasses = themePaletteStyles();

	const dispatch = useDispatch();
	const general = useSelector(generalSelector);

	/**
	 * dispatch: apply theme palette
	 * @param theme
	 * @returns
	 */
	const handleThemePalette = (theme: GeneralThemePaletteTypeEnum) => () =>
		dispatch(GeneralApplyThemePalette(theme));

	return (
		<ListItem
			button
			onClick={handleThemePalette(
				general.themePalette === GeneralThemePaletteTypeEnum.LIGHT
					? GeneralThemePaletteTypeEnum.DARK
					: GeneralThemePaletteTypeEnum.LIGHT
			)}>
			<ListItemIcon>
				{general.themePalette === GeneralThemePaletteTypeEnum.LIGHT ? (
					<WbSunnyIcon className={themePaletteClasses.sColorThemeLight} />
				) : (
					<Brightness3Icon />
				)}
			</ListItemIcon>
			<ListItemText
				primary={t('THEME.TITLE')}
				secondary={
					general.themePalette === GeneralThemePaletteTypeEnum.LIGHT
						? t('THEME.LIGHT')
						: t('THEME.DARK')
				}
			/>
		</ListItem>
	);
};
export default ThemePalette;

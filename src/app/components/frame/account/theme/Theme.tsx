import { Brightness3, WbSunny } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	GeneralApplyThemePalette,
	generalSelector
} from '../../../../slices/general/General.slice';
import { GeneralThemePaletteTypeEnum } from '../../../../slices/general/General.slice.enum';
import { ThemePaletteStyle } from './Theme.style';

const ThemePalette: FC = () => {
	const { t } = useTranslation('ACCOUNT');
	const classes = ThemePaletteStyle();

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
		<ListItemButton
			onClick={handleThemePalette(
				general.themePalette === GeneralThemePaletteTypeEnum.LIGHT
					? GeneralThemePaletteTypeEnum.DARK
					: GeneralThemePaletteTypeEnum.LIGHT
			)}>
			<ListItemIcon>
				{general.themePalette === GeneralThemePaletteTypeEnum.LIGHT ? (
					<WbSunny className={classes.sColorThemeLight} />
				) : (
					<Brightness3 />
				)}
			</ListItemIcon>
			<ListItemText
				primary={t('THEME.LABEL')}
				secondary={
					general.themePalette === GeneralThemePaletteTypeEnum.LIGHT
						? t('THEME.LIGHT')
						: t('THEME.DARK')
				}
			/>
		</ListItemButton>
	);
};
export default ThemePalette;

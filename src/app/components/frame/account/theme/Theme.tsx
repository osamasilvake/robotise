import { Brightness3, WbSunny } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppApplyThemePalette, appSelector } from '../../../../slices/app/App.slice';
import { AppThemePaletteTypeEnum } from '../../../../slices/app/App.slice.enum';
import { ThemePaletteStyle } from './Theme.style';

const ThemePalette: FC = () => {
	const { t } = useTranslation('FRAME');
	const classes = ThemePaletteStyle();

	const dispatch = useDispatch();
	const app = useSelector(appSelector);

	/**
	 * dispatch: apply theme palette
	 * @param theme
	 * @returns
	 */
	const handleThemePalette = (theme: AppThemePaletteTypeEnum) => () =>
		dispatch(AppApplyThemePalette(theme));

	return (
		<ListItemButton
			onClick={handleThemePalette(
				app.themePalette === AppThemePaletteTypeEnum.LIGHT
					? AppThemePaletteTypeEnum.DARK
					: AppThemePaletteTypeEnum.LIGHT
			)}>
			<ListItemIcon>
				{app.themePalette === AppThemePaletteTypeEnum.LIGHT ? (
					<WbSunny className={classes.sColorThemeLight} />
				) : (
					<Brightness3 />
				)}
			</ListItemIcon>
			<ListItemText
				primary={t('ACCOUNT.THEME.LABEL')}
				secondary={
					app.themePalette === AppThemePaletteTypeEnum.LIGHT
						? t('ACCOUNT.THEME.LIGHT')
						: t('ACCOUNT.THEME.DARK')
				}
			/>
		</ListItemButton>
	);
};
export default ThemePalette;

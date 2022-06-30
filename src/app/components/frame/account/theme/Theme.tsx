import { Button, ButtonGroup, List, ListItem, ListSubheader } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../slices';
import { AppApplyThemePalette, appSelector } from '../../../../slices/app/App.slice';
import { AppThemePaletteTypeEnum } from '../../../../slices/app/App.slice.enum';
import { ThemeStyle } from './Theme.style';

const ThemePalette: FC = () => {
	const { t } = useTranslation('FRAME');
	const classes = ThemeStyle();

	const dispatch = useDispatch<AppDispatch>();
	const app = useSelector(appSelector);

	const light = app.themePalette === AppThemePaletteTypeEnum.LIGHT;

	/**
	 * dispatch: apply theme palette
	 * @param theme
	 * @returns
	 */
	const handleThemePalette = (theme: AppThemePaletteTypeEnum) => () =>
		dispatch(AppApplyThemePalette(theme));

	return (
		<List
			disablePadding
			dense
			subheader={
				<ListSubheader className={classes.sSubHeader}>
					{t('ACCOUNT.THEME.LABEL')}
				</ListSubheader>
			}>
			<ListItem>
				<ButtonGroup disableElevation size="small" fullWidth variant="outlined">
					<Button
						onClick={handleThemePalette(AppThemePaletteTypeEnum.LIGHT)}
						variant={light ? 'contained' : 'outlined'}>
						{t('ACCOUNT.THEME.LIGHT')}
					</Button>
					<Button
						onClick={handleThemePalette(AppThemePaletteTypeEnum.DARK)}
						variant={!light ? 'contained' : 'outlined'}>
						{t('ACCOUNT.THEME.DARK')}
					</Button>
				</ButtonGroup>
			</ListItem>
		</List>
	);
};
export default ThemePalette;

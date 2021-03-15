import {
	AppBar,
	Avatar,
	Box,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Popover,
	Toolbar,
	Tooltip,
	Typography
} from '@material-ui/core';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import clsx from 'clsx';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../services';
import { AuthLogout, authSelector } from '../../../slices/auth/Auth.slice';
import {
	GeneralApplyThemePalette,
	generalSelector,
	GeneralSetDrawerState
} from '../../../slices/general/General.slice';
import { ThemePaletteTypeEnum } from '../../../slices/general/General.slice.enum';
import Badge from '../../common/badge/Badge';
import { appBarStyles } from './AppBar.styles';

const AppBarCustom: FC = () => {
	const { t } = useTranslation('TOOLTIPS');
	const appBarClasses = appBarStyles();

	const dispatch = useDispatch();
	const { user } = useSelector(authSelector);
	const { openDrawer, themePalette } = useSelector(generalSelector);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	/**
	 * handle menu open
	 * @param $event
	 */
	const handleMenuOpen = ($event: MouseEvent<HTMLButtonElement>) =>
		setAnchorEl($event.currentTarget);

	/**
	 * handle menu close
	 */
	const handleMenuClose = () => setAnchorEl(null);

	/**
	 * dispatch: set drawer state
	 */
	const handleDrawerOpen = () => dispatch(GeneralSetDrawerState(true));

	/**
	 * dispatch: apply theme palette
	 * @param themePalette
	 */
	const handleThemePalette = (themePalette: ThemePaletteTypeEnum) =>
		dispatch(GeneralApplyThemePalette(themePalette));

	/**
	 * dispatch: logout
	 */
	const handleLogout = () => dispatch(AuthLogout());

	return (
		<AppBar
			position="fixed"
			elevation={0}
			color="inherit"
			className={clsx(appBarClasses.sAppBar, {
				[appBarClasses.sOpen]: openDrawer
			})}>
			<Toolbar className={appBarClasses.sToolbar} disableGutters>
				{!openDrawer && (
					<Tooltip title={String(t('DRAWER.OPEN'))}>
						<IconButton hidden edge="start" onClick={handleDrawerOpen}>
							<MenuIcon />
						</IconButton>
					</Tooltip>
				)}

				<Box className={appBarClasses.sOptions}>
					<IconButton edge="end" onClick={handleMenuOpen}>
						<Box className={appBarClasses.sAccountDetail}>
							<Typography variant="subtitle2">{user?.data.display_name}</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								className={appBarClasses.sAccountDetailSubtitle}>
								{user?.data.role}
							</Typography>
						</Box>
						<Badge>
							<Avatar
								src={AppConfigService.AppImageURLs.avatar.path}
								alt={AppConfigService.AppImageURLs.avatar.name}
							/>
						</Badge>
					</IconButton>
					<Popover
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
						getContentAnchorEl={null}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
						<List disablePadding>
							<ListItem divider>
								<ListItemText
									primary={user?.data.display_name}
									secondary={user?.data.email}
								/>
							</ListItem>

							{/* Light / Dark Mode */}
							<ListItem
								button
								onClick={() =>
									handleThemePalette(
										themePalette === ThemePaletteTypeEnum.LIGHT
											? ThemePaletteTypeEnum.DARK
											: ThemePaletteTypeEnum.LIGHT
									)
								}>
								<ListItemIcon>
									{themePalette === ThemePaletteTypeEnum.LIGHT ? (
										<WbSunnyIcon className={appBarClasses.sColorThemeLight} />
									) : (
										<Brightness3Icon />
									)}
								</ListItemIcon>
								<ListItemText
									primary={t('THEME.TITLE')}
									secondary={
										themePalette === ThemePaletteTypeEnum.LIGHT
											? t('THEME.LIGHT')
											: t('THEME.DARK')
									}
								/>
							</ListItem>

							{/* Logout */}
							<ListItem button onClick={handleLogout}>
								<ListItemIcon>
									<PowerSettingsNewIcon />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItem>
						</List>
					</Popover>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
export default AppBarCustom;

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
import React, { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Badge from '../../components/badge/Badge';
import { AppConfigService } from '../../services';
import { AuthLogout, authSelector } from '../../slices/auth/Auth.slice';
import { ThemePaletteTypeEnum } from '../../slices/general/General.enum';
import {
	GeneralApplyThemePalette,
	generalSelector,
	GeneralSetDrawerState
} from '../../slices/general/General.slice';
import { appBarStyles } from './AppBar.styles';

const AppBarCustom: FC = () => {
	const { t } = useTranslation('PRIVATE');
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
	 * dispatch: set open drawer
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
			className={clsx(appBarClasses.appBar, {
				[appBarClasses.appBarOpen]: openDrawer
			})}>
			<Toolbar className={appBarClasses.appBarToolbar} disableGutters>
				{!openDrawer && (
					<Tooltip title={String(t('TOOLTIP.DRAWER.OPEN'))}>
						<IconButton hidden edge="start" onClick={handleDrawerOpen}>
							<MenuIcon />
						</IconButton>
					</Tooltip>
				)}

				<Box className={appBarClasses.appBarOptions}>
					<IconButton edge="end" onClick={handleMenuOpen}>
						<Box className={appBarClasses.appBarAccountDetail}>
							<Typography variant="subtitle2">{user?.data.display_name}</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								className={appBarClasses.appBarAccountDetailSubtitle}>
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
										<Brightness3Icon />
									) : (
										<WbSunnyIcon
											className={appBarClasses.appBarColorThemeLight}
										/>
									)}
								</ListItemIcon>
								<ListItemText primary={t('TOOLTIP.THEME')} />
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

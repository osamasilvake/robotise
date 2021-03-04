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
	Typography
} from '@material-ui/core';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import clsx from 'clsx';
import React, { FC, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Badge from '../../components/badge/Badge';
import { ConfigService } from '../../services';
import { AuthLogout, authSelector } from '../../slices/auth/Auth.slice';
import { ThemeColorsEnum } from '../../slices/general/General.enum';
import {
	generalSelector,
	GenernalApplyTheme,
	GenernalSetDrawerState
} from '../../slices/general/General.slice';
import { appBarStyles } from './AppBar.styles';

const AppBarCustom: FC = () => {
	const appBarClasses = appBarStyles();

	const dispatch = useDispatch();
	const { user } = useSelector(authSelector);
	const { openDrawer, themeColor } = useSelector(generalSelector);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	/**
	 * handle menu open
	 */
	const handleMenuOpen = ($event: MouseEvent<HTMLButtonElement>) =>
		setAnchorEl($event.currentTarget);

	/**
	 * dispatch: set open drawer
	 */
	const handleDrawerOpen = () => dispatch(GenernalSetDrawerState(true));

	/**
	 * handle theme color toggle
	 */
	const handleThemeColorToggle = (themeColor: ThemeColorsEnum) =>
		dispatch(GenernalApplyTheme(themeColor));

	/**
	 * handle menu close
	 */
	const handleMenuClose = () => setAnchorEl(null);

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
					<IconButton hidden edge="start" onClick={handleDrawerOpen}>
						<MenuIcon />
					</IconButton>
				)}

				<Box className={appBarClasses.appBarOptions}>
					{/* Light / Dark Mode */}
					<Box>
						<IconButton
							hidden
							edge="start"
							onClick={() =>
								handleThemeColorToggle(
									themeColor === ThemeColorsEnum.LIGHT
										? ThemeColorsEnum.DARK
										: ThemeColorsEnum.LIGHT
								)
							}>
							{themeColor === ThemeColorsEnum.LIGHT ? (
								<Brightness3Icon />
							) : (
								<WbSunnyIcon className={appBarClasses.appBarColorThemeLight} />
							)}
						</IconButton>
					</Box>

					{/* Menu */}
					<Box>
						<IconButton edge="end" onClick={handleMenuOpen}>
							<Box className={appBarClasses.appBarAccountButtonBox}>
								<Typography variant="subtitle2">
									{user?.data.displayName}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									className={appBarClasses.appBarAccountButtonBoxSubtitle}>
									{user?.role}
								</Typography>
							</Box>
							<Badge>
								<Avatar
									src={ConfigService.AppImageURLs.avatar.path}
									alt={ConfigService.AppImageURLs.avatar.name}
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
										primary={user?.data.displayName}
										secondary={user?.data.email}
										title="dd"
									/>
								</ListItem>
								<ListItem button onClick={handleLogout}>
									<ListItemIcon>
										<PowerSettingsNewIcon />
									</ListItemIcon>
									<ListItemText primary="Logout" />
								</ListItem>
							</List>
						</Popover>
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
export default AppBarCustom;

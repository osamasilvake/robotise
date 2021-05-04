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
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import clsx from 'clsx';
import i18next from 'i18next';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppConfigService } from '../../../services';
import { AuthLogout, authSelector } from '../../../slices/auth/Auth.slice';
import { generalSelector, GeneralSetDrawerState } from '../../../slices/general/General.slice';
import Badge from '../../common/badge/Badge';
import { BadgeTypeEnum } from '../../common/badge/Badge.enum';
import { AppBarStyles } from './AppBar.style';
import Language from './language/Language';
import ThemePalette from './theme/Theme';

const AppBarCustom: FC = () => {
	const { t } = useTranslation(['APPBAR', 'TOOLTIPS']);
	const classes = AppBarStyles();

	const dispatch = useDispatch();
	const auth = useSelector(authSelector);
	const general = useSelector(generalSelector);

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	useEffect(() => {
		// change language
		i18next.changeLanguage(general.currentLanguage);
	}, [general.currentLanguage]);

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
	 * dispatch: logout
	 */
	const handleLogout = () => dispatch(AuthLogout());

	return (
		<AppBar
			position="fixed"
			elevation={0}
			color="inherit"
			className={clsx(classes.sAppBar, {
				[classes.sOpen]: general.openDrawer
			})}>
			<Toolbar className={classes.sToolbar} disableGutters>
				{/* Logo & Open Drawer */}
				{!general.openDrawer && (
					<Box>
						<Link
							to={AppConfigService.AppRoutes.SCREENS.BUSINESS.DASHBOARD}
							className={classes.sLogo}>
							<Avatar
								src={AppConfigService.AppImageURLs.logo.icon}
								alt={AppConfigService.AppImageURLs.logo.name}
							/>
						</Link>

						<Tooltip
							className={classes.sOpenIcon}
							title={String(t('TOOLTIPS:DRAWER.OPEN'))}>
							<IconButton hidden edge="start" onClick={handleDrawerOpen}>
								<MenuIcon />
							</IconButton>
						</Tooltip>
					</Box>
				)}

				<Box className={classes.sOptions}>
					{/* Account */}
					<IconButton edge="end" onClick={handleMenuOpen}>
						<Box className={classes.sAccountDetail}>
							<Typography variant="subtitle2">
								{auth.user?.data.display_name}
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								className={classes.sAccountDetailSubtitle}>
								{auth.user?.data.role}
							</Typography>
						</Box>
						<Badge type={BadgeTypeEnum.DOT}>
							<Avatar
								src={AppConfigService.AppImageURLs.avatar.path}
								alt={AppConfigService.AppImageURLs.avatar.name}
							/>
						</Badge>
					</IconButton>
					<Popover
						elevation={2}
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
						<List disablePadding>
							{/* User Info */}
							<ListItem divider>
								<ListItemText
									primary={auth.user?.data.display_name}
									secondary={auth.user?.data.email}
								/>
							</ListItem>

							{/* Light / Dark Mode */}
							<ThemePalette />

							{/* Language */}
							<Language />

							{/* Logout */}
							<ListItem button onClick={handleLogout}>
								<ListItemIcon>
									<PowerSettingsNewIcon />
								</ListItemIcon>
								<ListItemText primary={t('LOGOUT')} />
							</ListItem>
						</List>
					</Popover>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
export default AppBarCustom;

import {
	Avatar,
	Box,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Popover,
	Tooltip,
	Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
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
import { AppBarStyle } from './AppBar.style';
import Language from './language/Language';
import ThemePalette from './theme/Theme';

const AppBarCustom: FC = () => {
	const { t } = useTranslation(['APPBAR', 'TOOLTIPS']);
	const classes = AppBarStyle();

	const dispatch = useDispatch();
	const auth = useSelector(authSelector);
	const general = useSelector(generalSelector);

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const mobileScreen = AppConfigService.AppOptions.styles.responsive.mobile;

	useEffect(() => {
		// change language
		i18next.changeLanguage(general.currentLanguage);
	}, [general.currentLanguage]);

	useEffect(() => {
		const handleSmallDevices = () => {
			if (window && window.innerWidth <= mobileScreen && general.openDrawer) {
				// dispatch: set drawer state
				dispatch(GeneralSetDrawerState(!general.openDrawer));
			}
		};
		window.addEventListener('load', handleSmallDevices, { once: true });
	}, [dispatch, general.openDrawer, mobileScreen]);

	/**
	 * dispatch: set drawer state
	 * @param status
	 * @returns
	 */
	const handleDrawer = (status: boolean) => () => dispatch(GeneralSetDrawerState(status));

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
	 * dispatch: logout
	 */
	const handleLogout = () => dispatch(AuthLogout());

	return (
		<Box className={classes.sLogoAndCloseIcon}>
			{/* Opened Drawer */}
			{general.openDrawer && (
				<>
					<Box>
						{/* Account */}
						<IconButton onClick={handleMenuOpen}>
							<Badge type={BadgeTypeEnum.DOT}>
								<Avatar
									src={AppConfigService.AppImageURLs.avatar.path}
									alt={AppConfigService.AppImageURLs.avatar.name}
								/>
							</Badge>
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
						</IconButton>
						<Popover
							elevation={2}
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center'
							}}>
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
					<Tooltip title={String(t('TOOLTIPS:DRAWER.CLOSE'))}>
						<IconButton onClick={handleDrawer(false)}>
							<CloseIcon />
						</IconButton>
					</Tooltip>
				</>
			)}

			{/* Closed Drawer */}
			{!general.openDrawer && (
				<>
					{window && window.innerWidth <= mobileScreen && (
						<Link to={AppConfigService.AppRoutes.HOME}>
							<Avatar
								className={classes.sLogoIcon}
								src={AppConfigService.AppImageURLs.logo.icon}
								alt={AppConfigService.envCompanyName}
							/>
						</Link>
					)}
					{window && window.innerWidth > mobileScreen && (
						<Tooltip title={String(t('TOOLTIPS:DRAWER.OPEN'))}>
							<IconButton onClick={handleDrawer(true)}>
								<MenuIcon />
							</IconButton>
						</Tooltip>
					)}
				</>
			)}
		</Box>
	);
};
export default AppBarCustom;

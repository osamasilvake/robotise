import { KeyboardArrowDown, Menu, MenuOpen, PowerSettingsNew } from '@mui/icons-material';
import {
	Avatar,
	Box,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Popover,
	Stack,
	Tooltip,
	Typography
} from '@mui/material';
import i18next from 'i18next';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppConfigService } from '../../../services';
import { appSelector, AppSetDrawerState } from '../../../slices/app/App.slice';
import { AuthLogout, authSelector } from '../../../slices/authentication/Auth.slice';
import { StyledBadge } from '../../../utilities/styles/Badge.style';
import { AccountStyle } from './Account.style';
import Language from './language/Language';
import ThemePalette from './theme/Theme';

const Account: FC = () => {
	const { t } = useTranslation(['FRAME', 'TOOLTIP']);
	const classes = AccountStyle();

	const dispatch = useDispatch();
	const app = useSelector(appSelector);
	const auth = useSelector(authSelector);

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const mobileScreen = AppConfigService.AppOptions.styles.responsive.mobile;

	useEffect(() => {
		// change language
		i18next.changeLanguage(app.currentLanguage);
	}, [app.currentLanguage]);

	useEffect(() => {
		const handleSmallDevices = () => {
			if (window && window.innerWidth <= mobileScreen && app.openDrawer) {
				// dispatch: set drawer state
				dispatch(AppSetDrawerState(!app.openDrawer));
			}
		};
		window.addEventListener('load', handleSmallDevices, { once: true });
	}, [dispatch, app.openDrawer, mobileScreen]);

	/**
	 * dispatch: set drawer state
	 * @param status
	 * @returns
	 */
	const handleDrawer = (status: boolean) => () => dispatch(AppSetDrawerState(status));

	/**
	 * handle menu open
	 * @param event
	 */
	const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) =>
		setAnchorEl(event.currentTarget);

	/**
	 * handle menu close
	 */
	const handleMenuClose = () => setAnchorEl(null);

	/**
	 * dispatch: logout
	 */
	const handleLogout = () => dispatch(AuthLogout());

	return (
		<Stack
			spacing={0.5}
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			className={classes.sAccount}>
			{/* Opened Drawer */}
			{app.openDrawer && (
				<>
					<Box>
						{/* Account */}
						<IconButton onClick={handleMenuOpen} className={classes.sButton}>
							<StyledBadge
								variant="dot"
								overlap="circular"
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right'
								}}>
								<Avatar
									src={AppConfigService.AppImageURLs.avatar.path}
									alt={AppConfigService.AppImageURLs.avatar.name}
								/>
							</StyledBadge>
							<Box className={classes.sDetail}>
								<Stack spacing={0.25} direction="row" alignItems="center">
									<Typography variant="subtitle2" color="textPrimary" noWrap>
										{auth.user?.data.display_name}
									</Typography>
									<KeyboardArrowDown fontSize="small" />
								</Stack>
								<Typography
									variant="body2"
									color="textSecondary"
									className={classes.sDetailSubtitle}>
									Robotise
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
							<List disablePadding className={classes.sList}>
								{/* User Info */}
								<ListItem divider>
									<ListItemText
										primary={auth.user?.data.display_name}
										secondary={
											<Typography
												color="textSecondary"
												variant="body2"
												noWrap>
												{auth.user?.data.email}
											</Typography>
										}
									/>
								</ListItem>

								{/* Light / Dark Mode */}
								<ThemePalette />

								{/* Language */}
								<Language />

								{/* Logout */}
								<ListItemButton onClick={handleLogout}>
									<ListItemIcon>
										<PowerSettingsNew />
									</ListItemIcon>
									<ListItemText primary={t('ACCOUNT.LOGOUT')} />
								</ListItemButton>
							</List>
						</Popover>
					</Box>
					<Tooltip title={t<string>('TOOLTIP:DRAWER.CLOSE')}>
						<IconButton onClick={handleDrawer(false)}>
							<MenuOpen />
						</IconButton>
					</Tooltip>
				</>
			)}

			{/* Closed Drawer */}
			{!app.openDrawer && (
				<>
					{window && window.innerWidth <= mobileScreen && (
						<Link to={AppConfigService.AppRoutes.HOME}>
							<Avatar
								className={classes.sAvatar}
								src={AppConfigService.AppImageURLs.logo.icon}
								alt={AppConfigService.envCompanyName}
							/>
						</Link>
					)}
					{window && window.innerWidth > mobileScreen && (
						<Tooltip title={t<string>('TOOLTIP:DRAWER.OPEN')}>
							<IconButton onClick={handleDrawer(true)}>
								<Menu />
							</IconButton>
						</Tooltip>
					)}
				</>
			)}
		</Stack>
	);
};
export default Account;

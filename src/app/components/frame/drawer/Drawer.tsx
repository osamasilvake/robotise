import {
	Avatar,
	Box,
	Divider,
	Drawer,
	Icon,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Tooltip
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { AppConfigService } from '../../../services';
import { generalSelector, GeneralSetDrawerState } from '../../../slices/general/General.slice';
import { robotTwinsSummarySelector } from '../../../slices/robot-twins/RobotTwinsSummary.slice';
import Badge from '../../common/badge/Badge';
import { BadgeTypeEnum } from '../../common/badge/Badge.enum';
import Copyrights from '../copyrights/Copyrights';
import { DrawerListBadgeTypeEnum } from './Drawer.enum';
import { drawerBusinessList, drawerInformationList } from './Drawer.list';
import { DrawerStyles } from './Drawer.style';

const DrawerCustom: FC = () => {
	const { t } = useTranslation(['SIDEBAR', 'TOOLTIPS']);
	const classes = DrawerStyles();

	const dispatch = useDispatch();
	const general = useSelector(generalSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	useEffect(() => {
		const mobileScreen = AppConfigService.AppOptions.styles.responsive.mobile;
		const handleSmallDevices = () => {
			if (window && window.innerWidth <= mobileScreen && general.openDrawer) {
				// dispatch: set drawer state
				dispatch(GeneralSetDrawerState(!general.openDrawer));
			}
		};
		window.addEventListener('load', handleSmallDevices, { once: true });
	}, [dispatch, general.openDrawer]);

	/**
	 * dispatch: set drawer state
	 */
	const handleDrawerClose = () => dispatch(GeneralSetDrawerState(false));

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.sDrawer, {
				[classes.sOpen]: general.openDrawer,
				[classes.sClose]: !general.openDrawer
			})}
			classes={{
				paper: clsx({
					[classes.sOpen]: general.openDrawer,
					[classes.sClose]: !general.openDrawer
				})
			}}>
			{/* Logo & Close Drawer */}
			<Box className={classes.sLogoAndCloseIcon}>
				<Link to={AppConfigService.AppRoutes.SCREENS.BUSINESS.DASHBOARD}>
					<Avatar
						variant="square"
						className={classes.sLogo}
						src={AppConfigService.AppImageURLs.logo.name}
						alt={AppConfigService.envCompanyName}
					/>
				</Link>
				<Tooltip title={String(t('TOOLTIPS:DRAWER.CLOSE'))}>
					<IconButton onClick={handleDrawerClose}>
						<CloseIcon />
					</IconButton>
				</Tooltip>
			</Box>

			{/* List */}
			<Box className={classes.sListRoot}>
				<List
					disablePadding
					subheader={
						<ListSubheader>
							{(general.openDrawer && t('BUSINESS.TITLE.MAIN')) ||
								t('BUSINESS.TITLE.SHORT')}
						</ListSubheader>
					}>
					{drawerBusinessList.map((item) => (
						<ListItem
							key={item.id}
							button
							component={NavLink}
							to={item.path}
							exact
							className={classes.sListItemWithSubtitle}>
							<ListItemIcon>
								{item.badge === DrawerListBadgeTypeEnum.ROBOT &&
								robotTwinsSummary.content &&
								robotTwinsSummary.content.alerts?.count ? (
									<Badge
										type={BadgeTypeEnum.NUMBER}
										count={robotTwinsSummary.content.alerts?.count}
										color="error">
										<Icon>{item.icon}</Icon>
									</Badge>
								) : (
									<Icon>{item.icon}</Icon>
								)}
							</ListItemIcon>
							<ListItemText primary={t(item.label)} secondary={item.hint} />
						</ListItem>
					))}
				</List>
				<List
					disablePadding
					subheader={
						<ListSubheader>
							{(general.openDrawer && t('INFORMATION.TITLE.MAIN')) ||
								t('INFORMATION.TITLE.SHORT')}
						</ListSubheader>
					}>
					{drawerInformationList.map((item) => (
						<ListItem
							key={item.id}
							button
							exact
							component={NavLink}
							to={item.path}
							className={classes.sListItem}>
							<ListItemIcon>
								<Icon>{item.icon}</Icon>
							</ListItemIcon>
							<ListItemText primary={t(item.label)} />
						</ListItem>
					))}
				</List>
			</Box>

			<Divider light />

			{/* Copyrights */}
			<Box className={classes.sBottomArea}>
				{general.openDrawer ? <Copyrights /> : <Copyrights short />}
			</Box>
		</Drawer>
	);
};
export default DrawerCustom;

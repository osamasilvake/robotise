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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
import { drawerStyles } from './Drawer.styles';

const DrawerCustom: FC = () => {
	const { t } = useTranslation(['SIDEBAR', 'TOOLTIPS']);
	const drawerClasses = drawerStyles();

	const dispatch = useDispatch();
	const { openDrawer } = useSelector(generalSelector);
	const { content } = useSelector(robotTwinsSummarySelector);

	useEffect(() => {
		const handleSmallDevices = () => {
			// sm: 960
			if (window.innerWidth < 960 && openDrawer) {
				// dispatch: set drawer state
				dispatch(GeneralSetDrawerState(!openDrawer));
			}
		};
		window.addEventListener('load', handleSmallDevices, { once: true });
	}, [dispatch, openDrawer]);

	/**
	 * dispatch: set drawer state
	 */
	const handleDrawerClose = () => dispatch(GeneralSetDrawerState(false));

	return (
		<Box component="section">
			<Drawer
				variant="permanent"
				className={clsx(drawerClasses.sDrawer, {
					[drawerClasses.sOpen]: openDrawer,
					[drawerClasses.sClose]: !openDrawer
				})}
				classes={{
					paper: clsx({
						[drawerClasses.sOpen]: openDrawer,
						[drawerClasses.sClose]: !openDrawer
					})
				}}>
				{/* Avatar & Icon */}
				<Box className={drawerClasses.sLogoAndCloseIcon}>
					<Link to={AppConfigService.AppRoutes.SCREENS.BUSINESS.DASHBOARD}>
						<Avatar
							variant="square"
							className={drawerClasses.sLogo}
							src={AppConfigService.AppImageURLs.logo.name}
							alt={AppConfigService.envAuthor}
						/>
					</Link>
					<Tooltip title={String(t('TOOLTIPS:DRAWER.CLOSE'))}>
						<IconButton onClick={handleDrawerClose}>
							<ArrowBackIcon />
						</IconButton>
					</Tooltip>
				</Box>

				{/* List */}
				<Box className={drawerClasses.sListRoot}>
					<List
						disablePadding
						subheader={
							<ListSubheader>
								{(openDrawer && t('BUSINESS.TITLE.MAIN')) ||
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
								className={drawerClasses.sListItemWithSubtitle}>
								<ListItemIcon>
									{item.badge === DrawerListBadgeTypeEnum.ROBOT &&
									content &&
									content.alerts?.danger ? (
										<Badge
											options={{
												type: BadgeTypeEnum.NUMBER,
												count: content.alerts?.danger,
												color: 'error'
											}}>
											<Icon>{item.icon}</Icon>
										</Badge>
									) : (
										<Icon>{item.icon}</Icon>
									)}
								</ListItemIcon>
								<ListItemText
									primary={t(item.label)}
									secondary={item.hint && t(item.hint)}
								/>
							</ListItem>
						))}
					</List>
					<List
						disablePadding
						subheader={
							<ListSubheader>
								{(openDrawer && t('INFORMATION.TITLE.MAIN')) ||
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
								className={drawerClasses.sListItem}>
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
				<Box className={drawerClasses.sBottomArea}>
					{openDrawer ? <Copyrights /> : <Copyrights short />}
				</Box>
			</Drawer>
		</Box>
	);
};
export default DrawerCustom;

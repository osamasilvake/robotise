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
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import ENV from '../../../../environment';
import { AppConfigService } from '../../../services';
import { generalSelector, GeneralSetDrawerState } from '../../../slices/general/General.slice';
import Copyrights from '../copyrights/Copyrights';
import { drawerBusinessList, drawerInformationList } from './Drawer.list';
import { drawerStyles } from './Drawer.styles';

const DrawerCustom: FC = () => {
	const { t } = useTranslation('PRIVATE');
	const drawerClasses = drawerStyles();

	const dispatch = useDispatch();
	const { openDrawer } = useSelector(generalSelector);

	/**
	 * dispatch: set open drawer
	 */
	const handleDrawerClose = () => dispatch(GeneralSetDrawerState(false));

	return (
		<Drawer
			variant="permanent"
			className={clsx(drawerClasses.drawer, {
				[drawerClasses.drawerOpen]: openDrawer,
				[drawerClasses.drawerClose]: !openDrawer
			})}
			classes={{
				paper: clsx({
					[drawerClasses.drawerOpen]: openDrawer,
					[drawerClasses.drawerClose]: !openDrawer
				})
			}}>
			{/* Avatar & Icon */}
			<Box className={drawerClasses.drawerToolbar}>
				<Link to={ENV().ROUTING.SCREENS.BUSINESS.DASHBOARD}>
					<Avatar
						variant="square"
						className={drawerClasses.drawerAvatar}
						src={AppConfigService.AppImageURLs.logo.name}
						alt={AppConfigService.envAuthor}
					/>
				</Link>
				<Tooltip title={String(t('TOOLTIP.DRAWER.CLOSE'))}>
					<IconButton onClick={handleDrawerClose}>
						<ArrowBackIcon />
					</IconButton>
				</Tooltip>
			</Box>

			{/* List */}
			<Box className={drawerClasses.drawerListRoot}>
				<List
					disablePadding
					subheader={
						<ListSubheader>
							{(openDrawer && t('SIDEBAR.BUSINESS.TITLE.MAIN')) ||
								t('SIDEBAR.BUSINESS.TITLE.SHORT')}
						</ListSubheader>
					}>
					{drawerBusinessList.map((item) => (
						<ListItem
							key={item.id}
							button
							component={NavLink}
							to={item.path}
							exact
							className={drawerClasses.drawerListItemWithSubtitle}>
							<ListItemIcon>
								<Icon>{item.icon}</Icon>
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
							{(openDrawer && t('SIDEBAR.INFORMATION.TITLE.MAIN')) ||
								t('SIDEBAR.INFORMATION.TITLE.SHORT')}
						</ListSubheader>
					}>
					{drawerInformationList.map((item) => (
						<ListItem
							key={item.id}
							button
							exact
							component={NavLink}
							to={item.path}
							className={drawerClasses.drawerListItem}>
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
			<Box className={drawerClasses.drawerBottom}>
				{openDrawer ? <Copyrights /> : <Copyrights short />}
			</Box>
		</Drawer>
	);
};
export default DrawerCustom;

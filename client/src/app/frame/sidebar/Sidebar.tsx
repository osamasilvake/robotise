import {
	Avatar,
	Box,
	Drawer,
	Icon,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import clsx from 'clsx';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

import ENV from '../../../environment';
import { ConfigService } from '../../services';
import { SidebarInterface } from './Sidebar.interface';
import { sidebarPrimaryList, sidebarSecondaryList } from './Sidebar.list';
import { sidebarStyles } from './Sidebar.styles';

const Sidebar: FC<SidebarInterface> = (props) => {
	const { t } = useTranslation('PRIVATE');

	const { open, setOpen } = props;
	const sidebarClasses = sidebarStyles();

	return (
		<Drawer
			variant="permanent"
			className={clsx(sidebarClasses.drawer, {
				[sidebarClasses.drawerOpen]: open,
				[sidebarClasses.drawerClose]: !open
			})}
			classes={{
				paper: clsx({
					[sidebarClasses.drawerOpen]: open,
					[sidebarClasses.drawerClose]: !open
				})
			}}>
			<Box className={sidebarClasses.drawerToolbar}>
				<Link to={ENV().ROUTING.PACKAGES.DASHBOARD}>
					<Avatar
						variant="square"
						className={sidebarClasses.drawerAvatar}
						src={ConfigService.AppImageURLs.logo.name}
						alt={ConfigService.envAuthor}
					/>
				</Link>
				<IconButton onClick={() => setOpen(false)}>
					<ArrowBackIcon />
				</IconButton>
			</Box>

			<List
				disablePadding
				subheader={
					<ListSubheader component="div">{(open && 'Pages') || 'List'}</ListSubheader>
				}>
				{sidebarPrimaryList.map((item) => (
					<ListItem
						key={item.id}
						button
						component={NavLink}
						to={item.path}
						exact
						className={sidebarClasses.ListItem}>
						{/* Icon */}
						<ListItemIcon>
							<Icon>{item.icon}</Icon>
						</ListItemIcon>

						{/* Text */}
						<ListItemText primary={t(item.label)} />
					</ListItem>
				))}
			</List>

			<List
				disablePadding
				subheader={
					<ListSubheader component="div">
						{(open && 'Information') || 'Info'}
					</ListSubheader>
				}>
				{sidebarSecondaryList.map((item) => (
					<ListItem
						key={item.id}
						button
						exact
						component={NavLink}
						to={item.path}
						className={sidebarClasses.ListItem}>
						{/* Icon */}
						<ListItemIcon>
							<Icon>{item.icon}</Icon>
						</ListItemIcon>

						{/* Text */}
						<ListItemText primary={t(item.label)} />
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};
export default Sidebar;

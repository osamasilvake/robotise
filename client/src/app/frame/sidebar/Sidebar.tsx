import {
	Avatar,
	Box,
	Divider,
	Drawer,
	Icon,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@material-ui/core';
import clsx from 'clsx';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import ENV from '../../../environment';
import { ConfigService } from '../../services';
import { SidebarInterface } from './Sidebar.interface';
import { sidebarList } from './Sidebar.list';
import { sidebarStyles } from './Sidebar.styles';

const Sidebar: FC<SidebarInterface> = (props) => {
	const { t } = useTranslation('PRIVATE');

	const { open } = props;
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
			{/* Logo */}
			<Link className={sidebarClasses.drawerToolbar} to={ENV().ROUTING.PACKAGES.DASHBOARD}>
				<Avatar
					className={sidebarClasses.drawerAvatar}
					alt={ConfigService.envAuthor}
					src={ConfigService.AppImageURLs.logo.name}
				/>
			</Link>

			<Divider />

			{/* List */}
			<List>
				{sidebarList.map((item) => (
					<Box key={item.id}>
						<ListItem button component={Link} to={item.path}>
							<ListItemIcon>
								<Icon>{item.icon}</Icon>
							</ListItemIcon>
							<ListItemText primary={t(item.label)} />
						</ListItem>
						{!!item.newLine && <Divider />}
					</Box>
				))}
			</List>
		</Drawer>
	);
};
export default Sidebar;

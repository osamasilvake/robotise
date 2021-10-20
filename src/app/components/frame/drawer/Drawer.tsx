import {
	Badge,
	Box,
	Divider,
	Drawer,
	Icon,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader
} from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { robotTwinsSummarySelector } from '../../../slices/business/robots/RobotTwinsSummary.slice';
import { generalSelector } from '../../../slices/general/General.slice';
import Account from '../account/Account';
import Copyrights from '../copyrights/Copyrights';
import { DrawerListBadgeTypeEnum } from './Drawer.enum';
import { drawerBusinessList, drawerInformationList } from './Drawer.list';
import { DrawerStyle } from './Drawer.style';

const DrawerCustom: FC = () => {
	const { t } = useTranslation(['SIDEBAR', 'TOOLTIPS']);
	const classes = DrawerStyle();

	const general = useSelector(generalSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	return (
		<Drawer
			variant="permanent"
			className={classes.sDrawer}
			classes={{
				paper: clsx({
					[classes.sOpen]: general.openDrawer,
					[classes.sClose]: !general.openDrawer
				})
			}}>
			{/* Account */}
			<Account />

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
										badgeContent={robotTwinsSummary.content.alerts.count}
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

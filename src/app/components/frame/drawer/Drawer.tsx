import {
	Badge,
	Box,
	Divider,
	Drawer,
	Icon,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Stack
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
import { DrawersList } from './Drawer.list';
import { DrawerStyle } from './Drawer.style';

const DrawerCustom: FC = () => {
	const { t } = useTranslation(['SIDEBAR', 'TOOLTIP']);
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
				{DrawersList.map((item, index) => (
					<List
						key={index}
						subheader={
							<ListSubheader>
								{(general.openDrawer && t(item.primary)) || t(item.secondary)}
							</ListSubheader>
						}>
						{item.list.map((listItem) => (
							<ListItemButton
								disableRipple
								key={listItem.id}
								component={NavLink}
								to={listItem.path}
								className={
									listItem.hint
										? classes.sListItemWithSubtitle
										: classes.sListItem
								}>
								<ListItemIcon>
									{listItem.badge === DrawerListBadgeTypeEnum.ROBOT &&
									robotTwinsSummary.content &&
									robotTwinsSummary.content.alerts?.count ? (
										<Badge
											badgeContent={robotTwinsSummary.content.alerts.count}
											color="error">
											<Icon>{listItem.icon}</Icon>
										</Badge>
									) : (
										<Icon>{listItem.icon}</Icon>
									)}
								</ListItemIcon>
								<ListItemText
									primary={t(listItem.label)}
									secondary={listItem.hint}
								/>
							</ListItemButton>
						))}
					</List>
				))}
			</Box>

			<Divider light />

			{/* Copyrights */}
			<Stack
				spacing={0.5}
				direction="row"
				alignItems="center"
				justifyContent="center"
				className={classes.sBottomArea}>
				{general.openDrawer ? <Copyrights /> : <Copyrights short />}
			</Stack>
		</Drawer>
	);
};
export default DrawerCustom;

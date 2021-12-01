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
	ListSubheader
} from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AuthScopeTypeEnum } from '../../../screens/authentication/Auth.enum';
import { validateScope } from '../../../screens/authentication/Auth.scope';
import { authSelector } from '../../../slices/authentication/Auth.slice';
import { robotTwinsSummarySelector } from '../../../slices/business/robots/RobotTwinsSummary.slice';
import { generalSelector } from '../../../slices/general/General.slice';
import Account from '../account/Account';
import Copyrights from '../copyrights/Copyrights';
import { DrawerListBadgeTypeEnum } from './Drawer.enum';
import { DrawersList } from './Drawer.list';
import { DrawerStyle } from './Drawer.style';

const DrawerCustom: FC = () => {
	const { t } = useTranslation('SIDEBAR');
	const classes = DrawerStyle();

	const auth = useSelector(authSelector);
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
				{DrawersList.map((root, index) => (
					<List
						key={index}
						subheader={
							<ListSubheader>
								{(general.openDrawer && t(root.primary)) || t(root.secondary)}
							</ListSubheader>
						}>
						{root.list.map((item, pIdx) => (
							<ListItemButton
								disableRipple
								key={pIdx}
								component={NavLink}
								to={item.path}
								disabled={
									!validateScope(
										auth.user?.scope,
										AuthScopeTypeEnum.READ,
										item.path,
										item.scope
									)
								}
								className={clsx({ [classes.sListItemHint]: item.hint })}>
								<ListItemIcon className={classes.sListItemIcon}>
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
							</ListItemButton>
						))}
					</List>
				))}
			</Box>

			<Divider light />

			{/* Copyrights */}
			{general.openDrawer ? <Copyrights /> : <Copyrights short />}
		</Drawer>
	);
};
export default DrawerCustom;

import {
	Box,
	Card,
	CardContent,
	Divider,
	FormControlLabel,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
	Typography
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { SiteUpdateNotificationUsers } from '../../../../../../slices/sites/Site.slice';
import { SSContentNotificationPayloadInterface } from '../../../../../../slices/sites/Site.slice.interface';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { SiteNotificationsInterface } from './SiteNotifications.interface';
import { SiteNotificationsStyle } from './SiteNotifications.style';

const SiteNotifications: FC<SiteNotificationsInterface> = (props) => {
	const { site } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteNotificationsStyle();
	const cardClasses = CardStyle();

	const dispatch = useDispatch();

	/**
	 * handle notification type
	 * @param payload
	 * @returns
	 */
	const handleNotificationType = (payload: SSContentNotificationPayloadInterface) => () => {
		// dispatch: update notification users
		dispatch(SiteUpdateNotificationUsers(payload));
	};

	return site.notifications?.content ? (
		<Box className={classes.sBox}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sNotificationTitle}>
				{t('CONTENT.CONFIGURATION.NOTIFICATIONS.TITLE')}
			</Typography>

			{/* Grid */}
			<Grid container>
				<Grid item xs={12}>
					<Card square elevation={1}>
						<CardContent className={cardClasses.sCardContent4}>
							<List disablePadding>
								<ListItem className={classes.sListItemHead}>
									<ListItemSecondaryAction>
										<IconButton edge="end">
											<AddCircleIcon color="primary" />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>

								{site.notifications.content.data.length && (
									<>
										<Divider />

										{site.notifications.content.data.map((item) => (
											<ListItem key={item.id}>
												<FormControlLabel
													disabled={
														!item.userId || site.notifications.loading
													}
													control={
														<Switch
															name={`notification-type-${item.id}`}
															checked={item.isActive}
															onChange={handleNotificationType(item)}
														/>
													}
													label={null}
												/>

												<ListItemText
													primary={item.name}
													secondary={
														item.users.length > 0 &&
														item.users.join(', ')
													}
												/>

												<ListItemSecondaryAction>
													<IconButton edge="end">
														<EditIcon color="primary" />
													</IconButton>
												</ListItemSecondaryAction>
											</ListItem>
										))}
									</>
								)}
							</List>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	) : null;
};
export default SiteNotifications;

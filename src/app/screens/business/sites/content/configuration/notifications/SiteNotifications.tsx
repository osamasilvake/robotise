import {
	Box,
	Card,
	CardContent,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	Typography
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import SiteNotification from './SiteNotification';
import { SiteNotificationsInterface } from './SiteNotifications.interface';
import { SiteNotificationsStyle } from './SiteNotifications.style';

const SiteNotifications: FC<SiteNotificationsInterface> = (props) => {
	const { site } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteNotificationsStyle();
	const cardClasses = CardStyle();

	return site.notifications?.content ? (
		<Box className={classes.sBox}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sNotificationTitle}>
				{t('CONTENT.CONFIGURATION.NOTIFICATIONS.TITLE')}
			</Typography>

			{/* List */}
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

								{site.notifications.content.data.map((notification) => (
									<SiteNotification
										key={notification.id}
										site={site}
										notification={notification}
									/>
								))}
							</>
						)}
					</List>
				</CardContent>
			</Card>
		</Box>
	) : null;
};
export default SiteNotifications;

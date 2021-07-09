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
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import DialogCreateEditNotification from './DialogCreateEditNotification';
import SiteNotification from './SiteNotification';
import { SiteNotificationsCreateEditTypeEnum } from './SiteNotifications.enum';
import { SiteNotificationsInterface } from './SiteNotifications.interface';
import { SiteNotificationsStyle } from './SiteNotifications.style';

const SiteNotifications: FC<SiteNotificationsInterface> = (props) => {
	const { site } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteNotificationsStyle();
	const cardClasses = CardStyle();

	const [open, setOpen] = useState(false);

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
								<IconButton edge="end" onClick={() => setOpen(true)}>
									<AddCircleIcon color="primary" />
								</IconButton>
								<DialogCreateEditNotification
									notification={site.notifications.content.data[0]}
									type={SiteNotificationsCreateEditTypeEnum.CREATE}
									open={open}
									setOpen={setOpen}
								/>
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

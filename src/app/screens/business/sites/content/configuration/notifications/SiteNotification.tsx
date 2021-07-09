import {
	FormControlLabel,
	IconButton,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { SiteUpdateNotification } from '../../../../../../slices/sites/Site.slice';
import DialogCreateEditNotification from './DialogCreateEditNotification';
import { SiteNotificationsCreateEditTypeEnum } from './SiteNotifications.enum';
import {
	DialogCreateEditNotificationPayloadInterface,
	SiteNotificationInterface
} from './SiteNotifications.interface';

const SiteNotification: FC<SiteNotificationInterface> = (props) => {
	const { site, notification } = props;

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	/**
	 * handle notification
	 * @param payload
	 * @returns
	 */
	const handleNotification = (payload: DialogCreateEditNotificationPayloadInterface) => () => {
		// dispatch: update notification
		dispatch(
			SiteUpdateNotification({
				...payload,
				isActive: !payload.isActive
			})
		);
	};

	return notification ? (
		<ListItem key={notification.id}>
			<FormControlLabel
				disabled={!notification.userId || site.notifications.loading}
				control={
					<Switch
						name={`notification-${notification.id}`}
						checked={notification.isActive}
						onChange={handleNotification(notification)}
					/>
				}
				label={false}
			/>

			<ListItemText
				primary={notification.name}
				secondary={notification.users.length > 0 && notification.users.join(', ')}
			/>

			<ListItemSecondaryAction>
				<IconButton
					edge="end"
					disabled={!notification.userId}
					onClick={() => setOpen(true)}>
					<EditIcon color={notification.userId ? 'primary' : 'disabled'} />
				</IconButton>
				{open && (
					<DialogCreateEditNotification
						notification={notification}
						type={SiteNotificationsCreateEditTypeEnum.EDIT}
						open={open}
						setOpen={setOpen}
					/>
				)}
			</ListItemSecondaryAction>
		</ListItem>
	) : null;
};
export default SiteNotification;

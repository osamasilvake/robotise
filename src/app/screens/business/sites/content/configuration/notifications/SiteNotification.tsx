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
	const { site, index } = props;

	const dispatch = useDispatch();
	const notification = index !== undefined ? site.notifications.content?.data[index] : null;

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
				disabled={site.notifications.loading}
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
				primary={notification.typeName}
				secondary={notification.users.length > 0 && notification.users.join(', ')}
			/>

			<ListItemSecondaryAction>
				<IconButton edge="end" onClick={() => setOpen(true)}>
					<EditIcon color="primary" />
				</IconButton>
				{open && (
					<DialogCreateEditNotification
						index={index}
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

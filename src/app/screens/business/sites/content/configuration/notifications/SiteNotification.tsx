import { Edit } from '@mui/icons-material';
import {
	FormControlLabel,
	IconButton,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
	Tooltip
} from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	NotificationTypesAndUsersFetchList,
	NotificationUpdate
} from '../../../../../../slices/business/sites/configuration/Notifications.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import DialogCreateEditNotification from './DialogCreateEditNotification';
import { SiteNotificationsCreateEditTypeEnum } from './SiteNotifications.enum';
import {
	DialogCreateEditNotificationFormInterface,
	SiteNotificationInterface
} from './SiteNotifications.interface';

const SiteNotification: FC<SiteNotificationInterface> = (props) => {
	const { notifications, notification, index } = props;
	const { t } = useTranslation('TOOLTIPS');

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const params = useParams() as SiteParamsInterface;
	const cSiteId = params.siteId;

	/**
	 * handle notification
	 * @param payload
	 * @returns
	 */
	const handleNotification = (payload: DialogCreateEditNotificationFormInterface) => () => {
		// dispatch: update notification
		dispatch(
			NotificationUpdate(
				{
					...payload,
					isActive: !payload.isActive
				},
				() => {
					// dispatch: fetch site notification types and users
					dispatch(NotificationTypesAndUsersFetchList(cSiteId, true));
				}
			)
		);
	};

	return notification ? (
		<ListItem key={notification.id}>
			<FormControlLabel
				disabled={notifications.updating}
				control={
					<Switch
						name={`notification-${notification.id}`}
						checked={notification.isActive}
						onChange={handleNotification(notification)}
					/>
				}
				label={''}
			/>

			<ListItemText
				primary={notification.typeName}
				secondary={notification.users.length > 0 && notification.users.join(', ')}
			/>

			<ListItemSecondaryAction>
				<Tooltip
					placement="left"
					title={t<string>('NOTIFICATION.EDIT')}
					onClick={() => setOpen(true)}>
					<IconButton edge="end">
						<Edit color="primary" />
					</IconButton>
				</Tooltip>

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

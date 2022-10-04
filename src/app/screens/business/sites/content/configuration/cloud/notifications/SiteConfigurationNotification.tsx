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

import { AppDispatch } from '../../../../../../../slices';
import {
	NotificationTypesAndUsersFetchList,
	NotificationUpdate
} from '../../../../../../../slices/business/sites/configuration/Notifications.slice';
import { SiteParamsInterface } from '../../../../Site.interface';
import DialogCreateEditNotification from './DialogCreateEditNotification';
import { SiteConfigurationNotificationsCreateEditTypeEnum } from './SiteConfigurationNotifications.enum';
import {
	DialogCreateEditNotificationFormInterface,
	SiteConfigurationNotificationInterface
} from './SiteConfigurationNotifications.interface';

const SiteConfigurationNotification: FC<SiteConfigurationNotificationInterface> = (props) => {
	const { notifications, notification, index } = props;
	const { t } = useTranslation('TOOLTIP');

	const dispatch = useDispatch<AppDispatch>();

	const [open, setOpen] = useState(false);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
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
				secondary={notification.users.join(', ')}
			/>

			<ListItemSecondaryAction>
				<Tooltip
					placement="left"
					title={t<string>('NOTIFICATION.EDIT')}
					onClick={() => setOpen(true)}>
					<IconButton edge="end">
						<Edit color="primary" fontSize="small" />
					</IconButton>
				</Tooltip>

				{open && (
					<DialogCreateEditNotification
						index={index}
						type={SiteConfigurationNotificationsCreateEditTypeEnum.EDIT}
						open={open}
						setOpen={setOpen}
					/>
				)}
			</ListItemSecondaryAction>
		</ListItem>
	) : null;
};
export default SiteConfigurationNotification;

import {
	FormControlLabel,
	IconButton,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
	Tooltip
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	SiteNotificationTypesAndUsersFetch,
	SiteNotificationUpdate
} from '../../../../../../slices/business/sites/Site.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import DialogCreateEditNotification from './DialogCreateEditNotification';
import { SiteNotificationsCreateEditTypeEnum } from './SiteNotifications.enum';
import {
	DialogCreateEditNotificationFormInterface,
	SiteNotificationInterface
} from './SiteNotifications.interface';

const SiteNotification: FC<SiteNotificationInterface> = (props) => {
	const { site, index } = props;
	const { t } = useTranslation('TOOLTIPS');

	const dispatch = useDispatch();
	const notification = index !== undefined ? site.notifications.content?.data[index] : null;

	const [open, setOpen] = useState(false);

	const params: SiteParamsInterface = useParams();
	const cSiteId = params.siteId;

	/**
	 * handle notification
	 * @param payload
	 * @returns
	 */
	const handleNotification = (payload: DialogCreateEditNotificationFormInterface) => () => {
		// dispatch: update notification
		dispatch(
			SiteNotificationUpdate(
				{
					...payload,
					isActive: !payload.isActive
				},
				() => {
					// dispatch: fetch notification types and users
					dispatch(SiteNotificationTypesAndUsersFetch(cSiteId, true));
				}
			)
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
				<Tooltip
					placement="left"
					title={String(t('NOTIFICATION.EDIT'))}
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

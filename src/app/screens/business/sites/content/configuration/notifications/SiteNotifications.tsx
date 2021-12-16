import { AddCircle } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, List, Tooltip, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import { NotificationTypesAndUsersFetchList } from '../../../../../../slices/business/sites/configuration/Notifications.slice';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { SiteParamsInterface } from '../../../Site.interface';
import DialogCreateEditNotification from './DialogCreateEditNotification';
import SiteNotification from './SiteNotification';
import { SiteNotificationsCreateEditTypeEnum } from './SiteNotifications.enum';
import { SiteNotificationsInterface } from './SiteNotifications.interface';
import { SiteNotificationsStyle } from './SiteNotifications.style';

const SiteNotifications: FC<SiteNotificationsInterface> = (props) => {
	const { notifications } = props;
	const { t } = useTranslation(['SITES', 'TOOLTIP']);
	const classes = SiteNotificationsStyle();
	const cardClasses = CardStyle();

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;

	const translation = 'CONTENT.CONFIGURATION.NOTIFICATIONS';

	useEffect(() => {
		const executeServices = () => {
			if (cSiteId) {
				// dispatch: fetch site notification types and users
				dispatch(NotificationTypesAndUsersFetchList(cSiteId, true));
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.sites.content.configuration.notifications
				.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, cSiteId]);

	return (
		<Card square elevation={1} className={classes.sCard}>
			<CardContent className={cardClasses.sCardContent0}>
				<Typography variant="h6" className={classes.sTitle}>
					{t(`${translation}.TITLE`)}
				</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${translation}.EXCERPT`)}
				</Typography>

				<Box className={classes.sCreate}>
					<Tooltip
						placement="left"
						title={t<string>('TOOLTIP:NOTIFICATION.ADD')}
						onClick={() => setOpen(true)}>
						<IconButton edge="end">
							<AddCircle color="primary" />
						</IconButton>
					</Tooltip>
					{open && (
						<DialogCreateEditNotification
							type={SiteNotificationsCreateEditTypeEnum.CREATE}
							open={open}
							setOpen={setOpen}
						/>
					)}
				</Box>

				{!!notifications.content?.data.length && (
					<List disablePadding>
						{notifications.content.data.map((notification, index) => (
							<SiteNotification
								key={notification.id}
								notifications={notifications}
								notification={notification}
								index={index}
							/>
						))}
					</List>
				)}
			</CardContent>
		</Card>
	);
};
export default SiteNotifications;

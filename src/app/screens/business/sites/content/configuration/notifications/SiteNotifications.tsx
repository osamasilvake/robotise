import { Box, Card, CardContent, IconButton, List, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import { SiteNotificationTypesAndUsersFetch } from '../../../../../../slices/sites/Site.slice';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { SiteParamsInterface } from '../../../Site.interface';
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

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const params: SiteParamsInterface = useParams();
	const cSiteId = params.site;

	const common = 'CONTENT.CONFIGURATION.NOTIFICATIONS';

	useEffect(() => {
		const executeServices = () => {
			if (cSiteId) {
				// dispatch: fetch notification types and users
				dispatch(SiteNotificationTypesAndUsersFetch(cSiteId, true));
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

	return site.notifications?.content ? (
		<Card square elevation={1} className={classes.sNotificationCard}>
			<CardContent className={cardClasses.sCardContent4}>
				<Typography variant="h6" className={classes.sTitle}>
					{t(`${common}.TITLE`)}
				</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${common}.EXCERPT`)}
				</Typography>

				<Box className={classes.sCreate}>
					<IconButton edge="end" onClick={() => setOpen(true)}>
						<AddCircleIcon color="primary" />
					</IconButton>
					<DialogCreateEditNotification
						type={SiteNotificationsCreateEditTypeEnum.CREATE}
						open={open}
						setOpen={setOpen}
					/>
				</Box>

				<List disablePadding>
					{site.notifications.content.data.map((notification, index) => (
						<SiteNotification key={notification.id} site={site} index={index} />
					))}
				</List>
			</CardContent>
		</Card>
	) : null;
};
export default SiteNotifications;

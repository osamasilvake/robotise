import { Box, Grid } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	notificationsSelector,
	NotificationTypesAndUsersFetch
} from '../../../../../slices/business/sites/configuration/Notifications.slice';
import {
	ServicePositionsFetch,
	servicePositionsSelector
} from '../../../../../slices/business/sites/configuration/ServicePositions.slice';
import { siteSelector } from '../../../../../slices/business/sites/Site.slice';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../Site.interface';
import AcceptOrders from './accept-orders/AcceptOrders';
import SiteNotifications from './notifications/SiteNotifications';
import SiteServicePositions from './service-positions/SiteServicePositions';
import SiteRobotConfig from './site-robot-config/SiteRobotConfig';
import { SiteConfigurationStyle } from './SiteConfiguration.style';

const SiteConfiguration: FC = () => {
	const classes = SiteConfigurationStyle();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const site = useSelector(siteSelector);
	const notifications = useSelector(notificationsSelector);
	const servicePositions = useSelector(servicePositionsSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const params: SiteParamsInterface = useParams();

	const cSiteId = params.siteId;
	const pNotificationSiteId = notifications.content?.site.id;
	const pServicePositionSiteId = servicePositions.content?.site.id;

	useEffect(() => {
		if (pNotificationSiteId !== cSiteId) {
			// dispatch: fetch notification types and users
			dispatch(NotificationTypesAndUsersFetch(cSiteId));
		}
	}, [dispatch, pNotificationSiteId, cSiteId]);

	useEffect(() => {
		if (pServicePositionSiteId !== cSiteId) {
			// dispatch: fetch service positions
			dispatch(ServicePositionsFetch(cSiteId));
		}
	}, [dispatch, pServicePositionSiteId, cSiteId]);

	// loader
	if (
		sites.loader ||
		notifications.loader ||
		servicePositions.loader ||
		robotTwinsSummary.loader
	) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// null
	if (
		(notifications.content && notifications.errors?.id) ||
		(servicePositions.content && servicePositions.errors?.id)
	) {
		return null;
	}

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={1} className={classes.sGridMarginBottom}>
				<Grid item xs={12} md={3}>
					<AcceptOrders sites={sites} site={site} />
				</Grid>
			</Grid>

			<Grid container spacing={1} className={classes.sGridMarginBottom}>
				<Grid item xs={12} md={6}>
					<SiteRobotConfig sites={sites} site={site} />
				</Grid>
			</Grid>

			<Grid container spacing={1}>
				<Grid item xs={12} md={6}>
					<SiteNotifications notifications={notifications} />
				</Grid>

				<Grid item xs={12} md={6}>
					<SiteServicePositions servicePositions={servicePositions} />
				</Grid>
			</Grid>
		</Box>
	);
};
export default SiteConfiguration;

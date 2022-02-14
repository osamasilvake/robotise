import { Box, Grid } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	notificationsSelector,
	NotificationTypesAndUsersFetchList
} from '../../../../../slices/business/sites/configuration/Notifications.slice';
import {
	ServicePositionsFetchList,
	servicePositionsSelector
} from '../../../../../slices/business/sites/configuration/ServicePositions.slice';
import { siteOperationsSelector } from '../../../../../slices/business/sites/SiteOperations.slice';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../Site.interface';
import AcceptOrders from './accept-orders/AcceptOrders';
import SiteNotifications from './notifications/SiteNotifications';
import SiteServicePositions from './service-positions/SiteServicePositions';
import SiteConfig from './site-config/SiteConfig';
import SiteRobotConfig from './site-robot-config/SiteRobotConfig';
import { SiteConfigurationStyle } from './SiteConfiguration.style';

const SiteConfiguration: FC = () => {
	const classes = SiteConfigurationStyle();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const siteOperations = useSelector(siteOperationsSelector);
	const notifications = useSelector(notificationsSelector);
	const servicePositions = useSelector(servicePositionsSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const pNotificationSiteId = notifications.content?.site.id;
	const pServicePositionSiteId = servicePositions.content?.state?.pSiteId;

	useEffect(() => {
		if (pNotificationSiteId !== cSiteId) {
			// dispatch: fetch site notification types and users
			dispatch(NotificationTypesAndUsersFetchList(cSiteId));
		}
	}, [dispatch, pNotificationSiteId, cSiteId]);

	useEffect(() => {
		if (pServicePositionSiteId !== cSiteId) {
			// dispatch: fetch service positions
			dispatch(ServicePositionsFetchList(cSiteId));
		}
	}, [dispatch, pServicePositionSiteId, cSiteId]);

	// loader
	if (robotTwinsSummary.loader || notifications.loader || servicePositions.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={1} className={classes.sGridMarginBottom}>
				<Grid item xs={12} md={3}>
					<AcceptOrders sites={sites} siteOperations={siteOperations} />
				</Grid>
			</Grid>

			<Grid container spacing={1} className={classes.sGridMarginBottom}>
				<Grid item xs={12} md={6}>
					<SiteConfig sites={sites} siteOperations={siteOperations} />
				</Grid>

				{robotTwinsSummary.content && (
					<Grid item xs={12} md={6}>
						<SiteRobotConfig
							sites={sites}
							siteOperations={siteOperations}
							robotTwinsSummary={robotTwinsSummary}
						/>
					</Grid>
				)}
			</Grid>

			<Grid container spacing={1}>
				{!!notifications.content && (
					<Grid item xs={12} md={6}>
						<SiteNotifications notifications={notifications} />
					</Grid>
				)}

				{!!servicePositions.content && (
					<Grid item xs={12} md={6}>
						<SiteServicePositions servicePositions={servicePositions} />
					</Grid>
				)}
			</Grid>
		</Box>
	);
};
export default SiteConfiguration;

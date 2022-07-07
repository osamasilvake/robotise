import { Box, Grid } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import { AppDispatch } from '../../../../../slices';
import {
	GeneralFetchOrderModes,
	generalOperationsSelector
} from '../../../../../slices/business/general/GeneralOperations.slice';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	notificationsSelector,
	NotificationTypesAndUsersFetchList
} from '../../../../../slices/business/sites/configuration/Notifications.slice';
import {
	ServicePositionsFetchList,
	servicePositionsSelector
} from '../../../../../slices/business/sites/configuration/ServicePositions.slice';
import {
	SiteCustomerNotificationTypesFetch,
	siteOperationsSelector,
	SiteOrderOriginsFetch
} from '../../../../../slices/business/sites/SiteOperations.slice';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../Site.interface';
import SiteAcceptOrders from './accept-orders/SiteAcceptOrders';
import SiteCleanTestOrders from './clean-test-orders/SiteCleanTestOrders';
import SiteNotifications from './notifications/SiteNotifications';
import SiteServicePositions from './service-positions/SiteServicePositions';
import SiteConfig from './site-config/SiteConfig';
import SiteRobotConfig from './site-robot-config/SiteRobotConfig';
import { SiteConfigurationStyle } from './SiteConfiguration.style';

const SiteConfiguration: FC = () => {
	const classes = SiteConfigurationStyle();

	const dispatch = useDispatch<AppDispatch>();
	const generalOperations = useSelector(generalOperationsSelector);
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
		if (pNotificationSiteId === cSiteId) return;

		// dispatch: fetch site notification types and users
		dispatch(NotificationTypesAndUsersFetchList(cSiteId));
	}, [dispatch, pNotificationSiteId, cSiteId]);

	useEffect(() => {
		if (pServicePositionSiteId === cSiteId) return;

		// dispatch: fetch service positions
		dispatch(ServicePositionsFetchList(cSiteId));
	}, [dispatch, pServicePositionSiteId, cSiteId]);

	useEffect(() => {
		if (generalOperations.orderModes?.content !== null) return;

		// dispatch: fetch order modes
		dispatch(GeneralFetchOrderModes());
	}, [dispatch, generalOperations.orderModes?.content]);

	useEffect(() => {
		if (siteOperations.orderOrigins?.content !== null) return;

		// dispatch: fetch order origins
		dispatch(SiteOrderOriginsFetch());
	}, [dispatch, siteOperations.orderOrigins?.content]);

	useEffect(() => {
		if (siteOperations.customerNotificationTypes?.content !== null) return;

		// dispatch: fetch customer notification types
		dispatch(SiteCustomerNotificationTypesFetch());
	}, [dispatch, siteOperations.customerNotificationTypes?.content]);

	// loader
	if (robotTwinsSummary.loader || notifications.loader || servicePositions.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={1}>
				{/* Accept Orders */}
				<Grid item xs={12}>
					<SiteAcceptOrders sites={sites} siteOperations={siteOperations} />
				</Grid>

				{/* Notifications */}
				{!!notifications.content && (
					<Grid item xs={12} md={12}>
						<SiteNotifications notifications={notifications} />
					</Grid>
				)}

				{/* Service Positions */}
				{!!servicePositions.content && (
					<Grid item xs={12} md={12}>
						<SiteServicePositions servicePositions={servicePositions} />
					</Grid>
				)}

				{/* Site Robot Config */}
				{robotTwinsSummary.content && (
					<Grid item xs={12}>
						<SiteRobotConfig
							sites={sites}
							siteOperations={siteOperations}
							robotTwinsSummary={robotTwinsSummary}
						/>
					</Grid>
				)}

				{/* Site Config */}
				<Grid item xs={12}>
					<SiteConfig sites={sites} siteOperations={siteOperations} />
				</Grid>

				{/* Clean Test Orders */}
				<Grid item xs={12}>
					<SiteCleanTestOrders />
				</Grid>
			</Grid>
		</Box>
	);
};
export default SiteConfiguration;

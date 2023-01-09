import { Box, Grid } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import { AppDispatch } from '../../../../../../slices';
import {
	GeneralFetchOrderModes,
	generalOperationsSelector
} from '../../../../../../slices/business/general/GeneralOperations.slice';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	siteCloudConfigurationSelector,
	SiteCustomerNotificationTypesFetch,
	SiteElevatorVendorsFetch,
	SiteHelpPagesFetch,
	SiteOrderOriginsFetch
} from '../../../../../../slices/business/sites/configuration/cloud/SiteCloudConfiguration.slice';
import {
	notificationsSelector,
	NotificationTypesAndUsersFetchList
} from '../../../../../../slices/business/sites/configuration/notifications/Notifications.slice';
import {
	ServicePositionsFetchList,
	servicePositionsSelector
} from '../../../../../../slices/business/sites/configuration/service-positions/ServicePositions.slice';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import SiteConfigurationAcceptOrders from './accept-orders/SiteConfigurationAcceptOrders';
import SiteConfigurationCleanTestOrders from './clean-test-orders/SiteConfigurationCleanTestOrders';
import SiteConfigurationNotifications from './notifications/SiteConfigurationNotifications';
import SiteConfigurationPaymentSettings from './payment-settings/SiteConfigurationPaymentSettings';
import SiteConfigurationServicePositions from './service-positions/SiteConfigurationServicePositions';
import SiteConfig from './site-config/SiteConfig';
import SiteRobotConfig from './site-robot-config/SiteRobotConfig';
import { SiteConfigurationCloudStyle } from './SiteConfigurationCloud.style';

const SiteConfigurationCloud: FC = () => {
	const classes = SiteConfigurationCloudStyle();

	const dispatch = useDispatch<AppDispatch>();
	const generalOperations = useSelector(generalOperationsSelector);
	const sites = useSelector(sitesSelector);
	const siteCloudConfiguration = useSelector(siteCloudConfigurationSelector);
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
		if (siteCloudConfiguration.orderOrigins?.content !== null) return;

		// dispatch: fetch order origins
		dispatch(SiteOrderOriginsFetch());
	}, [dispatch, siteCloudConfiguration.orderOrigins?.content]);

	useEffect(() => {
		if (siteCloudConfiguration.customerNotificationTypes?.content !== null) return;

		// dispatch: fetch customer notification types
		dispatch(SiteCustomerNotificationTypesFetch());
	}, [dispatch, siteCloudConfiguration.customerNotificationTypes?.content]);

	useEffect(() => {
		if (siteCloudConfiguration.helpPages?.content !== null) return;

		// dispatch: fetch help pages
		dispatch(SiteHelpPagesFetch());
	}, [dispatch, siteCloudConfiguration.helpPages?.content]);

	useEffect(() => {
		if (siteCloudConfiguration.elevatorVendors?.content !== null) return;

		// dispatch: fetch elevator vendors
		dispatch(SiteElevatorVendorsFetch());
	}, [dispatch, siteCloudConfiguration.elevatorVendors?.content]);

	// loader
	if (robotTwinsSummary.loader || notifications.loader || servicePositions.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={1}>
				{/* Accept Orders */}
				<Grid item xs={12}>
					<SiteConfigurationAcceptOrders
						sites={sites}
						siteCloudConfiguration={siteCloudConfiguration}
					/>
				</Grid>

				{/* Notifications */}
				{!!notifications.content && (
					<Grid item xs={12} md={12}>
						<SiteConfigurationNotifications notifications={notifications} />
					</Grid>
				)}

				{/* Service Positions */}
				{!!servicePositions.content && (
					<Grid item xs={12} md={12}>
						<SiteConfigurationServicePositions servicePositions={servicePositions} />
					</Grid>
				)}

				{/* Site Robot Config */}
				{robotTwinsSummary.content && (
					<Grid item xs={12}>
						<SiteRobotConfig
							sites={sites}
							siteCloudConfiguration={siteCloudConfiguration}
							robotTwinsSummary={robotTwinsSummary}
						/>
					</Grid>
				)}

				{/* Site Config */}
				<Grid item xs={12}>
					<SiteConfig sites={sites} siteCloudConfiguration={siteCloudConfiguration} />
				</Grid>

				{/* Payment Settings */}
				<Grid item xs={12}>
					<SiteConfigurationPaymentSettings
						sites={sites}
						siteCloudConfiguration={siteCloudConfiguration}
					/>
				</Grid>

				{/* Clean Test Orders */}
				<Grid item xs={12}>
					<SiteConfigurationCleanTestOrders />
				</Grid>
			</Grid>
		</Box>
	);
};
export default SiteConfigurationCloud;

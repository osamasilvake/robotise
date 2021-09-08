import { Box, Grid } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import { robotTwinsSummarySelector } from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	SiteNotificationTypesAndUsersFetch,
	siteSelector
} from '../../../../../slices/business/sites/Site.slice';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../Site.interface';
import AcceptOrders from './accept-orders/AcceptOrders';
import SiteNotifications from './notifications/SiteNotifications';
import SiteRobotConfig from './site-robot-config/SiteRobotConfig';
import { SiteConfigurationStyle } from './SiteConfiguration.style';

const SiteConfiguration: FC = () => {
	const classes = SiteConfigurationStyle();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const site = useSelector(siteSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const params: SiteParamsInterface = useParams();

	const cSiteId = params.siteId;
	const pSiteId = site.notifications.content?.site.id;

	useEffect(() => {
		if (pSiteId !== cSiteId) {
			// dispatch: fetch notification types and users
			dispatch(SiteNotificationTypesAndUsersFetch(cSiteId));
		}
	}, [dispatch, pSiteId, cSiteId]);

	// loader
	if (sites.loader || site.notifications.loader || robotTwinsSummary.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// null
	if (!site.notifications?.content && !site.notifications.errors?.id) {
		return null;
	}

	return (
		<Box className={classes.sBox}>
			<Grid container spacing={1} className={classes.sGridMarginBottom}>
				<Grid item xs={12} md={3}>
					<AcceptOrders sites={sites} site={site} />
				</Grid>
			</Grid>

			<Grid container spacing={1}>
				<SiteRobotConfig sites={sites} site={site} />
				<SiteNotifications site={site} />
			</Grid>
		</Box>
	);
};
export default SiteConfiguration;

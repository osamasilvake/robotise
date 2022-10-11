import { Box, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { WifiHeatmapFetch } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteStatisticsWifiHeatmapPeriodsTypeEnum } from './SiteStatisticsWifiHeatmap.enum';
import { SiteStatisticsWifiHeatmapInterface } from './SiteStatisticsWifiHeatmap.interface';
import { SiteStatisticsWifiHeatmapStyle } from './SiteStatisticsWifiHeatmap.style';
import SiteStatisticsWifiHeatmapCard from './SiteStatisticsWifiHeatmapCard';
import SiteStatisticsWifiHeatmapFloor from './SiteStatisticsWifiHeatmapFloor';
import SiteStatisticsWifiHeatmapPeriod from './SiteStatisticsWifiHeatmapPeriod';
import SiteStatisticsWifiHeatmapScreenshot from './SiteStatisticsWifiHeatmapScreenshot';

const SiteStatisticsWifiHeatmap: FC<SiteStatisticsWifiHeatmapInterface> = (props) => {
	const { wifiHeatmap } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteStatisticsWifiHeatmapStyle();

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);

	const [period, setPeriod] = useState(SiteStatisticsWifiHeatmapPeriodsTypeEnum.LAST_WEEK);
	const [floor, setFloor] = useState(wifiHeatmap.content?.maps?.state?.floor);
	const [name, setName] = useState(wifiHeatmap.content?.maps?.state?.name);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const pWifiHeatmapSiteId = wifiHeatmap.content?.maps?.state?.pSiteId;
	const cSiteId = params.siteId;
	const cSiteName = sites.content?.dataById[cSiteId]?.title;
	const translation = 'CONTENT.STATISTICS.WIFI_HEATMAP';

	useEffect(() => {
		const condition1 = pWifiHeatmapSiteId && pWifiHeatmapSiteId === cSiteId;
		const condition2 = floor && name;
		if (condition1 && condition2) {
			// dispatch: fetch wifi heatmap
			dispatch(WifiHeatmapFetch(cSiteId, { floor, name, period }, true));
		}
	}, [dispatch, pWifiHeatmapSiteId, cSiteId, floor, name, period]);

	useEffect(() => {
		const executeServices = () => {
			if (wifiHeatmap.content && floor && name) {
				// dispatch: fetch wifi heatmap
				dispatch(WifiHeatmapFetch(cSiteId, { floor, name, period }, true));
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.sites.content.statistics.wifiHeatmap
				.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, wifiHeatmap.content, cSiteId, floor, name, period]);

	return (
		<Box>
			{/* Title */}
			<Typography variant="h6" color="textSecondary">
				{t(`${translation}.TITLE`)}
			</Typography>

			{/* Period */}
			{/* Floor */}
			{!!wifiHeatmap.content?.maps?.data?.length && floor && (
				<Grid container spacing={2} item xs={12} md={6} className={classes.sSelection}>
					{/* Period */}
					<Grid item xs={12} sm={6}>
						<SiteStatisticsWifiHeatmapPeriod period={period} setPeriod={setPeriod} />
					</Grid>

					{/* Floor */}
					<Grid item xs={12} sm={6}>
						<SiteStatisticsWifiHeatmapFloor
							wifiHeatmap={wifiHeatmap}
							floor={floor}
							setFloor={setFloor}
							setName={setName}
						/>
					</Grid>
				</Grid>
			)}

			{/* Empty */}
			{!wifiHeatmap.content?.maps?.data?.length && (
				<Typography variant="body2" className={classes.sEmpty}>
					{t(`${translation}.EMPTY`)}
				</Typography>
			)}

			{/* Map & Screenshot */}
			{wifiHeatmap && name && (
				<Grid container className={classes.sMap}>
					{/* Map */}
					<Grid item xs={6} id="wifi-map">
						<SiteStatisticsWifiHeatmapCard wifiHeatmap={wifiHeatmap} name={name} />
					</Grid>

					{/* Screenshot */}
					<Grid item xs={12}>
						<SiteStatisticsWifiHeatmapScreenshot siteName={cSiteName} floor={floor} />
					</Grid>
				</Grid>
			)}
		</Box>
	);
};
export default SiteStatisticsWifiHeatmap;

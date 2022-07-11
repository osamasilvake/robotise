import { Box, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import { WifiHeatmapFetch } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteWifiHeatmapPeriodsTypeEnum } from './SiteWifiHeatmap.enum';
import { SiteWifiHeatmapInterface } from './SiteWifiHeatmap.interface';
import { SiteWifiHeatmapStyle } from './SiteWifiHeatmap.style';
import SiteWifiHeatmapCard from './SiteWifiHeatmapCard';
import SiteWifiHeatmapFloor from './SiteWifiHeatmapFloor';
import SiteWifiHeatmapPeriod from './SiteWifiHeatmapPeriod';

const SiteWifiHeatmap: FC<SiteWifiHeatmapInterface> = (props) => {
	const { wifiHeatmap } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteWifiHeatmapStyle();

	const dispatch = useDispatch<AppDispatch>();

	const [period, setPeriod] = useState(SiteWifiHeatmapPeriodsTypeEnum.LAST_WEEK);
	const [floor, setFloor] = useState(wifiHeatmap.content?.maps?.state?.floor);
	const [name, setName] = useState(wifiHeatmap.content?.maps?.state?.name);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const pWifiHeatmapSiteId = wifiHeatmap.content?.maps?.state?.pSiteId;
	const cSiteId = params.siteId;
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
						<SiteWifiHeatmapPeriod period={period} setPeriod={setPeriod} />
					</Grid>

					{/* Floor */}
					<Grid item xs={12} sm={6}>
						<SiteWifiHeatmapFloor
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

			{/* Map */}
			{wifiHeatmap && name && (
				<Grid container className={classes.sMap}>
					<Grid item xs={6}>
						<SiteWifiHeatmapCard wifiHeatmap={wifiHeatmap} name={name} />
					</Grid>
				</Grid>
			)}
		</Box>
	);
};
export default SiteWifiHeatmap;

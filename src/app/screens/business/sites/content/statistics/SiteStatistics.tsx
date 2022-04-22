import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import { AppDispatch } from '../../../../../slices';
import {
	WifiHeatmapFetch,
	wifiHeatmapSelector,
	WifiMapsFetch
} from '../../../../../slices/business/sites/statistics/WifiHeatmap.slice';
import { SiteParamsInterface } from '../../Site.interface';
import { SiteStatisticsStyle } from './SiteStatistics.style';
import SiteWifiHeatmap from './wifi-heatmap/SiteWifiHeatmap';

const SiteStatistics: FC = () => {
	const classes = SiteStatisticsStyle();

	const dispatch = useDispatch<AppDispatch>();
	const wifiHeatmap = useSelector(wifiHeatmapSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const pWifiHeatmapSiteId = wifiHeatmap.content?.maps?.state?.pSiteId;
	const cSiteId = params.siteId;

	useEffect(() => {
		const condition1 = wifiHeatmap.content === null;
		const condition2 =
			wifiHeatmap.content !== null && pWifiHeatmapSiteId && pWifiHeatmapSiteId !== cSiteId;

		if (condition1 || condition2) {
			// dispatch: fetch sites maps
			cSiteId &&
				dispatch(
					WifiMapsFetch(cSiteId, (res) => {
						// dispatch: fetch wifi heatmap
						res?.data?.length &&
							dispatch(
								WifiHeatmapFetch(cSiteId, {
									floor: res.data[0].floor,
									name: res.data[0].name
								})
							);
					})
				);
		}
	}, [dispatch, wifiHeatmap.content, pWifiHeatmapSiteId, cSiteId]);

	// loader
	if (wifiHeatmap.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	return (
		<Box className={classes.sBox}>
			{/* Wifi Heatmap */}
			{wifiHeatmap.content && <SiteWifiHeatmap wifiHeatmap={wifiHeatmap} />}
		</Box>
	);
};
export default SiteStatistics;

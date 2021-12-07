import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import { RobotMapsFetch, robotSelector } from '../../../../../slices/business/robots/Robot.slice';
import {
	WifiHeatmapDataFetch,
	wifiHeatmapSelector
} from '../../../../../slices/business/sites/statistics/WifiHeatmap.slice';
import { SiteParamsInterface } from '../../Site.interface';
import { SiteStatisticsStyle } from './SiteStatistics.style';
import SiteWifiHeatmap from './wifi-heatmap/SiteWifiHeatmap';

const SiteStatistics: FC = () => {
	const classes = SiteStatisticsStyle();

	const dispatch = useDispatch();
	const robot = useSelector(robotSelector);
	const wifiHeatmap = useSelector(wifiHeatmapSelector);

	const params = useParams() as SiteParamsInterface;
	const pWifiHeatmapSiteId = robot.maps.content?.state?.pSiteId;
	const cSiteId = params.siteId;

	useEffect(() => {
		const condition1 = robot.maps.content === null;
		const condition2 =
			robot.maps.content !== null && pWifiHeatmapSiteId && pWifiHeatmapSiteId !== cSiteId;

		if (condition1 || condition2) {
			// dispatch: fetch robot maps
			cSiteId &&
				dispatch(
					RobotMapsFetch(cSiteId, (res) => {
						// dispatch: fetch wifi data for heatmap
						res?.data?.length &&
							dispatch(
								WifiHeatmapDataFetch(cSiteId, {
									floor: res.data[0].floor,
									name: res.data[0].name
								})
							);
					})
				);
		}
	}, [dispatch, robot.maps.content, pWifiHeatmapSiteId, cSiteId]);

	// loader
	if (robot.maps.loading || wifiHeatmap.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	return (
		<Box className={classes.sBox}>
			{/* Wifi Heatmap */}
			{robot.maps.content?.data && (
				<SiteWifiHeatmap robot={robot} wifiHeatmap={wifiHeatmap} />
			)}
		</Box>
	);
};
export default SiteStatistics;

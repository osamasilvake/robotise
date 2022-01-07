import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { AppConfigService } from '../../../../../../services';
import { RobotMapsUpdateState } from '../../../../../../slices/business/robots/RobotOperations.slice';
import { SROContentMapsStateInterface } from '../../../../../../slices/business/robots/RobotOperations.slice.interface';
import { WifiHeatmapDataFetch } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteWifiHeatmapInterface } from './SiteWifiHeatmap.interface';
import { SiteWifiHeatmapStyle } from './SiteWifiHeatmap.style';
import SiteWifiHeatmapCard from './SiteWifiHeatmapCard';

const SiteWifiHeatmap: FC<SiteWifiHeatmapInterface> = (props) => {
	const { robotOperations, wifiHeatmap } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteWifiHeatmapStyle();

	const dispatch = useDispatch();

	const [floor, setFloor] = useState(robotOperations.maps.content?.state?.floor);
	const [name, setName] = useState(robotOperations.maps.content?.state?.name);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const translation = 'CONTENT.STATISTICS.WIFI_HEATMAP';

	/**
	 * handle floor
	 * @param event
	 */
	const handleFloor = (event: SelectChangeEvent) => {
		const floor = event.target.value;
		const name = robotOperations.maps.content?.data.find((f) => f.floor === floor)?.name;

		// set floor
		setFloor(floor);

		// set name
		setName(name);

		// dispatch: update state
		const state: SROContentMapsStateInterface = {
			...robotOperations.maps.content?.state,
			floor,
			name
		};
		dispatch(RobotMapsUpdateState(state));
	};

	useEffect(() => {
		if (floor && name) {
			// dispatch: fetch wifi data for heatmap
			dispatch(WifiHeatmapDataFetch(cSiteId, { floor, name }, true));
		}
	}, [dispatch, cSiteId, floor, name]);

	useEffect(() => {
		const executeServices = () => {
			if (wifiHeatmap.content && floor && name) {
				// dispatch: fetch wifi data for heatmap
				dispatch(WifiHeatmapDataFetch(cSiteId, { floor, name }, true));
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.sites.content.statistics.wifiHeatmap
				.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, wifiHeatmap.content, cSiteId, floor, name]);

	return (
		<Box>
			{/* Title */}
			<Typography variant="h6" color="textSecondary">
				{t(`${translation}.TITLE`)}
			</Typography>

			{/* Floor */}
			{!!robotOperations.maps.content?.data?.length && (
				<Grid container className={classes.sFloor}>
					<Grid item xs={4}>
						<FormControl fullWidth>
							<InputLabel id="label-floor">{t(`${translation}.FLOOR`)}</InputLabel>
							<Select
								labelId="label-floor"
								id="floor"
								name="floor"
								label={t(`${translation}.FLOOR`)}
								value={String(floor)}
								onChange={handleFloor}>
								{robotOperations.maps.content?.data.map((map) => (
									<MenuItem key={map.name} value={map.floor}>
										{map.floor}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			)}

			{/* Empty */}
			{!robotOperations.maps.content?.data?.length && (
				<Typography variant="body2" className={classes.sEmpty}>
					{t(`${translation}.EMPTY`)}
				</Typography>
			)}

			{/* Map */}
			{wifiHeatmap && name && (
				<Grid container className={classes.sMap}>
					<Grid item xs={6}>
						<SiteWifiHeatmapCard
							robotOperations={robotOperations}
							wifiHeatmap={wifiHeatmap}
							name={name}
						/>
					</Grid>
				</Grid>
			)}
		</Box>
	);
};
export default SiteWifiHeatmap;

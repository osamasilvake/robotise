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
import { AppDispatch } from '../../../../../../slices';
import {
	WifiHeatmapFetch,
	WifiHeatmapState
} from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice';
import { SWCMapsStateInterface } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice.interface';
import { SiteParamsInterface } from '../../../Site.interface';
import { SiteWifiHeatmapInterface } from './SiteWifiHeatmap.interface';
import { SiteWifiHeatmapStyle } from './SiteWifiHeatmap.style';
import SiteWifiHeatmapCard from './SiteWifiHeatmapCard';

const SiteWifiHeatmap: FC<SiteWifiHeatmapInterface> = (props) => {
	const { wifiHeatmap } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteWifiHeatmapStyle();

	const dispatch = useDispatch<AppDispatch>();

	const [floor, setFloor] = useState(wifiHeatmap.content?.maps?.state?.floor);
	const [name, setName] = useState(wifiHeatmap.content?.maps?.state?.name);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const pWifiHeatmapSiteId = wifiHeatmap.content?.maps?.state?.pSiteId;
	const cSiteId = params.siteId;
	const translation = 'CONTENT.STATISTICS.WIFI_HEATMAP';

	/**
	 * handle floor
	 * @param event
	 */
	const handleFloor = (event: SelectChangeEvent) => {
		const floor = event.target.value;
		const name = wifiHeatmap.content?.maps?.data?.find((f) => f.floor === floor)?.name;

		// set floor
		setFloor(floor);

		// set name
		setName(name);

		// dispatch: update state
		const state: SWCMapsStateInterface = {
			...wifiHeatmap.content?.maps?.state,
			floor,
			name
		};
		dispatch(WifiHeatmapState(state));
	};

	useEffect(() => {
		const condition1 = pWifiHeatmapSiteId && pWifiHeatmapSiteId === cSiteId;
		const condition2 = floor && name;
		if (condition1 && condition2) {
			// dispatch: fetch wifi heatmap
			dispatch(WifiHeatmapFetch(cSiteId, { floor, name }, true));
		}
	}, [dispatch, pWifiHeatmapSiteId, cSiteId, floor, name]);

	useEffect(() => {
		const executeServices = () => {
			if (wifiHeatmap.content && floor && name) {
				// dispatch: fetch wifi heatmap
				dispatch(WifiHeatmapFetch(cSiteId, { floor, name }, true));
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
			{!!wifiHeatmap.content?.maps?.data?.length && floor && (
				<Grid container className={classes.sFloor}>
					<Grid item xs={4}>
						<FormControl fullWidth>
							<InputLabel id="label-floor">{t(`${translation}.FLOOR`)}</InputLabel>
							<Select
								labelId="label-floor"
								id="floor"
								name="floor"
								label={t(`${translation}.FLOOR`)}
								value={floor}
								onChange={handleFloor}>
								{wifiHeatmap.content?.maps?.data.map((map) => (
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

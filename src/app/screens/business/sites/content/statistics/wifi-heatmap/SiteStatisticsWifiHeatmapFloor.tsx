import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../../../../slices';
import { WifiHeatmapState } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice';
import { SWCMapsStateInterface } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice.interface';
import { SiteStatisticsWifiHeatmapFloorInterface } from './SiteStatisticsWifiHeatmap.interface';

const SiteStatisticsWifiHeatmapFloor: FC<SiteStatisticsWifiHeatmapFloorInterface> = (props) => {
	const { wifiHeatmap, floor, setFloor, setName } = props;
	const { t } = useTranslation('SITES');

	const dispatch = useDispatch<AppDispatch>();

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

	return (
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
	);
};
export default SiteStatisticsWifiHeatmapFloor;

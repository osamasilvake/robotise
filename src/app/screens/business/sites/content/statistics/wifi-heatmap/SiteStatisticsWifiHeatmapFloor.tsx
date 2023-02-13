import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../../../../slices';
import { WifiHeatmapState } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice';
import { SWCMapsStateInterface } from '../../../../../../slices/business/sites/statistics/WifiHeatmap.slice.interface';
import { SiteStatisticsWifiHeatmapFloorInterface } from './SiteStatisticsWifiHeatmap.interface';

const SiteStatisticsWifiHeatmapFloor: FC<SiteStatisticsWifiHeatmapFloorInterface> = (props) => {
	const { wifiHeatmap, setFloor, floorId, setFloorId, setMapId } = props;
	const { t } = useTranslation('SITES');

	const dispatch = useDispatch<AppDispatch>();

	const translation = 'CONTENT.STATISTICS.WIFI_HEATMAP';

	/**
	 * handle floor
	 * @param event
	 */
	const handleFloor = (event: SelectChangeEvent) => {
		const id = event.target.value;
		const mapList = wifiHeatmap.content?.maps?.data;
		const mapId = mapList?.find((f) => f.floor.id === id)?.id;
		const floorName = mapList?.find((f) => f.floor.id === id)?.floorName;

		// set floor
		setFloor(floorName);

		// set floor id
		setFloorId(id);

		// set mapId
		setMapId(mapId);

		// dispatch: update state
		const state: SWCMapsStateInterface = {
			...wifiHeatmap.content?.maps?.state,
			floorId,
			mapId
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
				value={floorId}
				onChange={handleFloor}>
				{wifiHeatmap.content?.maps?.data.map((map) => (
					<MenuItem key={map.name} value={map.floor.id}>
						{map?.floorName || map?.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
export default SiteStatisticsWifiHeatmapFloor;

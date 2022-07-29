import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SiteStatisticsWifiHeatmapPeriodsTypeEnum } from './SiteStatisticsWifiHeatmap.enum';
import { SiteStatisticsWifiHeatmapPeriodInterface } from './SiteStatisticsWifiHeatmap.interface';

const SiteStatisticsWifiHeatmapPeriod: FC<SiteStatisticsWifiHeatmapPeriodInterface> = (props) => {
	const { period, setPeriod } = props;
	const { t } = useTranslation('SITES');

	const translation = 'CONTENT.STATISTICS.WIFI_HEATMAP';
	const periods = Object.values(SiteStatisticsWifiHeatmapPeriodsTypeEnum).map((p) => ({
		id: p,
		label: t(`${translation}.PERIODS.LIST.${p}`)
	}));

	return (
		<FormControl fullWidth>
			<InputLabel id="label-period">{t(`${translation}.PERIODS.LABEL`)}</InputLabel>
			<Select
				labelId="label-period"
				id="period"
				name="period"
				label={t(`${translation}.PERIODS.LABEL`)}
				value={period}
				onChange={(e) =>
					setPeriod(e.target.value as SiteStatisticsWifiHeatmapPeriodsTypeEnum)
				}>
				{periods.map((p) => (
					<MenuItem key={p.id} value={p.id}>
						{p.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
export default SiteStatisticsWifiHeatmapPeriod;

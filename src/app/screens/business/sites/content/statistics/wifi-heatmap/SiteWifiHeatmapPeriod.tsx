import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SiteWifiHeatmapPeriodsTypeEnum } from './SiteWifiHeatmap.enum';
import { SiteWifiHeatmapPeriodInterface } from './SiteWifiHeatmap.interface';
import { SiteWifiHeatmapStyle } from './SiteWifiHeatmap.style';

const SiteWifiHeatmapPeriod: FC<SiteWifiHeatmapPeriodInterface> = (props) => {
	const { period, setPeriod } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteWifiHeatmapStyle();

	const translation = 'CONTENT.STATISTICS.WIFI_HEATMAP';
	const periods = Object.values(SiteWifiHeatmapPeriodsTypeEnum).map((p) => ({
		id: p,
		label: t(`${translation}.PERIODS.LIST.${p}`)
	}));

	return (
		<Grid container className={classes.sPeriod}>
			<Grid item xs={4}>
				<FormControl fullWidth>
					<InputLabel id="label-period">{t(`${translation}.PERIODS.LABEL`)}</InputLabel>
					<Select
						labelId="label-period"
						id="period"
						name="period"
						label={t(`${translation}.PERIODS.LABEL`)}
						value={period}
						onChange={(e) =>
							setPeriod(e.target.value as SiteWifiHeatmapPeriodsTypeEnum)
						}>
						{periods.map((p) => (
							<MenuItem key={p.id} value={p.id}>
								{p.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	);
};
export default SiteWifiHeatmapPeriod;

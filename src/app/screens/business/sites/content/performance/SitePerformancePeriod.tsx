import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PerformancePeriodInterface } from './SitePerformance.interface';

const DashboardPeriod: FC<PerformancePeriodInterface> = (props) => {
	const { performancePeriod, currentPeriod, setCurrentPeriod } = props;
	const { t } = useTranslation('DASHBOARD');

	/**
	 * handle period
	 * @param id
	 */
	const handlePeriod = (id: string) => {
		const period = performancePeriod.find((d) => d.id === id);
		period && setCurrentPeriod(period.id);
	};

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} textAlign="right">
				<FormControl>
					<InputLabel id="period">{t('CHARTS.PERIOD.LABEL')}</InputLabel>
					<Select
						size="small"
						labelId="period"
						id="period"
						name="period"
						label={t('CHARTS.PERIOD.LABEL')}
						value={currentPeriod}
						onChange={(event) => handlePeriod(event.target.value)}>
						{performancePeriod.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	);
};
export default DashboardPeriod;

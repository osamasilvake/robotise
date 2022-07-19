import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PerformanceChartsInterface } from '../SitePerformance.interface';

const DashboardPeriod: FC<PerformanceChartsInterface> = (props) => {
	const { performancePeriod, currentPeriod, setCurrentPeriod } = props;
	const { t } = useTranslation('SITES');

	const translation = 'CONTENT.PERFORMANCE';

	/**
	 * handle period
	 * @param id
	 */
	const handlePeriod = (id: string) => {
		const period = performancePeriod.find((d) => d.id === id);
		period && setCurrentPeriod(period.id);
	};

	return (
		<Box textAlign="right">
			<FormControl>
				<InputLabel id="period">{t(`${translation}.PERIOD.LABEL`)}</InputLabel>
				<Select
					size="small"
					labelId="period"
					id="period"
					name="period"
					label={t(`${translation}.PERIOD.LABEL`)}
					value={currentPeriod}
					onChange={(event) => handlePeriod(event.target.value)}>
					{performancePeriod.map((item) => (
						<MenuItem key={item.id} value={item.id}>
							{t(`${translation}.${item.label}`)}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};
export default DashboardPeriod;

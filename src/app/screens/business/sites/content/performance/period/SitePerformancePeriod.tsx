import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { performanceSelector } from '../../../../../../slices/business/sites/performance/Performance.slice';
import { SitePerformancePeriodInterface } from './SitePerformancePeriod.interface';

const SitePerformancePeriod: FC<SitePerformancePeriodInterface> = (props) => {
	const { sitePerformancePeriod, currentPeriod, setCurrentPeriod } = props;
	const { t } = useTranslation('SITES');

	const performance = useSelector(performanceSelector);

	const translation = 'CONTENT.PERFORMANCE';

	/**
	 * handle period
	 * @param id
	 */
	const handlePeriod = (id: string) => {
		const period = sitePerformancePeriod.find((d) => d.id === id);
		period && setCurrentPeriod(period);
	};

	return (
		<Stack spacing={1.5} direction="row" alignItems="center" justifyContent="end">
			{/* Loader */}
			{performance?.loading && <CircularProgress size={20} />}

			{/* Selection */}
			<FormControl>
				<InputLabel id="period">{t(`${translation}.PERIOD.LABEL`)}</InputLabel>
				<Select
					size="small"
					labelId="period"
					id="period"
					name="period"
					label={t(`${translation}.PERIOD.LABEL`)}
					value={currentPeriod}
					onChange={(event) => handlePeriod(event.target.value)}
					disabled={!!performance?.loading}>
					{sitePerformancePeriod.map((item) => (
						<MenuItem key={item.id} value={item.id}>
							{t(`${translation}.${item.label}`)}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Stack>
	);
};
export default SitePerformancePeriod;

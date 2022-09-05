import { HelpOutline } from '@mui/icons-material';
import { Grid, Stack, Tooltip, Typography } from '@mui/material';
import i18next from 'i18next';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import BarReChart from '../../../../../../../utilities/charts/bar-chart/BarChart';
import { SitePerformanceDemographyStyle } from '../SitePerformanceDemography.style';
import { SitePerformanceDemographyPurchasesInterface } from './SitePerformanceDemographyPurchases.interface';

const SitePerformanceDemographyPurchases: FC<SitePerformanceDemographyPurchasesInterface> = (
	props
) => {
	const { currentPeriod, chart, currency } = props;
	const { t } = useTranslation('SITES');
	const classes = SitePerformanceDemographyStyle();

	const translation = 'CONTENT.PERFORMANCE';

	return (
		<Grid item xs={12} sm={12} md={6}>
			{/* Title */}
			<Stack
				spacing={0.5}
				direction="row"
				alignItems="center"
				className={classes.sTitleLabel}>
				{/* Label */}
				<Typography variant="h5">
					{t(`${translation}.DEMOGRAPHY.PURCHASES.LABEL`)} ({currency})
				</Typography>

				{/* Tooltip */}
				<Tooltip title={t(`${translation}.DEMOGRAPHY.PURCHASES.TOOLTIP`)}>
					<HelpOutline fontSize="small" />
				</Tooltip>
			</Stack>

			{/* Chart */}
			{chart && (
				<BarReChart
					currentPeriod={currentPeriod}
					data={chart}
					axisX={t(`${translation}.DEMOGRAPHY.PURCHASES.DATE`)}
					axisY={t(`${translation}.DEMOGRAPHY.PURCHASES.REVENUE`)}
					currency={currency}
					language={i18next.language}
				/>
			)}
		</Grid>
	);
};
export default SitePerformanceDemographyPurchases;

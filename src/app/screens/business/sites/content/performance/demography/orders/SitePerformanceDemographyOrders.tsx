import { HelpOutline } from '@mui/icons-material';
import { Grid, Stack, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../../services';
import StackedBarReChart from '../../../../../../../utilities/charts/stacked-bar-chart/StackedBarChart';
import { SitePerformanceDemographyStyle } from '../SitePerformanceDemography.style';
import { SitePerformanceDemographyOrdersInterface } from './SitePerformanceDemographyOrders.interface';

const SitePerformanceDemographyOrders: FC<SitePerformanceDemographyOrdersInterface> = (props) => {
	const { currentPeriod, chart } = props;
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
				<Typography variant="h5">{t(`${translation}.DEMOGRAPHY.ORDERS.LABEL`)}</Typography>

				{/* Tooltip */}
				<Tooltip title={t(`${translation}.DEMOGRAPHY.ORDERS.TOOLTIP`)}>
					<HelpOutline fontSize="small" />
				</Tooltip>
			</Stack>

			{/* Chart */}
			{chart && (
				<StackedBarReChart
					currentPeriod={currentPeriod}
					data={chart}
					axisX={t(`${translation}.DEMOGRAPHY.ORDERS.DATE`)}
					axisY1={t(`${translation}.DEMOGRAPHY.ORDERS.MODES.MINIBAR`)}
					axisY2={t(`${translation}.DEMOGRAPHY.ORDERS.MODES.ROOM_SERVICE`)}
					fills={[
						AppConfigService.AppOptions.colors.c9,
						AppConfigService.AppOptions.colors.c13
					]}
					gridLinesHorizontal={true}
				/>
			)}
		</Grid>
	);
};
export default SitePerformanceDemographyOrders;

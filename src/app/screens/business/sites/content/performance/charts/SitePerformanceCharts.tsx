import { Box, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import { performanceSelector } from '../../../../../../slices/business/sites/performance/Performance.slice';
import BarReChart from '../../../../../../utilities/charts/bar-chart/BarChart';
import { BarChartDataInterface } from '../../../../../../utilities/charts/bar-chart/BarChart.interface';
import StackedBarReChart from '../../../../../../utilities/charts/stacked-bar-chart/StackedBarChart';
import { dateFormat4 } from '../../../../../../utilities/methods/Date';
import { SitePerformanceChartsStyle } from './SitePerformanceCharts.style';

const SitePerformanceCharts: FC = () => {
	const { t } = useTranslation('SITES');
	const classes = SitePerformanceChartsStyle();

	const performance = useSelector(performanceSelector);

	const [chart, setChart] = useState<BarChartDataInterface[] | null>(null);
	const [stackedChart] = useState([]);
	const [stacked2Chart] = useState([]);

	const translation = 'CONTENT.PERFORMANCE';
	const allChartsEmpty = !chart?.length && !stackedChart?.length && !stacked2Chart?.length;

	useEffect(() => {
		const histogram = performance?.purchases?.content?.statistics?.histogram;
		const buckets = histogram?.purchasesPerPeriod?.buckets || [];

		// return
		if (!(buckets && buckets.length)) {
			setChart([]);
			return;
		}

		// chart 1
		const list1 = buckets?.map((item) => ({
			x: dateFormat4(item.key),
			y: item.sumTotalPrice
		}));
		list1 && setChart(list1);
	}, [performance?.purchases]);

	return (
		<Box>
			<Grid container spacing={1}>
				{/* Purchases */}
				{chart && chart.length > 0 && (
					<Grid item xs={12} sm={6} md={6}>
						{/* Title */}
						<Typography variant="h5" className={classes.sChartLabel}>
							{t(`${translation}.CHARTS.PURCHASES.LABEL`)}
						</Typography>

						{/* Bar */}
						<BarReChart
							data={chart}
							x={t(`${translation}.CHARTS.PURCHASES.DATE`)}
							axisX={t(`${translation}.CHARTS.PURCHASES.LABEL`)}
							axisY={t(`${translation}.CHARTS.PURCHASES.PRICE`)}
						/>
					</Grid>
				)}

				{/* Orders */}
				{stackedChart && stackedChart.length > 0 && (
					<Grid item xs={12} sm={6} md={6}>
						{/* Title */}
						<Typography variant="h5" className={classes.sChartLabel}>
							{t(`${translation}.CHARTS.ORDERS.LABEL`)}
						</Typography>

						{/* Bar */}
						<StackedBarReChart
							data={stackedChart}
							x={t(`${translation}.CHARTS.ORDERS.DATE`)}
							axisX={t(`${translation}.CHARTS.ORDERS.LABEL`)}
							axisY1={t(`${translation}.CHARTS.ORDERS.MODES.MINIBAR`)}
							axisY2={t(`${translation}.CHARTS.ORDERS.MODES.SERVICE_POSITION`)}
							axisY3={t(`${translation}.CHARTS.ORDERS.MODES.ROOM_SERVICE`)}
							fills={[
								AppConfigService.AppOptions.colors.c10v1,
								AppConfigService.AppOptions.colors.c14,
								AppConfigService.AppOptions.colors.c13
							]}
							gridLinesHorizontal={true}
						/>
					</Grid>
				)}

				{/* Inventory */}
				{stacked2Chart && stacked2Chart.length > 0 && (
					<Grid item xs={12} sm={6} md={6}>
						{/* Title */}
						<Typography variant="h5" className={classes.sChartLabel}>
							{t(`${translation}.CHARTS.INVENTORY.LABEL`)}
						</Typography>

						{/* Bar */}
						<StackedBarReChart
							data={stacked2Chart}
							x={t(`${translation}.CHARTS.INVENTORY.DATE`)}
							axisX={t(`${translation}.CHARTS.INVENTORY.LABEL`)}
							axisY1={t(`${translation}.CHARTS.INVENTORY.STATUS.GREEN`)}
							axisY2={t(`${translation}.CHARTS.INVENTORY.STATUS.YELLOW`)}
							axisY3={t(`${translation}.CHARTS.INVENTORY.STATUS.RED`)}
							fills={[
								AppConfigService.AppOptions.colors.c10v1,
								AppConfigService.AppOptions.colors.c14,
								AppConfigService.AppOptions.colors.c12
							]}
							barCategoryGap={-1}
						/>
					</Grid>
				)}
			</Grid>

			{/* Empty */}
			{allChartsEmpty && <PageError message={t(`${translation}.CHARTS.EMPTY`)} />}
		</Box>
	);
};
export default SitePerformanceCharts;

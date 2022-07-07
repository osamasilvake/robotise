import { Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../services';
import BarReChart from '../../../../../../utilities/charts/bar-chart/BarChart';
import StackedBarReChart from '../../../../../../utilities/charts/stacked-bar-chart/StackedBarChart';
import { chartData, chartStacked2Data, chartStackedData } from '../SitePerformance.data';
import { PerformanceChartPeriodTypeEnum } from './SitePerformanceCharts.enum';
import { PerformanceChartsInterface } from './SitePerformanceCharts.interface';
import { PerformanceChartsStyle } from './SitePerformanceCharts.style';

const PerformanceCharts: FC<PerformanceChartsInterface> = (props) => {
	const { currentPeriod } = props;
	const { t } = useTranslation('DASHBOARD');
	const classes = PerformanceChartsStyle();

	const [chart, setChart] = useState(chartData[PerformanceChartPeriodTypeEnum.MONTH]);
	const [stackedChart, setStackedChart] = useState(
		chartStackedData[PerformanceChartPeriodTypeEnum.MONTH]
	);
	const [stacked2Chart, setStacked2Chart] = useState(
		chartStacked2Data[PerformanceChartPeriodTypeEnum.MONTH]
	);

	useEffect(() => {
		// chart 1
		const list1 = Object.values(chartData).find((d) => d.id === currentPeriod);
		list1 && setChart(list1);

		// chart 2
		const list2 = Object.values(chartStackedData).find((d) => d.id === currentPeriod);
		list2 && setStackedChart(list2);

		// chart 3
		const list3 = Object.values(chartStacked2Data).find((d) => d.id === currentPeriod);
		list3 && setStacked2Chart(list3);
	}, [currentPeriod]);

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6} md={6}>
				{/* Title */}
				<Typography variant="h5" className={classes.sChartLabel}>
					{t('CHARTS.PURCHASES.LABEL')}
				</Typography>

				{/* Bar */}
				<BarReChart
					data={chart.list}
					x={t('CHARTS.PURCHASES.DATE')}
					axisX={t('CHARTS.PURCHASES.LABEL')}
					axisY={t('CHARTS.PURCHASES.PRICE')}
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={6}>
				{/* Title */}
				<Typography variant="h5" className={classes.sChartLabel}>
					{t('CHARTS.ORDERS.LABEL')}
				</Typography>

				{/* Bar */}
				<StackedBarReChart
					data={stackedChart.list}
					x={t('CHARTS.ORDERS.DATE')}
					axisX={t('CHARTS.ORDERS.LABEL')}
					axisY1={t('CHARTS.ORDERS.MODES.MINIBAR')}
					axisY2={t('CHARTS.ORDERS.MODES.SERVICE_POSITION')}
					axisY3={t('CHARTS.ORDERS.MODES.ROOM_SERVICE')}
					fills={[
						AppConfigService.AppOptions.colors.c10v1,
						AppConfigService.AppOptions.colors.c14,
						AppConfigService.AppOptions.colors.c13
					]}
					gridLinesHorizontal={true}
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={6}>
				{/* Title */}
				<Typography variant="h5" className={classes.sChartLabel}>
					{t('CHARTS.INVENTORY.LABEL')}
				</Typography>

				{/* Bar */}
				<StackedBarReChart
					data={stacked2Chart.list}
					x={t('CHARTS.INVENTORY.DATE')}
					axisX={t('CHARTS.INVENTORY.LABEL')}
					axisY1={t('CHARTS.INVENTORY.STATUS.GREEN')}
					axisY2={t('CHARTS.INVENTORY.STATUS.YELLOW')}
					axisY3={t('CHARTS.INVENTORY.STATUS.RED')}
					fills={[
						AppConfigService.AppOptions.colors.c10v1,
						AppConfigService.AppOptions.colors.c14,
						AppConfigService.AppOptions.colors.c12
					]}
					barCategoryGap={-1}
				/>
			</Grid>
		</Grid>
	);
};
export default PerformanceCharts;

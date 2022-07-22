import { Grid, Typography } from '@mui/material';
import i18next from 'i18next';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import { performanceSelector } from '../../../../../../slices/business/sites/performance/Performance.slice';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import BarReChart from '../../../../../../utilities/charts/bar-chart/BarChart';
import { BarChartDataInterface } from '../../../../../../utilities/charts/bar-chart/BarChart.interface';
import StackedAreaReChart from '../../../../../../utilities/charts/stacked-area-chart/StackedAreaChart';
import { StackedAreaChartDataInterface } from '../../../../../../utilities/charts/stacked-area-chart/StackedAreaChart.interface';
import StackedBarReChart from '../../../../../../utilities/charts/stacked-bar-chart/StackedBarChart';
import { dateFormat4 } from '../../../../../../utilities/methods/Date';
import { SiteParamsInterface } from '../../../Site.interface';
import { SitePerformanceChartsStyle } from './SitePerformanceCharts.style';

const SitePerformanceCharts: FC = () => {
	const { t } = useTranslation('SITES');
	const classes = SitePerformanceChartsStyle();

	const sites = useSelector(sitesSelector);
	const performance = useSelector(performanceSelector);

	const [chart, setChart] = useState<BarChartDataInterface[] | null>(null);
	const [chart2, setChart2] = useState<StackedAreaChartDataInterface[] | null>(null);
	const [chart3] = useState<StackedAreaChartDataInterface[] | null>(null);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];

	const translation = 'CONTENT.PERFORMANCE';

	useEffect(() => {
		// purchases
		const purchases = performance?.content?.purchases;
		const pBuckets = purchases?.statistics?.histogram.purchasesPerPeriod?.buckets || [];
		const list1 = pBuckets.map((item) => ({ x: dateFormat4(item.key), y: item.sumTotalPrice }));
		list1 && setChart(list1);

		// inventory
		const inventory = performance?.content?.inventory;
		const iBuckets = inventory?.statistics?.histogram?.inventoryPerPeriod?.buckets || [];
		const list2 = iBuckets.map((item) => ({
			x: dateFormat4(item.key),
			y1: item.avgLanesHigh,
			y2: item.avgLanesLow,
			y3: item.avgLanesEmpty
		}));
		list2 && setChart2(list2);
		console.log(list2);
	}, [performance?.content]);

	return (
		<Grid container spacing={1}>
			{/* Purchases */}
			{chart && chart.length > 0 && (
				<Grid item xs={12} sm={6} md={6}>
					{/* Title */}
					<Typography variant="h5" className={classes.sChartLabel}>
						{t(`${translation}.CHARTS.PURCHASES.LABEL`)} ({siteSingle?.currency})
					</Typography>

					{/* Chart */}
					<BarReChart
						data={chart}
						x={t(`${translation}.CHARTS.PURCHASES.DATE`)}
						axisX={t(`${translation}.CHARTS.PURCHASES.LABEL`)}
						axisY={t(`${translation}.CHARTS.PURCHASES.REVENUE`)}
						currency={siteSingle?.currency}
						language={i18next.language}
					/>
				</Grid>
			)}

			{/* Orders */}
			{chart3 && chart3.length > 0 && (
				<Grid item xs={12} sm={6} md={6}>
					{/* Title */}
					<Typography variant="h5" className={classes.sChartLabel}>
						{t(`${translation}.CHARTS.ORDERS.LABEL`)}
					</Typography>

					{/* Chart */}
					<StackedBarReChart
						data={chart3}
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
			{chart2 && chart2.length > 0 && (
				<Grid item xs={12} sm={6} md={6}>
					{/* Title */}
					<Typography variant="h5" className={classes.sChartLabel}>
						{t(`${translation}.CHARTS.INVENTORY.LABEL`)}
					</Typography>

					{/* Chart */}
					<StackedAreaReChart
						data={chart2}
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
					/>
				</Grid>
			)}
		</Grid>
	);
};
export default SitePerformanceCharts;

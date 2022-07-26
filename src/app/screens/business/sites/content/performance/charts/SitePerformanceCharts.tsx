import { Grid, Typography } from '@mui/material';
import i18next from 'i18next';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import { performanceSelector } from '../../../../../../slices/business/sites/performance/Performance.slice';
import { SPContentTopProductsBucketInterface } from '../../../../../../slices/business/sites/performance/Performance.slice.interface';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import BarReChart from '../../../../../../utilities/charts/bar-chart/BarChart';
import { BarChartDataInterface } from '../../../../../../utilities/charts/bar-chart/BarChart.interface';
import StackedAreaReChart from '../../../../../../utilities/charts/stacked-area-chart/StackedAreaChart';
import { StackedAreaChartDataInterface } from '../../../../../../utilities/charts/stacked-area-chart/StackedAreaChart.interface';
import StackedBarReChart from '../../../../../../utilities/charts/stacked-bar-chart/StackedBarChart';
import { StackedBarChartDataInterface } from '../../../../../../utilities/charts/stacked-bar-chart/StackedBarChart.interface';
import { dateFormat4 } from '../../../../../../utilities/methods/Date';
import { SiteParamsInterface } from '../../../Site.interface';
import { SitePerformanceChartsTypeEnum } from './SitePerformanceCharts.enum';
import { SitePerformanceChartsStyle } from './SitePerformanceCharts.style';
import RobotTopProductsTable from './top-products/table/RobotTopProductsTable';

const SitePerformanceCharts: FC = () => {
	const { t } = useTranslation('SITES');
	const classes = SitePerformanceChartsStyle();

	const sites = useSelector(sitesSelector);
	const performance = useSelector(performanceSelector);

	const [chart, setChart] = useState<BarChartDataInterface[] | null>(null);
	const [chart2, setChart2] = useState<StackedBarChartDataInterface[] | null>(null);
	const [chart3, setChart3] = useState<StackedAreaChartDataInterface[] | null>(null);
	const [topProducts, setTopProducts] = useState<SPContentTopProductsBucketInterface[]>([]);

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

		// orders
		const miniBar = SitePerformanceChartsTypeEnum.MINI_BAR;
		const roomService = SitePerformanceChartsTypeEnum.ROOM_SERVICE;
		const orders = performance?.content?.orders;
		const oBuckets = orders?.statistics?.histogram.ordersPerPeriod?.buckets || [];
		const list2 = oBuckets.map((item) => ({
			x: dateFormat4(item.key),
			y1: item.orderModes.find((m) => m.key === miniBar)?.docCount || 0,
			y2: item.orderModes.find((m) => m.key === roomService)?.docCount || 0
		}));
		list2 && setChart2(list2);

		// inventory
		const inventory = performance?.content?.inventory;
		const iBuckets = inventory?.statistics?.histogram?.inventoryPerPeriod?.buckets || [];
		const list3 = iBuckets.map((item) => ({
			x: dateFormat4(item.key),
			y1: item.avgLanesHigh,
			y2: item.avgLanesLow,
			y3: item.avgLanesEmpty
		}));
		list3 && setChart3(list3);

		// top products
		const topTotalPrice = performance?.content?.topProducts?.statistics?.topTotalPrice;
		const products = topTotalPrice?.buckets || [];
		setTopProducts(products);
	}, [performance?.content, topProducts]);

	return (
		<Grid container spacing={1}>
			{/* Purchases */}
			{chart && chart.length > 0 && (
				<Grid item xs={12} sm={12} md={6}>
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
			{chart2 && chart2.length > 0 && (
				<Grid item xs={12} sm={12} md={6}>
					{/* Title */}
					<Typography variant="h5" className={classes.sChartLabel}>
						{t(`${translation}.CHARTS.ORDERS.LABEL`)}
					</Typography>

					{/* Chart */}
					<StackedBarReChart
						data={chart2}
						x={t(`${translation}.CHARTS.ORDERS.DATE`)}
						axisX={t(`${translation}.CHARTS.ORDERS.LABEL`)}
						axisY1={t(`${translation}.CHARTS.ORDERS.MODES.MINIBAR`)}
						axisY2={t(`${translation}.CHARTS.ORDERS.MODES.ROOM_SERVICE`)}
						fills={[
							AppConfigService.AppOptions.colors.c9,
							AppConfigService.AppOptions.colors.c13
						]}
						gridLinesHorizontal={true}
					/>
				</Grid>
			)}

			{/* Inventory */}
			{chart3 && chart3.length > 0 && (
				<Grid item xs={12} sm={12} md={6}>
					{/* Title */}
					<Typography variant="h5" className={classes.sChartLabel}>
						{t(`${translation}.CHARTS.INVENTORY.LABEL`)}
					</Typography>

					{/* Chart */}
					<StackedAreaReChart
						data={chart3}
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

			{/* Top Products */}
			<Grid item xs={12} sm={12} md={6}>
				{/* Title */}
				<Typography variant="h5" className={classes.sChartLabel}>
					{t(`${translation}.CHARTS.TOP_PRODUCTS.LABEL`)}
				</Typography>

				{/* Table */}
				<RobotTopProductsTable topProducts={topProducts} currency={siteSingle?.currency} />
			</Grid>
		</Grid>
	);
};
export default SitePerformanceCharts;

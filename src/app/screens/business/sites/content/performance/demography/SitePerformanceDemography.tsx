import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { performanceSelector } from '../../../../../../slices/business/sites/performance/Performance.slice';
import { SPContentTopProductsBucketInterface } from '../../../../../../slices/business/sites/performance/Performance.slice.interface';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { BarChartDataInterface } from '../../../../../../utilities/charts/bar-chart/BarChart.interface';
import { StackedAreaChartDataInterface } from '../../../../../../utilities/charts/stacked-area-chart/StackedAreaChart.interface';
import { StackedBarChartDataInterface } from '../../../../../../utilities/charts/stacked-bar-chart/StackedBarChart.interface';
import { dateFormat4 } from '../../../../../../utilities/methods/Date';
import { SiteParamsInterface } from '../../../Site.interface';
import SitePerformanceDemographyInventory from './inventory/SitePerformanceDemographyInventory';
import SitePerformanceDemographyOrders from './orders/SitePerformanceDemographyOrders';
import SitePerformanceDemographyPurchases from './purchases/SitePerformanceDemographyPurchases';
import { SitePerformanceDemographyTypeEnum } from './SitePerformanceDemography.enum';
import { SitePerformanceDemographyInterface } from './SitePerformanceDemography.interface';
import SitePerformanceDemographyTopProducts from './top-products/SitePerformanceDemographyTopProducts';

const SitePerformanceDemography: FC<SitePerformanceDemographyInterface> = (props) => {
	const { currentPeriod } = props;

	const sites = useSelector(sitesSelector);
	const performance = useSelector(performanceSelector);

	const [chart, setChart] = useState<BarChartDataInterface[] | null>(null);
	const [chart2, setChart2] = useState<StackedBarChartDataInterface[] | null>(null);
	const [chart3, setChart3] = useState<StackedAreaChartDataInterface[] | null>(null);
	const [topProducts, setTopProducts] = useState<SPContentTopProductsBucketInterface[]>([]);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];

	useEffect(() => {
		// purchases
		const purchases = performance?.content?.purchases;
		const pBuckets = purchases?.statistics?.histogram.purchasesPerPeriod?.buckets || [];
		const list1 = pBuckets.map((item) => ({
			x: dateFormat4(item.key),
			y: item.sumTotalPrice
		}));
		list1 && setChart(list1);

		// orders
		const miniBar = SitePerformanceDemographyTypeEnum.MINI_BAR;
		const roomService = SitePerformanceDemographyTypeEnum.ROOM_SERVICE;
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
			y1: +item.avgLanesHigh.toFixed(2),
			y2: +item.avgLanesLow.toFixed(2),
			y3: +item.avgLanesEmpty.toFixed(2)
		}));
		list3 && setChart3(list3);

		// top products
		const topQuantity = performance?.content?.topProducts?.statistics?.topQuantity;
		const products = topQuantity?.buckets || [];
		setTopProducts(products);
	}, [performance?.content, currentPeriod]);

	return (
		<Grid container spacing={1}>
			{/* Purchases */}
			{chart && chart.length > 0 && (
				<SitePerformanceDemographyPurchases
					currentPeriod={currentPeriod}
					chart={chart}
					currency={siteSingle?.currency}
				/>
			)}

			{/* Orders */}
			{chart2 && chart2.length > 0 && (
				<SitePerformanceDemographyOrders currentPeriod={currentPeriod} chart={chart2} />
			)}

			{/* Inventory */}
			{chart3 && chart3.length > 0 && (
				<SitePerformanceDemographyInventory currentPeriod={currentPeriod} chart={chart3} />
			)}

			{/* Top Products */}
			<SitePerformanceDemographyTopProducts
				topProducts={topProducts}
				currency={siteSingle?.currency}
			/>
		</Grid>
	);
};
export default SitePerformanceDemography;

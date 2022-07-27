import { InfoOutlined } from '@mui/icons-material';
import { Box, Grid, List, ListItem, Stack, Tooltip, Typography } from '@mui/material';
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
import { dateFormat4, dateFormat7 } from '../../../../../../utilities/methods/Date';
import { SiteParamsInterface } from '../../../Site.interface';
import { SitePerformancePeriodTypeEnum } from '../period/SitePerformancePeriod.enum';
import {
	SitePerformanceDemographyOrdersTooltipTypeEnum,
	SitePerformanceDemographyTypeEnum
} from './SitePerformanceDemography.enum';
import { SitePerformanceDemographyInterface } from './SitePerformanceDemography.interface';
import { SitePerformanceDemographyStyle } from './SitePerformanceDemography.style';
import RobotTopProductsTable from './top-products/table/RobotTopProductsTable';

const SitePerformanceDemography: FC<SitePerformanceDemographyInterface> = (props) => {
	const { currentPeriod } = props;
	const { t } = useTranslation('SITES');
	const classes = SitePerformanceDemographyStyle();

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
	const inventoryTooltips = {
		label: t(`${translation}.DEMOGRAPHY.INVENTORY.TOOLTIP.LABEL`),
		list: [
			{
				key: SitePerformanceDemographyOrdersTooltipTypeEnum.FULL,
				label: t(`${translation}.DEMOGRAPHY.INVENTORY.TOOLTIP.TYPES.FULL`)
			},
			{
				key: SitePerformanceDemographyOrdersTooltipTypeEnum.LOW,
				label: t(`${translation}.DEMOGRAPHY.INVENTORY.TOOLTIP.TYPES.LOW`)
			},
			{
				key: SitePerformanceDemographyOrdersTooltipTypeEnum.EMPTY,
				label: t(`${translation}.DEMOGRAPHY.INVENTORY.TOOLTIP.TYPES.EMPTY`)
			}
		]
	};
	console.log(inventoryTooltips);

	useEffect(() => {
		// period: month
		const month = currentPeriod === SitePerformancePeriodTypeEnum.MONTH;

		// purchases
		const purchases = performance?.content?.purchases;
		const pBuckets = purchases?.statistics?.histogram.purchasesPerPeriod?.buckets || [];
		const list1 = pBuckets.map((item) => ({
			x: month ? dateFormat7(item.key) : dateFormat4(item.key),
			y: item.sumTotalPrice
		}));
		list1 && setChart(list1);

		// orders
		const miniBar = SitePerformanceDemographyTypeEnum.MINI_BAR;
		const roomService = SitePerformanceDemographyTypeEnum.ROOM_SERVICE;
		const orders = performance?.content?.orders;
		const oBuckets = orders?.statistics?.histogram.ordersPerPeriod?.buckets || [];
		const list2 = oBuckets.map((item) => ({
			x: month ? dateFormat7(item.key) : dateFormat4(item.key),
			y1: item.orderModes.find((m) => m.key === miniBar)?.docCount || 0,
			y2: item.orderModes.find((m) => m.key === roomService)?.docCount || 0
		}));
		list2 && setChart2(list2);

		// inventory
		const inventory = performance?.content?.inventory;
		const iBuckets = inventory?.statistics?.histogram?.inventoryPerPeriod?.buckets || [];
		const list3 = iBuckets.map((item) => ({
			x: month ? dateFormat7(item.key) : dateFormat4(item.key),
			y1: item.avgLanesHigh,
			y2: item.avgLanesLow,
			y3: item.avgLanesEmpty
		}));
		list3 && setChart3(list3);

		// top products
		const topQuantity = performance?.content?.topProducts?.statistics?.topQuantity;
		const products = topQuantity?.buckets || [];
		setTopProducts(products);
	}, [performance?.content, currentPeriod]);

	/**
	 * tooltip inventory colors
	 * @param type
	 * @returns
	 */
	const tooltipInventoryColors = (type: SitePerformanceDemographyOrdersTooltipTypeEnum) => {
		if (type === SitePerformanceDemographyOrdersTooltipTypeEnum.FULL) {
			return AppConfigService.AppOptions.colors.c10v1;
		} else if (type === SitePerformanceDemographyOrdersTooltipTypeEnum.LOW) {
			return AppConfigService.AppOptions.colors.c11;
		}
		return AppConfigService.AppOptions.colors.c12;
	};

	return (
		<Grid container spacing={1}>
			{/* Purchases */}
			{chart && chart.length > 0 && (
				<Grid item xs={12} sm={12} md={6}>
					{/* Title */}
					<Stack
						spacing={0.5}
						direction="row"
						alignItems="center"
						className={classes.sTitleLabel}>
						{/* Label */}
						<Typography variant="h5">
							{t(`${translation}.DEMOGRAPHY.PURCHASES.LABEL`)} ({siteSingle?.currency}
							)
						</Typography>

						{/* Tooltip */}
						<Tooltip title={t(`${translation}.DEMOGRAPHY.PURCHASES.TOOLTIP`)}>
							<InfoOutlined fontSize="small" />
						</Tooltip>
					</Stack>

					{/* Chart */}
					<BarReChart
						data={chart}
						x={t(`${translation}.DEMOGRAPHY.PURCHASES.DATE`)}
						axisX={t(`${translation}.DEMOGRAPHY.PURCHASES.LABEL`)}
						axisY={t(`${translation}.DEMOGRAPHY.PURCHASES.REVENUE`)}
						currency={siteSingle?.currency}
						language={i18next.language}
					/>
				</Grid>
			)}

			{/* Orders */}
			{chart2 && chart2.length > 0 && (
				<Grid item xs={12} sm={12} md={6}>
					{/* Title */}
					<Stack
						spacing={0.5}
						direction="row"
						alignItems="center"
						className={classes.sTitleLabel}>
						{/* Label */}
						<Typography variant="h5">
							{t(`${translation}.DEMOGRAPHY.ORDERS.LABEL`)}
						</Typography>

						{/* Tooltip */}
						<Tooltip title={t(`${translation}.DEMOGRAPHY.ORDERS.TOOLTIP`)}>
							<InfoOutlined fontSize="small" />
						</Tooltip>
					</Stack>

					{/* Chart */}
					<StackedBarReChart
						data={chart2}
						x={t(`${translation}.DEMOGRAPHY.ORDERS.DATE`)}
						axisX={t(`${translation}.DEMOGRAPHY.ORDERS.LABEL`)}
						axisY1={t(`${translation}.DEMOGRAPHY.ORDERS.MODES.MINIBAR`)}
						axisY2={t(`${translation}.DEMOGRAPHY.ORDERS.MODES.ROOM_SERVICE`)}
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
					<Stack
						spacing={0.5}
						direction="row"
						alignItems="center"
						className={classes.sTitleLabel}>
						{/* Label */}
						<Typography variant="h5">
							{t(`${translation}.DEMOGRAPHY.INVENTORY.LABEL`)}
						</Typography>

						{/* Tooltip */}
						<Tooltip
							title={
								<Box>
									<Box className={classes.sTooltipLabel}>
										{inventoryTooltips.label}
									</Box>
									<List disablePadding className={classes.sTooltipInventoryList}>
										{inventoryTooltips.list.map((item) => (
											<ListItem disablePadding key={item.key}>
												<Stack spacing={0} direction="row">
													<Box
														className={
															classes.sTooltipInventoryListItemKey
														}
														style={{
															color: tooltipInventoryColors(item.key)
														}}>
														{item.key}
													</Box>
													<Box
														className={
															classes.sTooltipInventoryListItemLabel
														}>
														{item.label}
													</Box>
												</Stack>
											</ListItem>
										))}
									</List>
								</Box>
							}>
							<InfoOutlined fontSize="small" />
						</Tooltip>
					</Stack>

					{/* Chart */}
					<StackedAreaReChart
						data={chart3}
						x={t(`${translation}.DEMOGRAPHY.INVENTORY.DATE`)}
						axisX={t(`${translation}.DEMOGRAPHY.INVENTORY.LABEL`)}
						axisY1={t(`${translation}.DEMOGRAPHY.INVENTORY.STATUS.GREEN`)}
						axisY2={t(`${translation}.DEMOGRAPHY.INVENTORY.STATUS.YELLOW`)}
						axisY3={t(`${translation}.DEMOGRAPHY.INVENTORY.STATUS.RED`)}
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
				<Stack
					spacing={0.5}
					direction="row"
					alignItems="center"
					className={classes.sTitleLabel}>
					{/* Label */}
					<Typography variant="h5">
						{t(`${translation}.DEMOGRAPHY.TOP_PRODUCTS.LABEL`)}
					</Typography>

					{/* Tooltip */}
					<Tooltip title={t(`${translation}.DEMOGRAPHY.TOP_PRODUCTS.TOOLTIP`)}>
						<InfoOutlined fontSize="small" />
					</Tooltip>
				</Stack>

				{/* Table */}
				<RobotTopProductsTable topProducts={topProducts} currency={siteSingle?.currency} />
			</Grid>
		</Grid>
	);
};
export default SitePerformanceDemography;

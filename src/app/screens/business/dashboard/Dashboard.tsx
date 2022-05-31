import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PageHead from '../../../components/content/page-head/PageHead';
import BarReChart from '../../../utilities/charts/bar-chart/BarChart';
import StackedBarReChart from '../../../utilities/charts/stacked-bar-chart/StackedBarChart';
import { chartData, chartStackedData } from './Dashboard.data';
import { DashboardChartPeriodTypeEnum } from './Dashboard.enum';
import { DashboardStyle } from './Dashboard.style';

const Dashboard: FC = () => {
	const { t } = useTranslation('DASHBOARD');
	const classes = DashboardStyle();

	const selectList = [
		{ id: DashboardChartPeriodTypeEnum.WEEK, label: t('CHARTS.PERIOD.WEEK') },
		{ id: DashboardChartPeriodTypeEnum.MONTH, label: t('CHARTS.PERIOD.MONTH') }
	];
	const [currentPeriod, setCurrentPeriod] = useState(selectList[1].id);
	const [chart, setChart] = useState(chartData[DashboardChartPeriodTypeEnum.MONTH]);
	const [stackedChart, setStackedChart] = useState(
		chartStackedData[DashboardChartPeriodTypeEnum.MONTH]
	);

	/**
	 * handle period
	 * @param id
	 */
	const handlePeriod = (id: string) => {
		const period = selectList.find((d) => d.id === id);
		period && setCurrentPeriod(period.id);

		// chart 1
		const list1 = Object.values(chartData).find((d) => d.id === id);
		list1 && setChart(list1);

		// chart 2
		const list2 = Object.values(chartStackedData).find((d) => d.id === id);
		list2 && setStackedChart(list2);
	};

	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead onlyMeta title="DASHBOARD.TITLE" description="DASHBOARD.DESCRIPTION" />

			{/* Charts */}
			<Grid container spacing={1}>
				<Grid item xs={12} textAlign="right">
					<FormControl>
						<InputLabel id="period">{t('CHARTS.PERIOD.LABEL')}</InputLabel>
						<Select
							size="small"
							labelId="period"
							id="period"
							name="period"
							label={t('CHARTS.PERIOD.LABEL')}
							value={currentPeriod}
							onChange={(event) => handlePeriod(event.target.value)}>
							{selectList.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
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
					/>
				</Grid>
			</Grid>
		</Paper>
	);
};
export default Dashboard;

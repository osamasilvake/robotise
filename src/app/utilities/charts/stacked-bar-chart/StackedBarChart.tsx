import { Box } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';

import { SitePerformancePeriodTypeEnum } from '../../../screens/business/sites/content/performance/period/SitePerformancePeriod.enum';
import { appSelector } from '../../../slices/app/App.slice';
import { AppThemePaletteTypeEnum } from '../../../slices/app/App.slice.enum';
import { dateDayJs, dateFormat6, dateFormat7, dateFormat8 } from '../../methods/Date';
import { StackedBarChartInterface } from './StackedBarChart.interface';
import { StackedBarChartStyle } from './StackedBarChart.style';

const StackedBarReChart: FC<StackedBarChartInterface> = (props) => {
	const {
		currentPeriod,
		data,
		cwLabel,
		axisX,
		axisY1,
		axisY2,
		fills,
		barCategoryGap,
		gridLinesHorizontal
	} = props;
	const styles = StackedBarChartStyle;

	const app = useSelector(appSelector);

	const stackId = 'stacked';
	const isDark = app.themePalette === AppThemePaletteTypeEnum.DARK;
	const isWeek =
		currentPeriod === SitePerformancePeriodTypeEnum.WEEK4 ||
		currentPeriod === SitePerformancePeriodTypeEnum.WEEK8;
	const month = currentPeriod === SitePerformancePeriodTypeEnum.MONTH;
	const mapData = data.map((d) => ({
		[axisX]: d.x,
		[axisY1]: d.y1,
		[axisY2]: d.y2
	}));

	return (
		<Box style={styles.sBox}>
			<ResponsiveContainer>
				<BarChart data={mapData} barCategoryGap={barCategoryGap} margin={{ left: -20 }}>
					{/* Cartesian Grid */}
					<CartesianGrid
						horizontal={gridLinesHorizontal || false}
						vertical={false}
						stroke={styles.sCartesianGrid.stroke}
						strokeDasharray="4 4"
					/>

					{/* Axis */}
					<YAxis style={isDark ? styles.sAxisLight : styles.sAxisDark} />
					<XAxis
						dataKey={axisX}
						tickFormatter={(t) => {
							if (month) {
								return dateFormat7(t);
							} else {
								return isWeek ? `${cwLabel} ${dateDayJs(t).week()}` : t;
							}
						}}
						style={isDark ? styles.sAxisLight : styles.sAxisDark}
					/>

					{/* Tooltip */}
					<Tooltip
						cursor={false}
						labelFormatter={(t) => {
							if (isWeek) {
								const start = dateDayJs(t).startOf('week').toDate();
								const end = dateDayJs(t).endOf('week').toDate();
								const formatStart = dateFormat8(start);
								const formatEnd = dateFormat8(end);
								return `${axisX}: ${formatStart} - ${formatEnd}`;
							}
							return `${axisX}: ${dateFormat6(t)}`;
						}}
						labelStyle={styles.sTooltipLabel}
					/>

					{/* Bar */}
					<Bar stackId={stackId} dataKey={axisY1} fill={fills[0]} />
					<Bar stackId={stackId} dataKey={axisY2} fill={fills[1]} />

					{/* Legend */}
					<Legend />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
};
export default StackedBarReChart;

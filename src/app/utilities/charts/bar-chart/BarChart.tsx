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
import { currencyFormat } from '../../methods/Number';
import { BarChartInterface } from './BarChart.interface';
import { BarChartStyle } from './BarChart.style';

const BarReChart: FC<BarChartInterface> = (props) => {
	const { currentPeriod, data, cwLabel, axisX, axisY, currency, language } = props;
	const styles = BarChartStyle;

	const app = useSelector(appSelector);

	const isDark = app.themePalette === AppThemePaletteTypeEnum.DARK;
	const isWeek =
		currentPeriod === SitePerformancePeriodTypeEnum.WEEK4 ||
		currentPeriod === SitePerformancePeriodTypeEnum.WEEK8;
	const month = currentPeriod === SitePerformancePeriodTypeEnum.MONTH;
	const mapData = data.map((d) => ({
		[axisX]: d.x,
		[axisY]: d.y
	}));

	return (
		<Box style={styles.sBox}>
			<ResponsiveContainer>
				<BarChart data={mapData} margin={{ left: -20 }}>
					{/* Cartesian Grid */}
					<CartesianGrid
						vertical={false}
						stroke={styles.sCartesianGrid.stroke}
						strokeDasharray="4 4"
					/>

					{/* Axis */}
					<YAxis dataKey={axisY} style={isDark ? styles.sAxisLight : styles.sAxisDark} />
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
						formatter={(value: string) => currencyFormat(+value, language, currency)}
						labelStyle={styles.sTooltipLabel}
					/>

					{/* Bar */}
					<Bar fill={styles.sBar.fill} dataKey={axisY} />

					{/* Legend */}
					<Legend />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
};
export default BarReChart;

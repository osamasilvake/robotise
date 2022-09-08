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
import { dateFormat6, dateFormat7 } from '../../methods/Date';
import { currencyFormat } from '../../methods/Number';
import { BarChartInterface } from './BarChart.interface';
import { BarChartStyle } from './BarChart.style';

const BarReChart: FC<BarChartInterface> = (props) => {
	const { currentPeriod, data, axisX, axisY, currency, language } = props;
	const styles = BarChartStyle;

	const app = useSelector(appSelector);

	const isDark = app.themePalette === AppThemePaletteTypeEnum.DARK;
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
						tickFormatter={(t) => (month ? dateFormat7(t) : t)}
						style={isDark ? styles.sAxisLight : styles.sAxisDark}
					/>

					{/* Tooltip */}
					<Tooltip
						cursor={false}
						labelFormatter={(t) => `${axisX}: ${dateFormat6(t)}`}
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

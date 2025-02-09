import { Box } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
	Area,
	AreaChart,
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
import { StackedAreaChartInterface } from './StackedAreaChart.interface';
import { StackedAreaChartStyle } from './StackedAreaChart.style';

const StackedAreaReChart: FC<StackedAreaChartInterface> = (props) => {
	const {
		currentPeriod,
		data,
		axisX,
		axisY1,
		axisY2,
		axisY3,
		fills,
		barCategoryGap,
		gridLinesHorizontal
	} = props;
	const styles = StackedAreaChartStyle;

	const app = useSelector(appSelector);

	const stackId = 'stacked';
	const isDark = app.themePalette === AppThemePaletteTypeEnum.DARK;
	const month = currentPeriod === SitePerformancePeriodTypeEnum.MONTH;
	const mapData = data.map((d) => ({
		[axisX]: d.x,
		[axisY1]: d.y1,
		[axisY2]: d.y2,
		[axisY3]: d.y3,
		count: Math.ceil(d.y1 + d.y2 + d.y3)
	}));
	const max = Math.max(...mapData.map((o) => o.count));

	return (
		<Box style={styles.sBox}>
			<ResponsiveContainer>
				<AreaChart data={mapData} barCategoryGap={barCategoryGap} margin={{ left: -20 }}>
					{/* Cartesian Grid */}
					<CartesianGrid
						horizontal={gridLinesHorizontal || false}
						vertical={false}
						stroke={styles.sCartesianGrid.stroke}
						strokeDasharray="4 4"
					/>

					{/* Axis */}
					<YAxis
						style={isDark ? styles.sAxisLight : styles.sAxisDark}
						domain={[0, max || 'auto']}
					/>
					<XAxis
						dataKey={axisX}
						tickFormatter={(t) => (month ? dateFormat7(t) : t)}
						style={isDark ? styles.sAxisLight : styles.sAxisDark}
					/>

					{/* Tooltip */}
					<Tooltip
						cursor={false}
						labelFormatter={(t) => `${axisX}: ${dateFormat6(t)}`}
						labelStyle={styles.sTooltipLabel}
					/>

					{/* Area */}
					<Area
						type="monotone"
						stackId={stackId}
						dataKey={axisY1}
						fill={fills[0]}
						stroke={fills[0]}
					/>
					<Area
						type="monotone"
						stackId={stackId}
						dataKey={axisY2}
						fill={fills[1]}
						stroke={fills[1]}
					/>
					<Area
						type="monotone"
						stackId={stackId}
						dataKey={axisY3}
						fill={fills[2]}
						stroke={fills[2]}
					/>

					{/* Legend */}
					<Legend />
				</AreaChart>
			</ResponsiveContainer>
		</Box>
	);
};
export default StackedAreaReChart;

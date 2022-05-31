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

import { AppConfigService } from '../../../services';
import { appSelector } from '../../../slices/app/App.slice';
import { AppThemePaletteTypeEnum } from '../../../slices/app/App.slice.enum';
import { dateFormat6 } from '../../methods/Date';
import { StackedBarChartInterface } from './StackedBarChart.interface';
import { StackedBarChartStyle } from './StackedBarChart.style';

const StackedBarReChart: FC<StackedBarChartInterface> = (props) => {
	const { data, x, axisX, axisY1, axisY2, axisY3 } = props;
	const styles = StackedBarChartStyle;

	const app = useSelector(appSelector);

	const isDark = app.themePalette === AppThemePaletteTypeEnum.DARK;
	const mapData = data.map((d) => ({
		[x]: d.x,
		[axisX]: d.x,
		[axisY1]: d.y1,
		[axisY2]: d.y2,
		[axisY3]: d.y3
	}));
	const stackId = 'stacked';

	return (
		<Box style={styles.sBox}>
			<ResponsiveContainer>
				<BarChart data={mapData}>
					{/* Cartesian Grid */}
					<CartesianGrid
						vertical={false}
						stroke={styles.sCartesianGrid.stroke}
						strokeDasharray="4 4"
					/>

					{/* Axis */}
					<YAxis style={isDark ? styles.sAxisLight : styles.sAxisDark} />
					<XAxis dataKey={axisX} style={isDark ? styles.sAxisLight : styles.sAxisDark} />

					{/* Tooltip */}
					<Tooltip
						cursor={false}
						labelFormatter={(t) => `${x}: ${dateFormat6(t)}`}
						labelStyle={styles.sTooltipLabel}
					/>

					{/* Bar */}
					<Bar
						dataKey={axisY1}
						fill={AppConfigService.AppOptions.colors.c10v1}
						stackId={stackId}
					/>
					<Bar
						stackId={stackId}
						dataKey={axisY2}
						fill={AppConfigService.AppOptions.colors.c14}
					/>
					<Bar
						stackId={stackId}
						dataKey={axisY3}
						fill={AppConfigService.AppOptions.colors.c13}
					/>

					{/* Legend */}
					<Legend />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
};
export default StackedBarReChart;

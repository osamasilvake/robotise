import { Box } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { appSelector } from '../../../slices/app/App.slice';
import { AppThemePaletteTypeEnum } from '../../../slices/app/App.slice.enum';
import { StackedBarChartInterface } from './StackedBarChart.interface';
import { StackedBarChartStyle } from './StackedBarChart.style';

const StackedBarReChart: FC<StackedBarChartInterface> = (props) => {
	const { data, axisX, axisY1, axisY2 } = props;
	const styles = StackedBarChartStyle;

	const app = useSelector(appSelector);

	const isDark = app.themePalette === AppThemePaletteTypeEnum.DARK;
	const stackId = 'stacked';

	return (
		<Box style={styles.sBox}>
			<ResponsiveContainer>
				<BarChart data={data}>
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
					<Tooltip cursor={false} labelStyle={styles.sTooltipLabel} />

					{/* Bar */}
					<Bar style={styles.sBar1} dataKey={axisY1} stackId={stackId} />
					<Bar style={styles.sBar2} dataKey={axisY2} stackId={stackId} />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
};
export default StackedBarReChart;

import { Box } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { appSelector } from '../../../slices/app/App.slice';
import { AppThemePaletteTypeEnum } from '../../../slices/app/App.slice.enum';
import { BarChartInterface } from './BarChart.interface';
import { BarChartStyle } from './BarChart.style';

const BarReChart: FC<BarChartInterface> = (props) => {
	const { data, axisX, axisY } = props;
	const styles = BarChartStyle;

	const app = useSelector(appSelector);

	const isDark = app.themePalette === AppThemePaletteTypeEnum.DARK;
	const mapData = data.map((d) => ({ [axisX]: d.x, [axisY]: d.y }));

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
					<YAxis dataKey={axisY} style={isDark ? styles.sAxisLight : styles.sAxisDark} />
					<XAxis dataKey={axisX} style={isDark ? styles.sAxisLight : styles.sAxisDark} />

					{/* Tooltip */}
					<Tooltip cursor={false} labelStyle={styles.sTooltipLabel} />

					{/* Bar */}
					<Bar style={styles.sBar} dataKey={axisY} />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
};
export default BarReChart;

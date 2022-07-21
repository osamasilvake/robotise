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
import { BarChartInterface } from './BarChart.interface';
import { BarChartStyle } from './BarChart.style';

const BarReChart: FC<BarChartInterface> = (props) => {
	const { data, x, axisX, axisY } = props;
	const styles = BarChartStyle;

	const app = useSelector(appSelector);

	const isDark = app.themePalette === AppThemePaletteTypeEnum.DARK;
	const mapData = data.map((d) => ({
		[x]: d.x,
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
					<XAxis dataKey={axisX} style={isDark ? styles.sAxisLight : styles.sAxisDark} />

					{/* Tooltip */}
					<Tooltip
						cursor={false}
						labelFormatter={(t) => `${x}: ${dateFormat6(t)}`}
						labelStyle={styles.sTooltipLabel}
					/>

					{/* Bar */}
					<Bar fill={AppConfigService.AppOptions.colors.c10v1} dataKey={axisY} />

					{/* Legend */}
					<Legend />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
};
export default BarReChart;

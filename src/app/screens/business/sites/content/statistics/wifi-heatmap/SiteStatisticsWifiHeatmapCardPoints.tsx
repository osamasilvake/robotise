import { Box, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../services';
import { SiteStatisticsWifiHeatmapCardPointsInterface } from './SiteStatisticsWifiHeatmap.interface';
import { SiteStatisticsWifiHeatmapStyle } from './SiteStatisticsWifiHeatmap.style';

const SiteStatisticsWifiHeatmapCardPoints: FC<SiteStatisticsWifiHeatmapCardPointsInterface> = (
	props
) => {
	const { points } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteStatisticsWifiHeatmapStyle();

	const green = AppConfigService.AppOptions.colors.c10;
	const orange = AppConfigService.AppOptions.colors.c14;
	const red = AppConfigService.AppOptions.colors.c12;
	const translation = 'CONTENT.STATISTICS.WIFI_HEATMAP';

	return (
		<>
			{points.map((point, index) => (
				<Tooltip
					key={index}
					title={
						<Box>
							<Typography variant="body2">x: {point.oX.toFixed(2)}</Typography>
							<Typography variant="body2">y: {point.oY.toFixed(2)}</Typography>
							<Typography variant="body2">
								{t(`${translation}.STRENGTH`)}: {point.value}
							</Typography>
						</Box>
					}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className={classes.sRectangle}
						style={{
							bottom: point.y,
							left: point.x
						}}>
						<rect
							style={{
								width: 4,
								height: 4,
								fill: point.value >= 80 ? green : point.value >= 60 ? orange : red,
								fillOpacity: 0.8
							}}
						/>
					</svg>
				</Tooltip>
			))}
		</>
	);
};
export default SiteStatisticsWifiHeatmapCardPoints;

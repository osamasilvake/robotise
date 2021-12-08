import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import { AppConfigService } from '../../../../../../services';
import { SiteWifiHeatmapStyle } from './SiteWifiHeatmap.style';

const SiteWifiHeatmapCardLegend: FC = () => {
	const classes = SiteWifiHeatmapStyle();

	const green = AppConfigService.AppOptions.colors.c10;
	const orange = AppConfigService.AppOptions.colors.c14;
	const red = AppConfigService.AppOptions.colors.c12;

	return (
		<Stack spacing={1} direction="row" alignItems="center" className={classes.sLegend}>
			<Box>
				<Box className={classes.sColorBox} style={{ backgroundColor: red }} />
				<Box className={classes.sColorBox} style={{ backgroundColor: orange }} />
				<Box className={classes.sColorBox} style={{ backgroundColor: green }} />
			</Box>
			<Box>
				<Typography variant="body2">0-59</Typography>
				<Typography variant="body2">60-79</Typography>
				<Typography variant="body2">80-100</Typography>
			</Box>
		</Stack>
	);
};
export default SiteWifiHeatmapCardLegend;

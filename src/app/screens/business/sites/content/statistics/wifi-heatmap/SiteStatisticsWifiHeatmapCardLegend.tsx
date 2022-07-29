import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

import { AppConfigService } from '../../../../../../services';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { SiteStatisticsWifiHeatmapStyle } from './SiteStatisticsWifiHeatmap.style';

const SiteStatisticsWifiHeatmapCardLegend: FC = () => {
	const classes = SiteStatisticsWifiHeatmapStyle();
	const cardClasses = CardStyle();

	const green = AppConfigService.AppOptions.colors.c10;
	const orange = AppConfigService.AppOptions.colors.c14;
	const red = AppConfigService.AppOptions.colors.c12;

	return (
		<Card square elevation={1} className={clsx(classes.cCard, classes.sLegend)}>
			<CardContent className={cardClasses.sCardContent0}>
				<Stack spacing={1} direction="row" alignItems="center">
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
			</CardContent>
		</Card>
	);
};
export default SiteStatisticsWifiHeatmapCardLegend;

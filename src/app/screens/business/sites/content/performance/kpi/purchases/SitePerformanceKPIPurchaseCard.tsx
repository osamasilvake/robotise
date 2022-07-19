import { Box, Card, CardContent, Icon, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../../services';
import { SitePerformanceKPIInterface } from '../SitePerformanceKPI.interface';
import { SitePerformanceKPIStyle } from '../SitePerformanceKPI.style';

const SitePerformanceKPIPurchaseCard: FC<SitePerformanceKPIInterface> = (props) => {
	const { title, value, icon } = props;
	const { t } = useTranslation('DASHBOARD');
	const classes = SitePerformanceKPIStyle();

	return (
		<Card variant="elevation" square elevation={1}>
			<CardContent className={classes.sCardContent}>
				{/* Icon */}
				{icon && (
					<Box className={classes.sCardContentIcons}>
						<Icon>{icon}</Icon>
					</Box>
				)}

				{/* Title */}
				{title && (
					<Typography variant="subtitle2" color="textSecondary">
						{t(title)}
					</Typography>
				)}

				{/* Value */}
				<Typography variant="h4" textAlign="center" className={classes.sCardContentValue}>
					{value || AppConfigService.AppOptions.common.none}
				</Typography>

				{/* Sub Value */}
				<Stack
					spacing={0.25}
					direction="row"
					alignItems="center"
					justifyContent="space-between">
					<Typography variant="body2" color="textSecondary">
						Min: 200
					</Typography>

					{/* Sub Value */}
					<Typography variant="body2" color="textSecondary">
						Max: 400
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};
export default SitePerformanceKPIPurchaseCard;

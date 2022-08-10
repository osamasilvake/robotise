import { InfoOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Icon, Stack, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

import { AppConfigService } from '../../../../../../services';
import { SitePerformanceKPIInterface } from './SitePerformanceKPI.interface';
import { SitePerformanceKPIStyle } from './SitePerformanceKPI.style';

const SitePerformanceKPICard: FC<SitePerformanceKPIInterface> = (props) => {
	const { title, tooltip, value, icon, rotateIcon } = props;
	const classes = SitePerformanceKPIStyle();

	return (
		<Card variant="elevation" square elevation={1}>
			<CardContent className={classes.sCardContent}>
				{/* Icon */}
				{icon && (
					<Box className={classes.sCardContentIcon}>
						<Icon className={clsx({ [classes.sCardContentIconRotate]: !!rotateIcon })}>
							{icon}
						</Icon>
					</Box>
				)}

				{/* Title */}
				{title && (
					<Stack spacing={0.5} direction="row" alignItems="center">
						{/* Label */}
						<Typography variant="subtitle2" color="textSecondary">
							{title}
						</Typography>

						{/* Tooltip */}
						<Tooltip title={tooltip}>
							<InfoOutlined fontSize="small" />
						</Tooltip>
					</Stack>
				)}

				{/* Value */}
				<Typography variant="h2" textAlign="center" className={classes.sCardContentValue}>
					{value || AppConfigService.AppOptions.common.none}
				</Typography>
			</CardContent>
		</Card>
	);
};
export default SitePerformanceKPICard;

import { Box, Card, CardContent, Icon, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../services';
import { RobotDetailStateCardInterface } from './RobotDetailStates.interface';
import { RobotDetailStatesStyle } from './RobotDetailStates.style';

const RobotDetailStateCard: FC<RobotDetailStateCardInterface> = (props) => {
	const { title, item } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailStatesStyle();

	return (
		<Card variant="elevation" square elevation={1}>
			<CardContent className={clsx(classes.sCardContent)}>
				{/* Icon */}
				<Box className={classes.sCardContentIcons}>
					{item.icon && <Icon>{item.icon}</Icon>}
				</Box>

				{/* Title */}
				{title && item.title && (
					<Typography variant="subtitle2" color="textSecondary">
						{`${t(title)} ${t(item.title)}`}
					</Typography>
				)}

				{/* Value */}
				<Typography variant="h4" className={classes.sCardContentValue}>
					{t(`${item.value}`) || AppConfigService.AppOptions.common.none}
				</Typography>

				{/* Date */}
				{item.date && (
					<Typography variant="body2" color="textSecondary">
						{item.date}
					</Typography>
				)}
			</CardContent>
		</Card>
	);
};
export default RobotDetailStateCard;

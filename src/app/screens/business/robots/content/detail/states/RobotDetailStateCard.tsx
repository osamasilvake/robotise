import { Card, CardContent, Icon, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';

import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { RobotDetailStateCardInterface } from './RobotDetailStates.interface';
import { RobotDetailStatesStyle } from './RobotDetailStates.style';

const RobotDetailStateCard: FC<RobotDetailStateCardInterface> = (props) => {
	const { ...rest } = props;
	const cardClasses = CardStyle();
	const classes = RobotDetailStatesStyle();

	return (
		<Card variant="elevation" square elevation={1}>
			<CardContent className={clsx(cardClasses.sCardContent1, classes.sCardContent)}>
				{/* Icon */}
				{rest.icon && <Icon className={classes.sCardContentIcon}>{rest.icon}</Icon>}

				{/* Title */}
				{rest.title && (
					<Typography variant="subtitle2" color="textSecondary">
						{rest.title}
					</Typography>
				)}

				{/* Value */}
				<Typography variant="h3" className={classes.sCardContentValue}>
					{rest.value || 'null'}
				</Typography>

				{/* Date */}
				{rest.date && (
					<Typography variant="body2" color="textSecondary">
						{rest.date}
					</Typography>
				)}
			</CardContent>
		</Card>
	);
};
export default RobotDetailStateCard;

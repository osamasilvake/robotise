import { Card, CardContent, Icon, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotContentDetailStateCardInterface } from './RobotContentDetailStates.interface';
import { RobotContentDetailStatesStyles } from './RobotContentDetailStates.style';

const RobotContentDetailStateCard: FC<RobotContentDetailStateCardInterface> = (props) => {
	const { ...rest } = props;

	const { t } = useTranslation('ROBOTS');
	const robotContentDetailStatesClasses = RobotContentDetailStatesStyles();

	return (
		<Card variant="elevation" square elevation={1}>
			<CardContent className={robotContentDetailStatesClasses.sCardContent}>
				{rest.icon && (
					<Icon className={robotContentDetailStatesClasses.sCardContentIcon}>
						{rest.icon}
					</Icon>
				)}

				{rest.valueTop && (
					<Typography variant="subtitle2" color="textSecondary">
						{t(rest.valueTop)}
					</Typography>
				)}

				{rest.valueMiddle && (
					<Typography
						variant="h3"
						color="inherit"
						className={robotContentDetailStatesClasses.sCardContentValue}>
						{t(rest.valueMiddle)}
					</Typography>
				)}

				{rest.valueBottom && (
					<Typography variant="body2" color="textSecondary">
						{rest.valueBottom}
					</Typography>
				)}
			</CardContent>
		</Card>
	);
};
export default RobotContentDetailStateCard;

import { Card, CardContent, Icon, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotContentDetailStateItemInterface } from '../RobotContentDetail.interface';
import { RobotContentDetailStatesStyles } from './RobotContentDetailStates.style';

const RobotContentDetailStatesCard: FC<RobotContentDetailStateItemInterface> = (props) => {
	const { state } = props;

	const { t } = useTranslation('ROBOTS');
	const robotContentDetailStatesClasses = RobotContentDetailStatesStyles();

	return (
		<Card variant="elevation" square elevation={1}>
			<CardContent className={robotContentDetailStatesClasses.sStateCardContent}>
				{state && state.icon && (
					<Icon className={robotContentDetailStatesClasses.sStateCardContentIcon}>
						{state.icon}
					</Icon>
				)}

				{state && state.title && (
					<Typography variant="subtitle2" color="textSecondary">
						{t(state.title)}
					</Typography>
				)}

				{state && state.value && (
					<Typography
						variant="h3"
						color="inherit"
						className={robotContentDetailStatesClasses.sStateCardContentValue}>
						{t(state.value)}
					</Typography>
				)}

				{state && state.date && (
					<Typography variant="body2" color="textSecondary">
						{state.date}
					</Typography>
				)}
			</CardContent>
		</Card>
	);
};
export default RobotContentDetailStatesCard;

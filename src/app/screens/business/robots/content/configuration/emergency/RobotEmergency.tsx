import { Box, Card, CardContent, FormControlLabel, Switch, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { RobotParamsInterface } from '../../../Robot.interface';
import DialogEmergency from './DialogEmergency';
import { RobotEmergencyInterface } from './RobotEmergency.interface';
import { RobotEmergencyStyle } from './RobotEmergency.style';

const RobotEmergency: FC<RobotEmergencyInterface> = (props) => {
	const { robotTwinsSummary, robotOperations } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotEmergencyStyle();

	const [open, setOpen] = useState(false);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const cRobotId = params.robotId;
	const robotTwinsSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const emergencyState = !!robotTwinsSingle?.robotEmergencyState;

	const translation = 'CONTENT.CONFIGURATION.EMERGENCY';

	return (
		<Card square elevation={1} className={classes.sCard}>
			<CardContent>
				<Box>
					<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
					<Typography variant="body2" color="textSecondary">
						{t(`${translation}.EXCERPT`)}
					</Typography>
				</Box>

				<Box className={classes.sBox}>
					<FormControlLabel
						disabled={robotOperations.emergencyState.loading}
						control={<Switch checked={emergencyState} onChange={() => setOpen(true)} />}
						label={t<string>(`${translation}.ACTIVE`)}
					/>
				</Box>

				{/* Dialog: Emergency */}
				<DialogEmergency
					open={open}
					setOpen={setOpen}
					robotTwinsSummary={robotTwinsSummary}
					robotOperations={robotOperations}
				/>
			</CardContent>
		</Card>
	);
};
export default RobotEmergency;

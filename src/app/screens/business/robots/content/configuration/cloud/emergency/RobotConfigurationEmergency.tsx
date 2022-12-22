import { Box, Card, CardContent, FormControlLabel, Switch, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { RobotParamsInterface } from '../../../../Robot.interface';
import DialogEmergency from './DialogEmergency';
import { RobotConfigurationEmergencyInterface } from './RobotConfigurationEmergency.interface';
import { RobotConfigurationEmergencyStyle } from './RobotConfigurationEmergency.style';

const RobotConfigurationEmergency: FC<RobotConfigurationEmergencyInterface> = (props) => {
	const { robotTwinsSummary, robotCloudConfiguration } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotConfigurationEmergencyStyle();

	const [open, setOpen] = useState(false);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const cRobotId = params.robotId;
	const robotTwinsSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const emergencyState = !!robotTwinsSingle?.robotEmergencyState;

	const translation = 'CONTENT.CONFIGURATION.EMERGENCY';

	return (
		<Card
			square
			elevation={1}
			className={clsx(classes.sCard, { [classes.sCardActive]: emergencyState })}>
			<CardContent>
				<Box>
					<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
					<Typography variant="body2" color="textSecondary">
						{t(`${translation}.EXCERPT`)}
					</Typography>
				</Box>

				<Box className={classes.sBox}>
					<FormControlLabel
						disabled={robotCloudConfiguration.emergencyState.loading}
						control={<Switch checked={emergencyState} onChange={() => setOpen(true)} />}
						label={t<string>(`${translation}.ACTIVE`)}
					/>
				</Box>

				{/* Dialog: Emergency */}
				<DialogEmergency
					open={open}
					setOpen={setOpen}
					robotTwinsSummary={robotTwinsSummary}
					robotCloudConfiguration={robotCloudConfiguration}
				/>
			</CardContent>
		</Card>
	);
};
export default RobotConfigurationEmergency;

import { Box, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
	RobotDetailRemoteSafetyResetButtonTypeEnum,
	RobotDetailRemoteSafetyResetEventsTypeEnum
} from './RobotDetailRemoteSafetyReset.enum';
import { RobotDetailRemoteSafetyResetInterface } from './RobotDetailRemoteSafetyReset.interface';
import { RobotDetailRemoteSafetyResetStyle } from './RobotDetailRemoteSafetyReset.style';
import RemoteSafetyResetButton from './RobotDetailRemoteSafetyResetButton';

const RobotDetailRemoteSafetyReset: FC<RobotDetailRemoteSafetyResetInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailRemoteSafetyResetStyle();

	const [holdConfirm, setHoldConfirm] = useState(false);

	const translation = 'CONTENT.DETAIL.REMOTE_SAFETY_RESET';
	const stop0 = robotTwins.safetySystems?.properties.stop0ResetRequired;
	const stop1 = robotTwins.safetySystems?.properties.stop1ResetRequired;
	const remoteResetPermitted = robotTwins.safetySystems?.properties.remoteResetPermitted;
	const isRequired = (stop0 || stop1) && remoteResetPermitted;

	return (
		<Box className={classes.sBox}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sTitle}>
				{t(`${translation}.TITLE`)}
			</Typography>

			{/* Buttons */}
			<Stack spacing={0.75} direction="row" alignItems="center">
				{/* Hold */}
				<RemoteSafetyResetButton
					robotId={robotTwins.robot.id}
					buttonClass={RobotDetailRemoteSafetyResetButtonTypeEnum.HOLD}
					event={RobotDetailRemoteSafetyResetEventsTypeEnum.ARM}
					setHoldConfirm={setHoldConfirm}
					disabled={!isRequired}>
					{t(`${translation}.HOLD`)}
				</RemoteSafetyResetButton>

				{/* Press */}
				<RemoteSafetyResetButton
					robotId={robotTwins.robot.id}
					buttonClass={RobotDetailRemoteSafetyResetButtonTypeEnum.PRESS}
					event={RobotDetailRemoteSafetyResetEventsTypeEnum.CONFIRM}
					setHoldConfirm={setHoldConfirm}
					disabled={!holdConfirm}>
					{t(`${translation}.PRESS`)}
				</RemoteSafetyResetButton>
			</Stack>

			{/* Info */}
			<Typography variant="body2" color="textSecondary" className={classes.sInfo}>
				{!isRequired && t(`${translation}.ACTION_NOT_REQUIRED`)}
				{isRequired && t(`${translation}.ACTION_REQUIRED`)}
			</Typography>
		</Box>
	);
};
export default RobotDetailRemoteSafetyReset;

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
					setHoldConfirm={setHoldConfirm}>
					{t(`${translation}.HOLD`)}
				</RemoteSafetyResetButton>

				{/* Press */}
				<RemoteSafetyResetButton
					robotId={robotTwins.robot.id}
					buttonClass={RobotDetailRemoteSafetyResetButtonTypeEnum.PRESS}
					event={RobotDetailRemoteSafetyResetEventsTypeEnum.CONFIRM}
					holdConfirm={holdConfirm}
					setHoldConfirm={setHoldConfirm}
					disabled={!holdConfirm}>
					{t(`${translation}.PRESS`)}
				</RemoteSafetyResetButton>
			</Stack>

			{/* Info */}
			<Typography variant="body2" color="textSecondary" className={classes.sInfo}>
				{t(`${translation}.ACTION_NOT_REQUIRED`)}
			</Typography>
		</Box>
	);
};
export default RobotDetailRemoteSafetyReset;

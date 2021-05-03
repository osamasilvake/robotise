import { Box, Button, ButtonGroup, CircularProgress, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotDetailCommandMuteSensorsInterface } from './RobotDetailCommands.interface';
import { RobotDetailCommandsStyles } from './RobotDetailCommands.style';

const RobotDetailCommandMuteSensors: FC<RobotDetailCommandMuteSensorsInterface> = (props) => {
	const { state } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailCommandsStyles();

	const lMute = false;

	return (
		<Box>
			<Typography
				variant="subtitle2"
				color="textSecondary"
				className={classes.sCommandsMuteTitle}>
				{t('CONTENT.DETAIL.COMMANDS.MUTE.TITLE')}
			</Typography>
			<ButtonGroup color="primary" variant="outlined" disabled={!state.control}>
				<Button>{t('CONTENT.DETAIL.COMMANDS.MUTE.FRONT')}</Button>
				<Button>{t('CONTENT.DETAIL.COMMANDS.MUTE.BACK')}</Button>
				<Button endIcon={lMute && <CircularProgress size={20} />}>
					{t('CONTENT.DETAIL.COMMANDS.MUTE.UN_MUTE')}
				</Button>
			</ButtonGroup>
		</Box>
	);
};
export default RobotDetailCommandMuteSensors;

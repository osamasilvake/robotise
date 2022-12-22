import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../slices';
import { CloudConfigurationSetEmergencyState } from '../../../../../../../slices/business/robots/configuration/cloud/RobotCloudConfiguration.slice';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { DialogEmergencyInterface } from './RobotConfigurationEmergency.interface';
import { RobotConfigurationEmergencyStyle } from './RobotConfigurationEmergency.style';

const DialogEmergency: FC<DialogEmergencyInterface> = (props) => {
	const { open, setOpen, robotTwinsSummary, robotCloudConfiguration } = props;
	const { t } = useTranslation(['ROBOTS', 'DIALOG']);
	const classes = RobotConfigurationEmergencyStyle();

	const dispatch = useDispatch<AppDispatch>();

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const cRobotId = params.robotId;
	const robotTwinsSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const emergencyState = !!robotTwinsSingle?.robotEmergencyState;

	const translation = 'CONTENT.CONFIGURATION.EMERGENCY.MODAL';

	/**
	 * handle emergency state
	 */
	const handleEmergencyState = () => {
		if (!cRobotId) return;

		// dispatch: set emergency state
		dispatch(
			CloudConfigurationSetEmergencyState(cRobotId, !emergencyState, () => {
				// close dialog
				setOpen(false);
			})
		);
	};

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
			<DialogContent>
				<Typography>{t(`${translation}.TEXT`)}</Typography>
				{emergencyState && (
					<Typography variant="body2" color="textSecondary" className={classes.sNote}>
						{t(`${translation}.NOTE`)}
					</Typography>
				)}
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => setOpen(false)}>
					{t('DIALOG:BUTTONS.CANCEL')}
				</Button>
				<Button
					variant="outlined"
					onClick={handleEmergencyState}
					disabled={robotCloudConfiguration.emergencyState.loading}
					endIcon={
						robotCloudConfiguration.emergencyState.loading && (
							<CircularProgress size={20} />
						)
					}>
					{t('DIALOG:BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogEmergency;

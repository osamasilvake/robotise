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

import { AppDispatch } from '../../../../../../slices';
import { RobotSetEmergencyState } from '../../../../../../slices/business/robots/RobotOperations.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import { DialogEmergencyInterface } from './RobotEmergency.interface';
import { RobotEmergencyStyle } from './RobotEmergency.style';

const DialogEmergency: FC<DialogEmergencyInterface> = (props) => {
	const { open, setOpen, robotTwinsSummary, robotOperations } = props;
	const { t } = useTranslation(['ROBOTS', 'DIALOG']);
	const classes = RobotEmergencyStyle();

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
			RobotSetEmergencyState(cRobotId, !emergencyState, () => {
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
					disabled={robotOperations.emergencyState.loading}
					endIcon={
						robotOperations.emergencyState.loading && <CircularProgress size={20} />
					}>
					{t('DIALOG:BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogEmergency;

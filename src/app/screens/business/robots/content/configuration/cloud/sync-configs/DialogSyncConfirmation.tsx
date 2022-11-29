import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../slices';
import {
	robotOperationsSelector,
	RobotSyncConfigs
} from '../../../../../../../slices/business/robots/RobotOperations.slice';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { DialogSyncConfirmationInterface } from './RobotConfigurationSyncConfigs.interface';

const DialogSyncConfirmation: FC<DialogSyncConfirmationInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['ROBOTS', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const robotOperations = useSelector(robotOperationsSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const cRobotId = params.robotId;

	const translation = 'CONTENT.CONFIGURATION.SYNC_CONFIGS.CONFIRMATION';

	/**
	 * handle confirmation
	 */
	const handleConfirm = () => {
		// dispatch: sync configs of robot/site
		cRobotId &&
			dispatch(
				RobotSyncConfigs(cRobotId, open.type, () => {
					// set open
					setOpen({ ...open, status: false });
				})
			);
	};

	return (
		<Dialog open={open.status} onClose={() => setOpen({ ...open, status: false })}>
			<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
			<DialogContent>{t(`${translation}.TEXT`)}</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => setOpen({ ...open, status: false })}>
					{t('DIALOG:BUTTONS.CANCEL')}
				</Button>
				<Button
					variant="outlined"
					onClick={handleConfirm}
					disabled={robotOperations.syncConfigs.loading}
					endIcon={robotOperations.syncConfigs.loading && <CircularProgress size={20} />}>
					{t('DIALOG:BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogSyncConfirmation;

import { Elevator } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { elevatorCallsSelector } from '../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice';
import { timeout } from '../../../../../../utilities/methods/Timeout';
import DialogTestCallConfirmation from './DialogTestCallConfirmation';

const RobotElevatorCallsTest: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const elevatorCalls = useSelector(elevatorCallsSelector);

	const [open, setOpen] = useState(false);
	const [halt, setHalt] = useState(false);

	const translation = 'CONTENT.ELEVATOR_CALLS.LIST.ACTIONS.TEST_CALL';

	useEffect(() => {
		const timer = async () => await timeout(10000).then(() => setHalt(false));
		timer();
	}, [halt]);

	return (
		<>
			<Chip
				size="small"
				label={t(`${translation}.LABEL`)}
				color="primary"
				variant="outlined"
				clickable
				icon={<Elevator />}
				disabled={halt || elevatorCalls.updating}
				onClick={() => setOpen(true)}
			/>

			{/* Dialog: Test Call Confirmation */}
			{open && (
				<DialogTestCallConfirmation
					open={open}
					setOpen={setOpen}
					halt={halt}
					setHalt={setHalt}
				/>
			)}
		</>
	);
};
export default RobotElevatorCallsTest;

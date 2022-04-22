import { Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../slices';
import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector,
	RobotTwinsSummaryUpdateState
} from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { RTSContentStateInterface } from '../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

const RobotsSimulation: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch<AppDispatch>();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const simulation = !!robotTwinsSummary.content?.state?.simulation;

	/**
	 * handle simulation
	 */
	const handleSimulation = () => {
		// dispatch: update state
		const state: RTSContentStateInterface = {
			...robotTwinsSummary.content?.state,
			simulation: !simulation
		};
		dispatch(RobotTwinsSummaryUpdateState(state));

		// dispatch: fetch robot twins summary
		dispatch(RobotTwinsSummaryFetchList());
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					color="primary"
					name="simulation"
					checked={simulation}
					onChange={handleSimulation}
				/>
			}
			label={t<string>('LIST.ACTIONS.FILTERS.SIMULATION')}
		/>
	);
};
export default RobotsSimulation;

import { Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../slices';
import {
	allElevatorCallsSelector,
	AllElevatorCallsUpdateState
} from '../../../../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice';
import { AECStateInterface } from '../../../../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice.interface';
import { GeneralAllElevatorCallsIncludeAllCallsInterface } from './GeneralAllElevatorCallsActions.interface';

const GeneralAllElevatorCallsIncludeAllCalls: FC<
	GeneralAllElevatorCallsIncludeAllCallsInterface
> = (props) => {
	const { includeAllCalls } = props;
	const { t } = useTranslation('GENERAL');

	const dispatch = useDispatch<AppDispatch>();
	const allElevatorCalls = useSelector(allElevatorCallsSelector);

	/**
	 * handle include all calls
	 */
	const handleIncludeAllCalls = () => {
		// dispatch: update state
		const state: AECStateInterface = {
			...allElevatorCalls.content?.state,
			page: 0,
			includeAllCalls: !includeAllCalls
		};
		dispatch(AllElevatorCallsUpdateState(state));
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					color="primary"
					name="includeAllCalls"
					checked={includeAllCalls}
					onChange={handleIncludeAllCalls}
				/>
			}
			label={t<string>('COMMON.ELEVATOR_CALLS.LIST.ACTIONS.FILTERS.INCLUDE_ALL_CALLS')}
		/>
	);
};
export default GeneralAllElevatorCallsIncludeAllCalls;

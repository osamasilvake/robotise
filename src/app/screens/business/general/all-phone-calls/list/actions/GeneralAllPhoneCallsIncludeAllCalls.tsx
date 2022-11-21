import { Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../slices';
import {
	allPhoneCallsSelector,
	AllPhoneCallsUpdateState
} from '../../../../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice';
import { APCStateInterface } from '../../../../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice.interface';
import { GeneralAllPhoneCallsIncludeAllCallsInterface } from './GeneralAllPhoneCallsActions.interface';

const GeneralAllPhoneCallsIncludeAllCalls: FC<GeneralAllPhoneCallsIncludeAllCallsInterface> = (
	props
) => {
	const { includeAllCalls } = props;
	const { t } = useTranslation('GENERAL');

	const dispatch = useDispatch<AppDispatch>();
	const allPhoneCalls = useSelector(allPhoneCallsSelector);

	/**
	 * handle include all calls
	 */
	const handleIncludeAllCalls = () => {
		// dispatch: update state
		const state: APCStateInterface = {
			...allPhoneCalls.content?.state,
			page: 0,
			includeAllCalls: !includeAllCalls
		};
		dispatch(AllPhoneCallsUpdateState(state));
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
			label={t<string>('COMMON.PHONE_CALLS.LIST.ACTIONS.FILTERS.INCLUDE_ALL_CALLS')}
		/>
	);
};
export default GeneralAllPhoneCallsIncludeAllCalls;

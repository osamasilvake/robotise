import { Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../slices';
import {
	allSMSListSelector,
	AllSMSListUpdateState
} from '../../../../../../slices/business/general/all-sms-list/AllSMSList.slice';
import { ASLStateInterface } from '../../../../../../slices/business/general/all-sms-list/AllSMSList.slice.interface';
import { GeneralAllSMSListIncludeAllCallsInterface } from './GeneralAllSMSListActions.interface';

const GeneralAllSMSListIncludeAllCalls: FC<GeneralAllSMSListIncludeAllCallsInterface> = (props) => {
	const { includeAllCalls } = props;
	const { t } = useTranslation('GENERAL');

	const dispatch = useDispatch<AppDispatch>();
	const allSMSList = useSelector(allSMSListSelector);

	/**
	 * handle include all calls
	 */
	const handleIncludeAllCalls = () => {
		// dispatch: update state
		const state: ASLStateInterface = {
			...allSMSList.content?.state,
			page: 0,
			includeAllCalls: !includeAllCalls
		};
		dispatch(AllSMSListUpdateState(state));
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
			label={t<string>('COMMON.SMS_LIST.LIST.ACTIONS.FILTERS.INCLUDE_ALL_CALLS')}
		/>
	);
};
export default GeneralAllSMSListIncludeAllCalls;

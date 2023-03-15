import { Autocomplete, Box, ListItem, TextField } from '@mui/material';
import { FC, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../slices';
import {
	allElevatorCallsSelector,
	AllElevatorCallsUpdateState
} from '../../../../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice';
import { AECStateInterface } from '../../../../../../slices/business/general/all-elevator-calls/AllElevatorCalls.slice.interface';
import { strCapitalLetterAndCamelCaseToDash } from '../../../../../../utilities/methods/String';
import { GeneralAllElevatorCallsCallTypeEnum } from './GeneralAllElevatorCallsActions.enum';
import {
	GeneralAllElevatorCallsAutocompleteInterface,
	GeneralAllElevatorCallsCallTypeInterface
} from './GeneralAllElevatorCallsActions.interface';

const GeneralAllElevatorCallType: FC<GeneralAllElevatorCallsCallTypeInterface> = (props) => {
	const { callType } = props;
	const { t } = useTranslation('GENERAL');

	const dispatch = useDispatch<AppDispatch>();
	const allElevatorCalls = useSelector(allElevatorCallsSelector);

	const translation = 'COMMON.ELEVATOR_CALLS.LIST.ACTIONS.FILTERS';
	const callTypes = [
		{ id: '', label: t(`${translation}.CALL_TYPE.ALL_TYPES`) },
		...Object.values(GeneralAllElevatorCallsCallTypeEnum).map((item) => ({
			id: item,
			label: strCapitalLetterAndCamelCaseToDash(item)
		}))
	];

	/**
	 * handle site
	 * @param _event
	 * @param option
	 */
	const handleSite = (
		_event: SyntheticEvent,
		option: GeneralAllElevatorCallsAutocompleteInterface | null
	) => {
		// dispatch: update state
		const state: AECStateInterface = {
			...allElevatorCalls.content?.state,
			page: 0,
			callType: option?.id
		};
		dispatch(AllElevatorCallsUpdateState(state));
	};

	return callTypes.length ? (
		<Box>
			<Autocomplete
				disablePortal
				size="small"
				id="sites"
				options={callTypes}
				value={callTypes.find((t) => t.id === callType) || callTypes[0]}
				onChange={handleSite}
				renderOption={(props, option) => (
					<ListItem {...props} key={option.id}>
						{option.label}
					</ListItem>
				)}
				renderInput={(params) => (
					<TextField {...params} label={t(`${translation}.CALL_TYPE.LABEL`)} />
				)}
				sx={{ minWidth: 180 }}
			/>
		</Box>
	) : null;
};
export default GeneralAllElevatorCallType;

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
import { siteCloudConfigurationSelector } from '../../../../../../slices/business/sites/configuration/cloud/SiteCloudConfiguration.slice';
import {
	GeneralAllElevatorCallsAutocompleteInterface,
	GeneralAllElevatorCallsVendorInterface
} from './GeneralAllElevatorCallsActions.interface';

const GeneralAllElevatorVendor: FC<GeneralAllElevatorCallsVendorInterface> = (props) => {
	const { vendor } = props;
	const { t } = useTranslation('GENERAL');

	const dispatch = useDispatch<AppDispatch>();
	const allElevatorCalls = useSelector(allElevatorCallsSelector);
	const siteCloudConfiguration = useSelector(siteCloudConfigurationSelector);

	const translation = 'COMMON.ELEVATOR_CALLS.LIST.ACTIONS.FILTERS';
	const elevatorVendors = siteCloudConfiguration.elevatorVendors.content?.data || [];
	const vendors = [
		{ id: '', label: t(`${translation}.VENDOR.ALL_TYPES`) },
		...elevatorVendors.map((item) => ({ id: item.code, label: item.title }))
	];

	/**
	 * handle vendor
	 * @param _event
	 * @param option
	 */
	const handleVendor = (
		_event: SyntheticEvent,
		option: GeneralAllElevatorCallsAutocompleteInterface | null
	) => {
		// dispatch: update state
		const state: AECStateInterface = {
			...allElevatorCalls.content?.state,
			page: 0,
			vendor: option?.id
		};
		dispatch(AllElevatorCallsUpdateState(state));
	};

	return vendors.length ? (
		<Box>
			<Autocomplete
				disablePortal
				size="small"
				id="vendors"
				options={vendors}
				value={vendors.find((t) => t.id === vendor) || vendors[0]}
				onChange={handleVendor}
				renderOption={(props, option) => (
					<ListItem {...props} key={option.id}>
						{option.label}
					</ListItem>
				)}
				renderInput={(params) => (
					<TextField {...params} label={t(`${translation}.VENDOR.LABEL`)} />
				)}
				sx={{ minWidth: 180 }}
			/>
		</Box>
	) : null;
};
export default GeneralAllElevatorVendor;

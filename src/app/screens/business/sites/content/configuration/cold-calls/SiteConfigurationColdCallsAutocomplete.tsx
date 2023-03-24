import { Autocomplete, FormControl, TextField } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { roomsSelector } from '../../../../../../slices/business/sites/rooms/Rooms.slice';
import { SiteConfigurationColdCallsAutocompleteInterface } from './SiteConfigurationColdCalls.interface';
import { SiteConfigurationColdCallsStyle } from './SiteConfigurationColdCalls.style';

const SiteConfigurationColdCallsAutocomplete: FC<
	SiteConfigurationColdCallsAutocompleteInterface
> = (props) => {
	const { updateLocations, setUpdateLocations, handleBlur } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationColdCallsStyle();

	const rooms = useSelector(roomsSelector);

	const allRooms = rooms.content?.data || [];
	const options = allRooms.map((r) => ({ id: r.id, name: r.name }));
	const currentOptions = updateLocations.map((l) => options.find((o) => o?.id === l));

	const translation = 'CONTENT.CONFIGURATION.COLD_CALLS';
	const label = t(`${translation}.FORM.FIELDS.LOCATIONS.LABEL`);
	const placeholder = t(`${translation}.FORM.FIELDS.LOCATIONS.PLACEHOLDER`);

	return (
		<FormControl fullWidth className={classes.sFormControl}>
			<Autocomplete
				disablePortal
				multiple
				size="small"
				id="locations"
				options={options}
				getOptionLabel={(option) => option?.name || ''}
				isOptionEqualToValue={(option, value) => option?.id === value?.id}
				value={currentOptions}
				onChange={(_, values) => setUpdateLocations(values?.map((v) => v?.id || ''))}
				onBlur={handleBlur}
				renderInput={(params) => (
					<TextField {...params} label={label} placeholder={placeholder} />
				)}
			/>
		</FormControl>
	);
};
export default SiteConfigurationColdCallsAutocomplete;

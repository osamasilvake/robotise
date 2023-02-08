import { Autocomplete, FormControl, TextField } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { roomsSelector } from '../../../../../../slices/business/sites/rooms/Rooms.slice';
import { RoomsTypeEnum } from '../../../../../../slices/business/sites/rooms/Rooms.slice.enum';
import { SiteConfigurationColdCallsAutocompleteInterface } from './SiteConfigurationColdCalls.interface';
import { SiteConfigurationColdCallsStyle } from './SiteConfigurationColdCalls.style';

const SiteConfigurationColdCallsAutocomplete: FC<
	SiteConfigurationColdCallsAutocompleteInterface
> = (props) => {
	const { updateLocations, setUpdateLocations, handleBlur } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationColdCallsStyle();

	const rooms = useSelector(roomsSelector);

	const roomsGroupBy = rooms.content?.groupByType;
	const rLocations = roomsGroupBy?.find((r) => r.key === RoomsTypeEnum.ROOM)?.values || [];
	const options = rLocations?.map((r) => r.name);

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
				value={updateLocations}
				options={options}
				getOptionLabel={(option) => option}
				isOptionEqualToValue={(option, value) => option === value}
				onChange={(_, values) => setUpdateLocations(values)}
				onBlur={handleBlur}
				renderInput={(params) => (
					<TextField {...params} label={label} placeholder={placeholder} />
				)}
			/>
		</FormControl>
	);
};
export default SiteConfigurationColdCallsAutocomplete;

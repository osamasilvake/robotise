import { Autocomplete, FormControl, TextField } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { roomsSelector } from '../../../../../../slices/business/sites/rooms/Rooms.slice';
import { RoomsTypeEnum } from '../../../../../../slices/business/sites/rooms/Rooms.slice.enum';
import { SiteConfigurationMarketingRidesAutocompleteInterface } from './SiteConfigurationMarketingRides.interface';
import { SiteConfigurationMarketingRidesStyle } from './SiteConfigurationMarketingRides.style';

const SiteConfigurationMarketingRidesAutocomplete: FC<
	SiteConfigurationMarketingRidesAutocompleteInterface
> = (props) => {
	const { locations, handleChangeInputs, handleBlur, errors } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationMarketingRidesStyle();

	const rooms = useSelector(roomsSelector);

	const roomsGroupBy = rooms.content?.groupByType;
	const allRooms = roomsGroupBy?.find((r) => r.key === RoomsTypeEnum.ROOM)?.values || [];
	const options = allRooms?.map((r) => r.name);

	const translation = 'CONTENT.CONFIGURATION.MARKETING_RIDES';
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
				isOptionEqualToValue={(option, value) => option === value}
				value={locations}
				onChange={(_, values) => handleChangeInputs('locations', values)}
				onBlur={handleBlur}
				renderInput={(params) => (
					<TextField
						{...params}
						label={label}
						placeholder={placeholder}
						error={!!errors[0]}
						helperText={errors[0] && t(errors[0])}
					/>
				)}
			/>
		</FormControl>
	);
};
export default SiteConfigurationMarketingRidesAutocomplete;

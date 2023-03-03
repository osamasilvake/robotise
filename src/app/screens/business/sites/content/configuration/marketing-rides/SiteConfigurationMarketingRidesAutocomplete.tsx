import { Autocomplete, FormControl, ListItem, TextField } from '@mui/material';
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
	const rLocations = roomsGroupBy?.find((r) => r.key === RoomsTypeEnum.ROOM)?.values || [];
	const options = rLocations?.map((r) => ({ id: r.id, name: r.name }));
	const currentOptions = locations.map((l) => options.find((o) => o?.id === l));

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
				getOptionLabel={(option) => option?.name || ''}
				isOptionEqualToValue={(option, value) => option?.id === value?.id}
				value={currentOptions}
				onChange={(_, values) =>
					handleChangeInputs(
						'locations',
						values?.map((v) => v?.id || '')
					)
				}
				onBlur={handleBlur}
				renderOption={(props, option) => (
					<ListItem {...props} key={option?.id}>
						{option?.name}
					</ListItem>
				)}
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

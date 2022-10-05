import { Autocomplete, FormControl, TextField } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SiteConfigurationMarketingRidesAutocompleteInterface } from './SiteConfigurationMarketingRides.interface';

const SiteConfigurationMarketingRidesAutocomplete: FC<
	SiteConfigurationMarketingRidesAutocompleteInterface
> = (props) => {
	const { locations, handleChangeInputs, handleBlur, errors } = props;
	const { t } = useTranslation('SITES');

	const translation = 'CONTENT.CONFIGURATION.MARKETING_RIDES';
	const label = t(`${translation}.FORM.FIELDS.LOCATIONS.LABEL`);
	const placeholder = t(`${translation}.FORM.FIELDS.LOCATIONS.PLACEHOLDER`);

	const options = ['a', 'b', 'c'];

	return (
		<FormControl fullWidth margin="normal">
			<Autocomplete
				disablePortal
				multiple
				id="locations"
				options={options}
				value={locations || []}
				isOptionEqualToValue={(option, value) => option === value}
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

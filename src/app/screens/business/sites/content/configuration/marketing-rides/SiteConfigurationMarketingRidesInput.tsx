import { FormControl, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDebounce } from '../../../../../../utilities/hooks/debounce/Debounce';
import {
	SiteConfigurationMarketingRidesInputInterface,
	SiteConfigurationMarketingRidesTimesInterface
} from './SiteConfigurationMarketingRides.interface';

const SiteConfigurationMarketingRidesInput: FC<SiteConfigurationMarketingRidesInputInterface> = (
	props
) => {
	const { index, id, times, handleBlur, error, handleChangeInputsMultiple } = props;
	const { t } = useTranslation('SITES');

	const translation = 'CONTENT.CONFIGURATION.MARKETING_RIDES';
	const label = t(`${translation}.FORM.FIELDS.MINUTES.LABEL`);
	const placeholder = t(`${translation}.FORM.FIELDS.MINUTES.PLACEHOLDER`);

	const [time, setTime] = useState<SiteConfigurationMarketingRidesTimesInterface>(times[index]);
	const debouncedValue = useDebounce(time, 200);

	useEffect(() => {
		// return on same value
		if (time?.value === debouncedValue?.value) return;

		// handle change: inputs (multiple fields)
		handleChangeInputsMultiple(
			index,
			{
				target: {
					name: 'times',
					value: time
				}
			},
			times
		);
	}, [debouncedValue, index, time, times, handleChangeInputsMultiple]);

	return (
		<FormControl fullWidth>
			<TextField
				size="small"
				type="text"
				id={id}
				name="times"
				label={label}
				placeholder={placeholder}
				value={time?.value || ''}
				onChange={(e) => setTime({ id: index, value: e.target.value })}
				onBlur={handleBlur}
				error={!!error}
				helperText={error && t(error)}
			/>
		</FormControl>
	);
};
export default SiteConfigurationMarketingRidesInput;

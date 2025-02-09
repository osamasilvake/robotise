import { Box, FormControl, FormHelperText, TextField } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDebounce } from '../../../../../../utilities/hooks/debounce/Debounce';
import { strCapitalLetterAndCamelCaseToDash } from '../../../../../../utilities/methods/String';
import { SiteConfigurationSiteSectionInputInterface } from './SiteConfigurationSite.interface';
import { SiteConfigurationSiteStyle } from './SiteConfigurationSite.style';

const SiteConfigurationSiteSectionInput: FC<SiteConfigurationSiteSectionInputInterface> = (
	props
) => {
	const {
		multiline,
		id,
		label,
		content,
		handleChangeInput,
		handleBlur,
		initValue,
		value,
		error
	} = props;
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationSiteStyle();

	const touched = useRef(false);
	const inputValue = !touched.current ? initValue : value;
	const [elemValue, setElemValue] = useState(inputValue);
	const debouncedValue = useDebounce(elemValue, 200);

	const translation = 'CONTENT.CONFIGURATION.SITE';
	const required = !!content?.required;
	const type = content?.type as string;
	const labelTransform = strCapitalLetterAndCamelCaseToDash(label);
	const placeholder = t(`${translation}.FORM.FIELDS.PLACEHOLDER`, { value: labelTransform });
	const notes = content?.notes;

	useEffect(() => {
		// return on same value
		if (inputValue === debouncedValue) return;

		// update input
		handleChangeInput({ target: { name: id, value: debouncedValue } });
	}, [debouncedValue, handleChangeInput, inputValue, id]);

	return (
		<Box>
			<FormControl fullWidth className={classes.sInput} margin="normal">
				<TextField
					required={required}
					multiline={multiline}
					type={type}
					id={id}
					name={id}
					label={labelTransform}
					placeholder={placeholder}
					value={elemValue}
					rows={2}
					onChange={(e) => {
						setElemValue(e.target.value);
						touched.current = true;
					}}
					onBlur={handleBlur}
					error={required && !!error}
					helperText={required && error && t(error)}
				/>
			</FormControl>
			{notes && (
				<FormHelperText>
					<>{notes}</>
				</FormHelperText>
			)}
		</Box>
	);
};
export default SiteConfigurationSiteSectionInput;

import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { FC, useRef } from 'react';

import { strCapitalLetterAndCamelCaseToDash } from '../../../../../../utilities/methods/String';
import { SiteConfigurationSiteSectionSelectInterface } from './SiteConfigurationSite.interface';
import { SiteConfigurationSiteStyle } from './SiteConfigurationSite.style';

const SiteConfigurationSiteSectionSelect: FC<SiteConfigurationSiteSectionSelectInterface> = (
	props
) => {
	const { id, label, content, handleChangeSelect, initValue, value, choices } = props;
	const classes = SiteConfigurationSiteStyle();

	const touched = useRef(false);

	const required = !!content?.required;
	const type = content?.type as string;
	const labelTransform = strCapitalLetterAndCamelCaseToDash(label);
	const notes = content?.notes;

	return (
		<Box>
			<FormControl fullWidth className={classes.sSelect}>
				<InputLabel id={`label-${id}`}>{labelTransform}</InputLabel>
				<Select
					required={required}
					labelId={`label-${id}`}
					type={type}
					id={id}
					name={id}
					label={labelTransform}
					value={!touched.current ? initValue : value}
					onChange={(e) => {
						handleChangeSelect(e);
						touched.current = true;
					}}>
					{choices.map((choice) => (
						<MenuItem key={choice} value={choice}>
							{choice}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{notes && (
				<FormHelperText>
					<>{notes}</>
				</FormHelperText>
			)}
		</Box>
	);
};
export default SiteConfigurationSiteSectionSelect;

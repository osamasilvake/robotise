import { Box, Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { FC, useRef } from 'react';

import { strCapitalLetterAndCamelCaseToDash } from '../../../../../../utilities/methods/String';
import { SiteConfigurationSiteSectionBooleanInterface } from './SiteConfigurationSite.interface';

const SiteConfigurationSiteSectionBoolean: FC<SiteConfigurationSiteSectionBooleanInterface> = (
	props
) => {
	const { id, label, content, handleChangeCheckbox, initValue, value } = props;

	const touched = useRef(false);
	const notes = content?.notes;

	return (
		<Box>
			<FormControlLabel
				control={
					<Checkbox
						color="primary"
						name={id}
						checked={!touched.current ? initValue : value}
						onChange={(e) => {
							handleChangeCheckbox(e);
							touched.current = true;
						}}
					/>
				}
				label={strCapitalLetterAndCamelCaseToDash(label)}
			/>
			{notes && (
				<FormHelperText>
					<>{notes}</>
				</FormHelperText>
			)}
		</Box>
	);
};
export default SiteConfigurationSiteSectionBoolean;

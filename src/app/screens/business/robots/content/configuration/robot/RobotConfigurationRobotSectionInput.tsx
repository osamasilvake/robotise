import { Box, FormControl, FormHelperText, TextField } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDebounce } from '../../../../../../utilities/hooks/debounce/Debounce';
import { strCapitalLetterAndCamelCaseToDash } from '../../../../../../utilities/methods/String';
import { RobotConfigurationRobotFormInputInterface } from './RobotConfigurationRobot.interface';

const RobotConfigurationRobotSectionInput: FC<RobotConfigurationRobotFormInputInterface> = (
	props
) => {
	const { id, label, content, handleChangeInput, handleBlur, initValue, value, error } = props;
	const { t } = useTranslation('ROBOTS');

	const translation = 'CONTENT.CONFIGURATION.ROBOT_CONFIGURATION';
	const required = !!content?.required;
	const type = content?.type;
	const labelTransform = strCapitalLetterAndCamelCaseToDash(label);
	const placeholder = t(`${translation}.FORM.FIELD.PLACEHOLDER`, { value: labelTransform });
	const notes = content?.notes;

	const touched = useRef(false);
	const inputValue = !touched.current ? initValue : value;
	const [elemValue, setElemValue] = useState(inputValue);

	const debouncedValue = useDebounce(elemValue, 200);

	useEffect(() => {
		// return on same value
		if (inputValue === debouncedValue) return;

		// update input
		handleChangeInput({ target: { name: id, value: debouncedValue } });
	}, [debouncedValue, handleChangeInput, inputValue, id]);

	return (
		<Box>
			<FormControl fullWidth margin="normal">
				<TextField
					required={required}
					type={type}
					id={id}
					name={id}
					label={labelTransform}
					placeholder={placeholder}
					value={elemValue}
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
export default RobotConfigurationRobotSectionInput;

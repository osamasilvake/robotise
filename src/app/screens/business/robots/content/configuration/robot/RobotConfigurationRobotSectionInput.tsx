import { Box, FormControl, FormHelperText, TextField } from '@mui/material';
import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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
	const placeholder = t(`${translation}.FORM.FIELD.PLACEHOLDER`, {
		value: strCapitalLetterAndCamelCaseToDash(label)
	});
	const notes = content?.notes;
	const touched = useRef(false);

	return (
		<Box>
			<FormControl fullWidth margin="normal">
				<TextField
					required={required}
					type={type}
					id={id}
					name={id}
					label={strCapitalLetterAndCamelCaseToDash(label)}
					placeholder={placeholder}
					value={!touched.current ? initValue : value}
					onChange={(e) => {
						handleChangeInput(e);
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

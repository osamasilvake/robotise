import { Box, FormControl, FormHelperText, TextField } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { strCapitalLetterAndCamelCaseToDash } from '../../../../../../utilities/methods/String';
import { RobotConfigurationRobotFormInputInterface } from './RobotConfigurationRobot.interface';

const RobotConfigurationRobotSectionInput: FC<RobotConfigurationRobotFormInputInterface> = (
	props
) => {
	const { id, label, content, handleChangeInput, handleBlur, value } = props;
	const { t } = useTranslation('ROBOTS');

	const translation = 'CONTENT.CONFIGURATION.ROBOT_CONFIGURATION';
	const type = content?.type;
	const placeholder = t(`${translation}.FIELD.PLACEHOLDER`, { value: label });
	const notes = content?.notes;

	return (
		<Box>
			<FormControl fullWidth margin="normal">
				<TextField
					type={type}
					id={id}
					name={id}
					label={strCapitalLetterAndCamelCaseToDash(label)}
					placeholder={placeholder}
					value={value}
					onChange={handleChangeInput}
					onBlur={handleBlur}
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

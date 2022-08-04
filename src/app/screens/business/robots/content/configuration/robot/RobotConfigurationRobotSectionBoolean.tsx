import { Box, Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { FC, useRef } from 'react';

import { strCapitalLetterAndCamelCaseToDash } from '../../../../../../utilities/methods/String';
import { RobotConfigurationRobotFormBooleanInterface } from './RobotConfigurationRobot.interface';

const RobotConfigurationRobotSectionBoolean: FC<RobotConfigurationRobotFormBooleanInterface> = (
	props
) => {
	const { id, label, content, handleChangeCheckbox, initValue, value } = props;

	const notes = content?.notes;
	const touched = useRef(false);

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
export default RobotConfigurationRobotSectionBoolean;

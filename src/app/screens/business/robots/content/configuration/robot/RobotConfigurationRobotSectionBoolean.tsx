import { Box, Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { FC, useRef } from 'react';

import { pxToRem } from '../../../../../../utilities/methods/Number';
import { strCapitalLetterAndCamelCaseToDash } from '../../../../../../utilities/methods/String';
import { RobotConfigurationRobotSectionBooleanInterface } from './RobotConfigurationRobot.interface';

const RobotConfigurationRobotSectionBoolean: FC<RobotConfigurationRobotSectionBooleanInterface> = (
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
				<FormHelperText sx={{ margin: `${pxToRem(-4)} 0 ${pxToRem(2)}` }}>
					<>{notes}</>
				</FormHelperText>
			)}
		</Box>
	);
};
export default RobotConfigurationRobotSectionBoolean;

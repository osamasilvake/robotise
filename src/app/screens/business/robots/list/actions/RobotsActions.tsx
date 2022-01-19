import { Paper } from '@mui/material';
import { FC } from 'react';

import { FloatStyle } from '../../../../../utilities/styles/Float.style';
import RobotsHidden from './RobotsHidden';
import RobotsSimulation from './RobotsSimulation';

const RobotsActions: FC = () => {
	const floatStyle = FloatStyle();

	return (
		<Paper elevation={2} square className={floatStyle.sFloat1}>
			{/* Hidden */}
			<RobotsHidden />

			{/* Simulation */}
			<RobotsSimulation />
		</Paper>
	);
};
export default RobotsActions;

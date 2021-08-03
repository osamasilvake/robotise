import { Paper } from '@material-ui/core';
import { FC } from 'react';

import { FloatStyle } from '../../../../../utilities/styles/Float.style';
import RobotsHidden from './RobotsHidden';

const RobotsActions: FC = () => {
	const floatStyle = FloatStyle();

	return (
		<Paper elevation={2} square className={floatStyle.sFloat1}>
			{/* Hidden */}
			<RobotsHidden />
		</Paper>
	);
};
export default RobotsActions;

import { Paper } from '@mui/material';
import { FC } from 'react';

import { FloatStyle } from '../../../../../utilities/styles/Float.style';
import SitesHidden from './SitesHidden';

const SitesActions: FC = () => {
	const floatStyle = FloatStyle();

	return (
		<Paper elevation={2} square className={floatStyle.sFloat1}>
			{/* Hidden */}
			<SitesHidden />
		</Paper>
	);
};
export default SitesActions;

import { Box, Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyle } from '../../../../../utilities/styles/Float.style';
import RobotsHidden from './RobotsHidden';

const RobotsActions: FC = () => {
	const { t } = useTranslation('ROBOTS');
	const floatStyle = FloatStyle();

	return (
		<Paper elevation={2} square className={floatStyle.sFloat1}>
			<Box>
				{/* Heading */}
				<Typography variant="h6" color="textSecondary">
					{t('LIST.ACTIONS.HEADINGS.FILTERS')}
				</Typography>

				{/* Hidden */}
				<RobotsHidden />
			</Box>
		</Paper>
	);
};
export default RobotsActions;

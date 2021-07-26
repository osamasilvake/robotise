import { Box, Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyle } from '../../../../../utilities/styles/Float.style';
import { RobotsActionsInterface } from './RobotsActions.interface';
import RobotsHidden from './RobotsHidden';

const RobotsActions: FC<RobotsActionsInterface> = (props) => {
	const { hidden } = props;
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
				<RobotsHidden hidden={hidden} />
			</Box>
		</Paper>
	);
};
export default RobotsActions;

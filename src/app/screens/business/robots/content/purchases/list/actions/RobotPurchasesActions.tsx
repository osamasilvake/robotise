import { Box, Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyle } from '../../../../../../../utilities/styles/Float.style';
import { RobotPurchasesActionsInterface } from './RobotPurchasesActions.interface';
import RobotPurchasesBilled from './RobotPurchasesBilled';
import RobotPurchasesDebug from './RobotPurchasesDebug';

const RobotPurchasesActions: FC<RobotPurchasesActionsInterface> = (props) => {
	const { billed, debug } = props;
	const { t } = useTranslation('ROBOTS');
	const floatStyle = FloatStyle();

	return (
		<Paper elevation={2} square className={floatStyle.sFloat1}>
			<Box>
				{/* Heading */}
				<Typography variant="h6" color="textSecondary">
					{t('CONTENT.PURCHASES.LIST.ACTIONS.HEADINGS.FILTERS')}
				</Typography>

				{/* Billed */}
				<RobotPurchasesBilled billed={billed} />

				{/* Debug */}
				<RobotPurchasesDebug debug={debug} />
			</Box>
		</Paper>
	);
};
export default RobotPurchasesActions;

import { Box, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyles } from '../../../../../../../utilities/styles/Float.style';
import { RobotPurchasesActionsInterface } from './RobotPurchasesActions.interface';
import { RobotPurchasesActionsStyle } from './RobotPurchasesActions.style';
import RobotPurchasesBilled from './RobotPurchasesBilled';
import RobotPurchasesDebug from './RobotPurchasesDebug';

const RobotPurchasesActions: FC<RobotPurchasesActionsInterface> = (props) => {
	const { billed, debug, topSpace } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesActionsStyle();
	const floatStyles = FloatStyles();

	return (
		<Paper
			elevation={2}
			square
			className={clsx(floatStyles.sFloat1, {
				[classes.sFloatBoxTopSpace]: topSpace
			})}>
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

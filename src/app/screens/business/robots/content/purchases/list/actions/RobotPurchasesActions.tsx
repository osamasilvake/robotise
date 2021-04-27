import { Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyles } from '../../../../../../../utilities/styles/Float.style';
import { RobotPurchasesActionsInterface } from './RobotPurchasesActions.interface';
import RobotOrdersBilled from './RobotPurchasesBilled';

const RobotPurchasesActions: FC<RobotPurchasesActionsInterface> = (props) => {
	const { billed } = props;
	const { t } = useTranslation('ROBOTS');
	const floatStyles = FloatStyles();

	return (
		<Paper elevation={2} square className={floatStyles.sFloat1}>
			{/* Heading */}
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.PURCHASES.LIST.OPTIONS.HEADING')}
			</Typography>

			{/* Billed */}
			<RobotOrdersBilled billed={billed} />
		</Paper>
	);
};
export default RobotPurchasesActions;

import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotPurchaseFootInterface } from './RobotPurchaseFoot.interface';
import { RobotPurchaseFootStyle } from './RobotPurchaseFoot.style';

const RobotPurchaseFoot: FC<RobotPurchaseFootInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchaseFootStyle();

	return purchase?.content?.comment ? (
		<Box className={classes.sFootBox}>
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.PURCHASES.DETAIL.FOOT.NOTE')}
			</Typography>
			<Typography variant="body1">{purchase.content.comment}</Typography>
		</Box>
	) : null;
};
export default RobotPurchaseFoot;

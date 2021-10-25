import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotPurchaseFootInterface } from './RobotPurchaseFoot.interface';
import { RobotPurchaseFootStyle } from './RobotPurchaseFoot.style';

const RobotPurchaseFoot: FC<RobotPurchaseFootInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchaseFootStyle();

	const translation = 'CONTENT.PURCHASES.DETAIL.FOOT';

	return purchase?.content?.comment ? (
		<Box className={classes.sFootBox}>
			<Typography variant="h6" color="textSecondary">
				{t(`${translation}.NOTE`)}
			</Typography>
			<Typography>{purchase.content.comment}</Typography>
		</Box>
	) : null;
};
export default RobotPurchaseFoot;

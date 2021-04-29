import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotPurchaseDetailFootInterface } from '../RobotPurchaseDetail.interface';
import { RobotPurchaseDetailStyles } from '../RobotPurchaseDetail.style';

const RobotPurchaseDetailFoot: FC<RobotPurchaseDetailFootInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchaseDetailStyles();

	return purchase?.content?.comment ? (
		<Box className={classes.sFootBox}>
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.PURCHASES.CONTENT.FOOT.NOTE')}
			</Typography>
			<Typography variant="body1">{purchase.content.comment}</Typography>
		</Box>
	) : null;
};
export default RobotPurchaseDetailFoot;

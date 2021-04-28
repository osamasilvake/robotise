import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import { RobotPurchaseDetailHeadInterface } from '../RobotPurchaseDetail.interface';
import { RobotPurchaseDetailStyles } from '../RobotPurchaseDetail.style';

const RobotPurchaseDetailHead: FC<RobotPurchaseDetailHeadInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchaseDetailStyles();

	return (
		<Box className={classes.sHeadBox}>
			<Typography variant="body2" color="textSecondary" className={classes.sHeadBilled}>
				<Status active={purchase?.content?.isBilled} small>
					{purchase?.content?.isBilled
						? t('CONTENT.PURCHASES.CONTENT.HEAD.BILLED')
						: t('CONTENT.PURCHASES.CONTENT.HEAD.NOT_BILLED')}
				</Status>
			</Typography>
			<Typography variant="h6" color="textSecondary">
				{t(`CONTENT.PURCHASES.CONTENT.HEAD.TITLE`)}
			</Typography>
		</Box>
	);
};
export default RobotPurchaseDetailHead;

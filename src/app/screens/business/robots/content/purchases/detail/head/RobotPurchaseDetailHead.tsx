import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import { StatusTypeEnum } from '../../../../../../../components/common/status/Status.enum';
import { RobotPurchaseDetailHeadInterface } from './RobotPurchaseDetailHead.interface';
import { RobotPurchaseDetailHeadStyles } from './RobotPurchaseDetailHead.style';

const RobotPurchaseDetailHead: FC<RobotPurchaseDetailHeadInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchaseDetailHeadStyles();

	return (
		<Box className={classes.sHeadBox}>
			<Typography variant="body2" color="textSecondary" className={classes.sHeadBilled}>
				<Status
					level={
						purchase?.content?.isBilled
							? StatusTypeEnum.SUCCESS_DARK
							: StatusTypeEnum.INFO
					}
					small>
					{purchase?.content?.isBilled
						? t('CONTENT.PURCHASES.CONTENT.HEAD.BILLED')
						: t('CONTENT.PURCHASES.CONTENT.HEAD.UN_BILLED')}
				</Status>
			</Typography>
			<Typography variant="h6" color="textSecondary">
				{t(`CONTENT.PURCHASES.CONTENT.HEAD.TITLE`)}
			</Typography>
		</Box>
	);
};
export default RobotPurchaseDetailHead;

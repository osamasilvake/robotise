import { Box, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { RobotOrderPurchaseDetailInterface } from './RobotOrderPurchaseDetail.interface';
import { RobotOrderPurchaseDetailStyle } from './RobotOrderPurchaseDetail.style';

const RobotOrderPurchaseDetail: FC<RobotOrderPurchaseDetailInterface> = (props) => {
	const { order } = props;
	const { t } = useTranslation('GENERAL');
	const classes = RobotOrderPurchaseDetailStyle();

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const cRobotId = params.robotId;

	return order?.content?.orderReport ? (
		<Box className={classes.sBox}>
			<Typography variant="h6" color="textSecondary">
				{t('COMMON.ORDERS.DETAIL.PURCHASE_DETAIL.LINK.TITLE')}
			</Typography>
			<Link
				component={RouterLink}
				variant="body2"
				underline="hover"
				to={AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.DETAIL.replace(
					':robotId',
					cRobotId
				).replace(':purchaseId', order.content.orderReport.id)}>
				{t('COMMON.ORDERS.DETAIL.PURCHASE_DETAIL.LINK.TEXT')}
			</Link>
		</Box>
	) : null;
};
export default RobotOrderPurchaseDetail;

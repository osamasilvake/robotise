import { Box, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import { GeneralAllOrderPurchaseDetailInterface } from './GeneralAllOrderPurchaseDetail.interface';
import { GeneralAllOrderPurchaseDetailStyle } from './GeneralAllOrderPurchaseDetail.style';

const GeneralAllOrderPurchaseDetail: FC<GeneralAllOrderPurchaseDetailInterface> = (props) => {
	const { order } = props;
	const { t } = useTranslation('GENERAL');
	const classes = GeneralAllOrderPurchaseDetailStyle();

	const cRobotId = order?.content?.robot.id || '';

	return order?.content?.orderReport ? (
		<Box className={classes.sBox}>
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.ALL_ORDERS.DETAIL.PURCHASE_DETAIL.LINK.TITLE')}
			</Typography>
			<Link
				component={RouterLink}
				variant="body2"
				underline="hover"
				to={AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.DETAIL.replace(
					':robotId',
					cRobotId
				).replace(':purchaseId', order.content.orderReport.id)}>
				{t('CONTENT.ALL_ORDERS.DETAIL.PURCHASE_DETAIL.LINK.TEXT')}
			</Link>
		</Box>
	) : null;
};
export default GeneralAllOrderPurchaseDetail;

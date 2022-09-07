import { Box, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { AppConfigService } from '../../../../../../services';
import { GeneralAllOrderFootInterface } from './GeneralAllOrderFoot.interface';
import { GeneralAllOrderFootStyle } from './GeneralAllOrderFoot.style';

const GeneralAllOrderFoot: FC<GeneralAllOrderFootInterface> = (props) => {
	const { order } = props;
	const { t } = useTranslation('GENERAL');
	const classes = GeneralAllOrderFootStyle();

	const cRobotId = order?.content?.robot.id || '';

	return order?.content?.orderReport ? (
		<Box className={classes.sFootBox}>
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.ALL_ORDERS.DETAIL.FOOT.PURCHASE.LINK.TITLE')}
			</Typography>
			<Link
				component={RouterLink}
				variant="body2"
				underline="hover"
				to={AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.DETAIL.replace(
					':robotId',
					cRobotId
				).replace(':purchaseId', order.content.orderReport.id)}>
				{t('CONTENT.ALL_ORDERS.DETAIL.FOOT.PURCHASE.LINK.TEXT')}
			</Link>
		</Box>
	) : null;
};
export default GeneralAllOrderFoot;

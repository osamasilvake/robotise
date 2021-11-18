import { Box, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { RobotOrderFootInterface } from './RobotOrderFoot.interface';
import { RobotOrderFootStyle } from './RobotOrderFoot.style';

const RobotOrderFoot: FC<RobotOrderFootInterface> = (props) => {
	const { order } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrderFootStyle();

	const params = useParams() as RobotParamsInterface;

	const cRobotId = params.robotId;

	return order?.content?.orderReport ? (
		<Box className={classes.sFootBox}>
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.ORDERS.DETAIL.FOOT.PURCHASE.LINK.TITLE')}
			</Typography>
			<Link
				component={RouterLink}
				variant="body2"
				underline="hover"
				to={AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.DETAIL.replace(
					':robotId',
					cRobotId
				).replace(':purchaseId', order.content.orderReport.id)}>
				{t('CONTENT.ORDERS.DETAIL.FOOT.PURCHASE.LINK.TEXT')}
			</Link>
		</Box>
	) : null;
};
export default RobotOrderFoot;

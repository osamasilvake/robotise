import { Box, Link, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { RobotOrderFootInterface } from './RobotOrderFoot.interface';
import { RobotOrderFootStyle } from './RobotOrderFoot.style';

const RobotOrderFoot: FC<RobotOrderFootInterface> = (props) => {
	const { order } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrderFootStyle();

	const params: RobotParamsInterface = useParams();
	const history = useHistory();

	const cRobotId = params.robotId;

	/**
	 * handle show purchase detail
	 * @param purchaseId
	 * @returns
	 */
	const handleShowPurchaseDetail = (purchaseId: string) => () => {
		// prepare link
		const url = AppConfigService.AppRoutes.SCREENS.BUSINESS.ROBOTS.PURCHASES.DETAIL;
		const robotLink = url.replace(':robotId', cRobotId).replace(':purchaseId', purchaseId);

		// push to history
		history.push(robotLink);
	};

	return order?.content?.orderReport ? (
		<Box className={classes.sLinkTitle}>
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.ORDERS.DETAIL.FOOT.PURCHASE.LINK.TITLE')}
			</Typography>
			<Link
				component="button"
				variant="body1"
				underline="hover"
				onClick={handleShowPurchaseDetail(order.content.orderReport.id)}>
				{t('CONTENT.ORDERS.DETAIL.FOOT.PURCHASE.LINK.TEXT')}
			</Link>
		</Box>
	) : null;
};
export default RobotOrderFoot;

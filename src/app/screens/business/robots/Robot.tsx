import { Paper } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageHead from '../../../components/content/page-head/PageHead';
import { AppConfigService } from '../../../services';
import { orderSelector } from '../../../slices/business/robots/orders/Order.slice';
import { purchaseSelector } from '../../../slices/business/robots/purchases/Purchase.slice';
import { robotTwinsSummarySelector } from '../../../slices/business/robots/RobotTwinsSummary.slice';
import RobotOrderDetail from './content/orders/detail/RobotOrderDetail';
import RobotPurchaseDetail from './content/purchases/detail/RobotPurchaseDetail';
import RobotContent from './content/RobotContent';
import { RobotParamsInterface } from './Robot.interface';

const Robot: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const order = useSelector(orderSelector);
	const purchase = useSelector(purchaseSelector);

	const params = useParams() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const cRobotName = robotTwinsSummary.content?.dataById[cRobotId]?.robotTitle;
	const cOrderTarget = order.content?.location || undefined;
	const cPurchaseTarget = purchase.content?.location || undefined;

	const orderDefault = t('CONTENT.ORDERS.LIST.TABLE.VALUES.TARGET.RECEPTION');
	const dots = AppConfigService.AppOptions.common.dots;

	/**
	 * create breadcrumb labels
	 * @returns
	 */
	const breadcrumbLabels = () =>
		Object.keys(params).map((key) => {
			if (key === 'robotId') {
				return !robotTwinsSummary.loader ? cRobotName || dots : dots;
			} else if (key === 'orderId') {
				return !order.loader ? cOrderTarget || orderDefault : dots;
			}
			return !purchase.loader ? cPurchaseTarget || dots : dots;
		});

	/**
	 * robot detail routes
	 * @returns
	 */
	const robotDetailRoutes = () => {
		if (params.orderId) {
			return <RobotOrderDetail />;
		} else if (params.purchaseId) {
			return <RobotPurchaseDetail />;
		}
		return <RobotContent />;
	};

	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead
				title="ROBOTS.ROBOT.TITLE"
				description="ROBOTS.ROBOT.DESCRIPTION"
				labels={breadcrumbLabels()}
			/>

			{/* Content */}
			{robotDetailRoutes()}
		</Paper>
	);
};
export default Robot;

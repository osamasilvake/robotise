import { Paper } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageHead from '../../../components/content/page-head/PageHead';
import { AppConfigService } from '../../../services';
import { orderSelector } from '../../../slices/orders/Order.slice';
import { purchaseSelector } from '../../../slices/purchases/Purchase.slice';
import { robotTwinsSummarySelector } from '../../../slices/robots/RobotTwinsSummary.slice';
import RobotOrderDetail from './content/orders/detail/RobotOrderDetail';
import RobotPurchaseDetail from './content/purchases/detail/RobotPurchaseDetail';
import RobotContent from './content/RobotContent';
import { RobotParamsInterface } from './Robot.interface';

const Robot: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const order = useSelector(orderSelector);
	const purchase = useSelector(purchaseSelector);

	const params: RobotParamsInterface = useParams();

	const cRobotName = robotTwinsSummary.content?.dataById[params.robotId]?.robotTitle;
	const cOrderTarget = order.content?.location || undefined;
	const cPurchaseTarget = purchase.content?.location || undefined;

	const orderDefault = t('CONTENT.ORDERS.LIST.TABLE.VALUES.TARGET.RECEPTION');
	const none = AppConfigService.AppOptions.common.none;

	/**
	 * switch detail page
	 * @returns
	 */
	const switchDetailRoute = () => {
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
				labels={{
					robotName: !robotTwinsSummary.loader ? cRobotName : '',
					orderTarget: !order.loader ? cOrderTarget || orderDefault : '',
					purchaseTarget: !purchase.loader ? cPurchaseTarget || none : ''
				}}
			/>

			{/* Content */}
			{switchDetailRoute()}
		</Paper>
	);
};
export default Robot;

import { Paper } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageHead from '../../../components/content/page-head/PageHead';
import { orderSelector } from '../../../slices/orders/Order.slice';
import { purchaseSelector } from '../../../slices/purchases/Purchase.slice';
import { robotTwinsSummarySelector } from '../../../slices/robot-twins/RobotTwinsSummary.slice';
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

	const cRobotName = robotTwinsSummary.content?.dataById[params.robot]?.robot.name;
	const cOrderRoom = order.content?.room || undefined;
	const cPurchaseRoom = purchase.content?.room || undefined;

	/**
	 * switch detail page
	 * @returns
	 */
	const switchDetailRoute = () => {
		if (params.order) {
			return <RobotOrderDetail />;
		} else if (params.purchase) {
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
					orderRoom: !order.loader
						? cOrderRoom || t('CONTENT.ORDERS.LIST.TABLE.VALUES.TARGET.RECEPTION')
						: '',
					purchaseRoom: !purchase.loader
						? cPurchaseRoom || t('CONTENT.PURCHASES.CONTENT.ROOM_UNKNOWN')
						: ''
				}}
			/>

			{/* Content */}
			{switchDetailRoute()}
		</Paper>
	);
};
export default Robot;

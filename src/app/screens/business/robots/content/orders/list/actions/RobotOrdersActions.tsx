import { Box, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/core';
import { SettingsOutlined } from '@material-ui/icons';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Report from '../../../../../../../components/common/report/Report';
import { ReportTypeEnum } from '../../../../../../../components/common/report/Report.enum';
import {
	RobotGenerateReports,
	robotSelector
} from '../../../../../../../slices/business/robots/Robot.slice';
import { FloatStyle } from '../../../../../../../utilities/styles/Float.style';
import { RobotParamsInterface } from '../../../../Robot.interface';
import DialogCreateOrder from './DialogCreateOrder';
import { RobotOrdersActionsSpeedDialTypeEnum } from './RobotOrdersActions.enum';
import { RobotOrdersActionsInterface } from './RobotOrdersActions.interface';
import { orderActions } from './RobotOrdersActions.map';
import { RobotOrdersActionsStyle } from './RobotOrdersActions.style';
import RobotOrdersActiveOrders from './RobotOrdersActiveOrders';
import RobotOrdersDebug from './RobotOrdersDebug';

const RobotOrdersActions: FC<RobotOrdersActionsInterface> = (props) => {
	const { activeOrders, debug } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotOrdersActionsStyle();
	const floatStyle = FloatStyle();

	const robot = useSelector(robotSelector);

	const [createOrder, setCreateOrder] = useState(false);
	const [ordersReport, setOrdersReport] = useState(false);

	const params: RobotParamsInterface = useParams();

	/**
	 * handle speed dial actions
	 * @param operation
	 * @returns
	 */
	const handleActions = (operation: RobotOrdersActionsSpeedDialTypeEnum) => () => {
		if (operation === RobotOrdersActionsSpeedDialTypeEnum.CREATE_ORDER) {
			setCreateOrder(true);
		} else if (operation === RobotOrdersActionsSpeedDialTypeEnum.ORDERS_REPORT) {
			setOrdersReport(true);
		}
	};

	return (
		<>
			{/* Filters */}
			<Paper elevation={2} square className={floatStyle.sFloat1}>
				<Box>
					{/* Active Orders */}
					<RobotOrdersActiveOrders activeOrders={activeOrders} />

					{/* Debug */}
					<RobotOrdersDebug debug={debug} />
				</Box>
			</Paper>

			{/* Speed Dial */}
			<SpeedDial
				ariaLabel="speed-dial-products"
				className={classes.sSpeedDial}
				icon={
					<SpeedDialIcon icon={<SettingsOutlined />} className={classes.sSpeedDialIcon} />
				}>
				{orderActions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={t(action.name)}
						onClick={handleActions(action.operation)}
					/>
				))}
			</SpeedDial>

			{/* Dialog: Create Order */}
			<DialogCreateOrder open={createOrder} setOpen={setCreateOrder} />

			{/* Dialog: Report */}
			<Report
				id={ReportTypeEnum.ORDERS}
				open={ordersReport}
				setOpen={setOrdersReport}
				filterId={params.robotId}
				state={robot.reports}
				GenerateReports={RobotGenerateReports}
			/>
		</>
	);
};
export default RobotOrdersActions;

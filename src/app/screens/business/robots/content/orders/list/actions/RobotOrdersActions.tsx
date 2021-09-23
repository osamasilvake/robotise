import { SettingsOutlined } from '@mui/icons-material';
import { Box, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyle } from '../../../../../../../utilities/styles/Float.style';
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

	const [createOrder, setCreateOrder] = useState(false);

	/**
	 * handle speed dial actions
	 * @param operation
	 * @returns
	 */
	const handleActions = (operation: RobotOrdersActionsSpeedDialTypeEnum) => () => {
		if (operation === RobotOrdersActionsSpeedDialTypeEnum.CREATE_ORDER) {
			setCreateOrder(true);
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
		</>
	);
};
export default RobotOrdersActions;

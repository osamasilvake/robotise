import { Add } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { TriggerMessageTypeEnum } from '../../../../../../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../../../../../../components/frame/message/Message.interface';
import { AppDispatch } from '../../../../../../../slices';
import { AppTriggerMessage } from '../../../../../../../slices/app/App.slice';
import { robotTwinsSummarySelector } from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { RobotParamsInterface } from '../../../../Robot.interface';
import DialogCreateOrder from './DialogCreateOrder';

const RobotOrdersCreate: FC = () => {
	const { t } = useTranslation('GENERAL');

	const dispatch = useDispatch<AppDispatch>();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const [createOrder, setCreateOrder] = useState(false);
	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const isRobotAssignedToSite = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;
	const translation = 'COMMON.ORDERS.LIST.ACTIONS.CREATE';

	/**
	 * handle create order
	 */
	const handleCreateOrder = () => {
		if (isRobotAssignedToSite) {
			// set create order
			setCreateOrder(true);
		} else {
			// dispatch: trigger message
			const message: TriggerMessageInterface = {
				id: 'robot-assign-to-site',
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'GENERAL.COMMON.ROBOT_NOT_ASSIGNED_TO_SITE'
			};
			dispatch(AppTriggerMessage(message));
		}
	};

	return (
		<>
			<Chip
				size="small"
				icon={<Add />}
				label={t(`${translation}.LABEL`)}
				color="primary"
				variant="outlined"
				clickable
				onClick={handleCreateOrder}
			/>

			{/* Dialog: Create Order */}
			{createOrder && <DialogCreateOrder open={createOrder} setOpen={setCreateOrder} />}
		</>
	);
};
export default RobotOrdersCreate;

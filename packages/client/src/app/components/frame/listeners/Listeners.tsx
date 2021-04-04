import { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { GeneralTriggerMessage } from '../../../slices/general/General.slice';
import { useNetwork } from '../../../utilities/hooks/network/UseNetwork';
import { TriggerMessageTypeEnum } from '../message/Message.enum';
import { TriggerMessageInterface } from '../message/Message.interface';

const Listeners: FC = () => {
	const dispatch = useDispatch();

	const networkRef = useRef(false);
	const network = useNetwork();

	useEffect(() => {
		// dispatch: trigger message
		const message: TriggerMessageInterface = {
			id: network ? 'network-on' : 'network-off',
			show: true,
			severity: network ? TriggerMessageTypeEnum.SUCCESS : TriggerMessageTypeEnum.ERROR,
			text: network ? 'COMMON.NETWORK.ONLINE' : 'COMMON.NETWORK.OFFLINE'
		};
		networkRef.current && dispatch(GeneralTriggerMessage(message));
		networkRef.current = true;
	}, [dispatch, network]);

	return null;
};
export default Listeners;

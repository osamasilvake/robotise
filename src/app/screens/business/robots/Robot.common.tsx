import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../slices';
import { robotTwinsSummarySelector } from '../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	RoomsLocationsFetch,
	roomsSelector
} from '../../../slices/business/sites/rooms/Rooms.slice';
import { RobotCommonInterface, RobotParamsInterface } from './Robot.interface';

const RobotCommon: FC<RobotCommonInterface> = (props) => {
	const { children } = props;

	const dispatch = useDispatch<AppDispatch>();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const rooms = useSelector(roomsSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const robotSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const cSiteId = robotSingle?.siteId;
	const pRoomsSiteId = rooms.content?.state?.pSiteId;

	useEffect(() => {
		const condition1 = rooms.content === null;
		const condition2 = !!(rooms.content !== null && pRoomsSiteId && pRoomsSiteId !== cSiteId);

		if (condition1 || condition2) {
			// dispatch: fetch locations
			cSiteId && dispatch(RoomsLocationsFetch(cSiteId));
		}
	}, [dispatch, cSiteId, pRoomsSiteId, rooms.content]);

	return <>{children}</>;
};
export default RobotCommon;

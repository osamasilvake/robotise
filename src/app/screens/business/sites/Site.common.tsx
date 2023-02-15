import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../slices';
import { FloorsFetch } from '../../../slices/business/sites/floors/Floors.slice';
import {
	RoomsLocationsFetch,
	roomsSelector
} from '../../../slices/business/sites/rooms/Rooms.slice';
import { SiteCommonInterface, SiteParamsInterface } from './Site.interface';

const SiteCommon: FC<SiteCommonInterface> = (props) => {
	const { children } = props;

	const dispatch = useDispatch<AppDispatch>();
	const rooms = useSelector(roomsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const pRoomsSiteId = rooms.content?.state?.pSiteId;

	useEffect(() => {
		const condition1 = rooms.content === null;
		const condition2 = !!(rooms.content !== null && pRoomsSiteId && pRoomsSiteId !== cSiteId);

		if (condition1 || condition2) {
			// dispatch: fetch floors
			cSiteId && dispatch(FloorsFetch(cSiteId));

			// dispatch: fetch locations
			cSiteId && dispatch(RoomsLocationsFetch(cSiteId));
		}
	}, [dispatch, cSiteId, pRoomsSiteId, rooms.content]);

	return <>{children}</>;
};
export default SiteCommon;

import { Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	roomsSelector,
	RoomsUpdateState
} from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import { SRCStateInterface } from '../../../../../../../slices/business/sites/rooms/Rooms.slice.interface';
import { sitesSelector } from '../../../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../../../Site.interface';
import { SiteRoomsInactiveRoomsInterface } from './SiteRoomsActions.interface';

const SiteRoomsInactiveRooms: FC<SiteRoomsInactiveRoomsInterface> = (props) => {
	const { inactive } = props;
	const { t } = useTranslation('SITES');

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const rooms = useSelector(roomsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];

	/**
	 * handle room state
	 */
	const handleRoomState = () => {
		// return on empty
		if (!rooms.content?.state) return;

		// dispatch: update state
		const state: SRCStateInterface = {
			...rooms.content.state,
			inactive: !inactive
		};
		dispatch(RoomsUpdateState(siteSingle?.id, state));
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					color="primary"
					name="activeOrders"
					checked={inactive}
					onChange={handleRoomState}
				/>
			}
			label={t<string>('CONTENT.ROOMS.LIST.ACTIONS.INACTIVE.LABEL')}
		/>
	);
};
export default SiteRoomsInactiveRooms;

import { Checkbox, FormControlLabel } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { roomsSelector, RoomUpdateFilters } from '../../../../../../../slices/rooms/Rooms.slice';
import { sitesSelector } from '../../../../../../../slices/sites/Sites.slice';
import { SiteParamsInterface } from '../../../../Site.interface';
import {
	SiteRoomsActionsFiltersPayloadInterface,
	SiteRoomsInactiveRoomsInterface
} from './SiteRoomsActions.interface';

const SiteRoomsInactiveRooms: FC<SiteRoomsInactiveRoomsInterface> = (props) => {
	const { inactive } = props;
	const { t } = useTranslation('SITES');

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const rooms = useSelector(roomsSelector);

	const params: SiteParamsInterface = useParams();
	const siteSingle = sites.content?.dataById[params.siteId];

	/**
	 * toggle room state
	 */
	const toggleRoomState = () => {
		// dispatch: update rooms filters
		const filters: SiteRoomsActionsFiltersPayloadInterface = {
			...rooms.content?.filters,
			inactive: !inactive
		};
		dispatch(RoomUpdateFilters(siteSingle?.id, filters));
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					color="primary"
					name="activeOrders"
					checked={inactive}
					onChange={toggleRoomState}
				/>
			}
			label={t('CONTENT.ROOMS.LIST.ACTIONS.INACTIVE.LABEL')}
		/>
	);
};
export default SiteRoomsInactiveRooms;

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
	SiteRoomsActiveRoomsInterface
} from './SiteRoomsActions.interface';

const SiteRoomsActiveRooms: FC<SiteRoomsActiveRoomsInterface> = (props) => {
	const { active } = props;
	const { t } = useTranslation('SITES');

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const rooms = useSelector(roomsSelector);

	const params: SiteParamsInterface = useParams();
	const siteSingle = sites.content?.dataById[params.site];

	/**
	 * toggle room state
	 */
	const toggleRoomState = () => {
		// dispatch: update state
		const payload: SiteRoomsActionsFiltersPayloadInterface = {
			...rooms.content?.filters,
			active: !active
		};
		dispatch(RoomUpdateFilters(siteSingle?.id, payload));
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					color="primary"
					name="activeOrders"
					checked={active}
					onChange={toggleRoomState}
				/>
			}
			label={t('CONTENT.ROOMS.LIST.ACTIONS.ACTIVE.LABEL')}
		/>
	);
};
export default SiteRoomsActiveRooms;

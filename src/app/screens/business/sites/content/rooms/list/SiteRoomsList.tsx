import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import { AppConfigService } from '../../../../../../services';
import {
	roomsSelector,
	RoomUpdateFilters
} from '../../../../../../slices/business/sites/rooms/Rooms.slice';
import { SitesFetchList, sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import SiteRoomsActions from './actions/SiteRoomsActions';
import { SiteRoomsActionsFiltersPayloadInterface } from './actions/SiteRoomsActions.interface';
import SiteRoomsGrid from './grid/SiteRoomsGrid';
import { SiteRoomsListStyle } from './SiteRoomsList.style';

const SiteRoomsList: FC = () => {
	const classes = SiteRoomsListStyle();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const rooms = useSelector(roomsSelector);

	const params = useParams() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const pSiteId = rooms.content?.siteId;

	const siteSingle = sites.content?.dataById[cSiteId];

	const active = cSiteId === pSiteId && !!rooms.content?.filters.active;
	const inactive = cSiteId === pSiteId && !!rooms.content?.filters.inactive;

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch sites
			dispatch(SitesFetchList(true));
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.sites.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch]);

	useEffect(() => {
		// clear filters on site change
		if (cSiteId !== pSiteId) {
			// dispatch: update rooms filters
			const filters: SiteRoomsActionsFiltersPayloadInterface = {
				active: false,
				inactive: false
			};
			dispatch(RoomUpdateFilters(cSiteId, filters));
		}
	}, [dispatch, cSiteId, pSiteId]);

	// empty
	if (!siteSingle?.rooms.available) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			<SiteRoomsActions active={active} inactive={inactive} />

			{/* Grid */}
			<SiteRoomsGrid siteSingle={siteSingle} active={active} inactive={inactive} />
		</Box>
	);
};
export default SiteRoomsList;

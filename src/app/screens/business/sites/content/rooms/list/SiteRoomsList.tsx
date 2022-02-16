import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import {
	roomsSelector,
	RoomsUpdateState
} from '../../../../../../slices/business/sites/rooms/Rooms.slice';
import { SRCStateInterface } from '../../../../../../slices/business/sites/rooms/Rooms.slice.interface';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { SiteParamsInterface } from '../../../Site.interface';
import SiteRoomsActions from './actions/SiteRoomsActions';
import SiteRoomsGrid from './grid/SiteRoomsGrid';
import { SiteRoomsListStyle } from './SiteRoomsList.style';

const SiteRoomsList: FC = () => {
	const classes = SiteRoomsListStyle();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const rooms = useSelector(roomsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const pSiteId = rooms.content?.state?.pSiteId;

	const siteSingle = sites.content?.dataById[cSiteId];

	const active = cSiteId === pSiteId && !!rooms.content?.state?.active;
	const inactive = cSiteId === pSiteId && !!rooms.content?.state?.inactive;

	useEffect(() => {
		// clear filters on site change
		if (cSiteId !== pSiteId) {
			// dispatch: update state
			const state: SRCStateInterface = {
				active: false,
				inactive: false
			};
			dispatch(RoomsUpdateState(cSiteId, state));
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

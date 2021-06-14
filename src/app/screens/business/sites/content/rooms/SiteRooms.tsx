import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { SiteRoomsUpdateFilters, siteSelector } from '../../../../../slices/sites/Site.slice';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import { SiteParamsInterface } from '../../Site.interface';
import SiteRoomsActions from './list/actions/SiteRoomsActions';
import { SiteRoomsActionsFiltersPayloadInterface } from './list/actions/SiteRoomsActions.interface';
import SiteRoomsListGrid from './list/grid/SiteRoomsListGrid';
import { SiteRoomsStyles } from './SiteRooms.style';

const SiteRooms: FC = () => {
	const classes = SiteRoomsStyles();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const site = useSelector(siteSelector);

	const params: SiteParamsInterface = useParams();
	const siteSingle = sites.content?.dataById[params.site];

	const cSiteId = siteSingle?.id;
	const pSiteId = site.rooms.content?.siteId;

	const active = cSiteId === pSiteId && !!site.rooms.content?.active;
	const inactive = cSiteId === pSiteId && !!site.rooms.content?.inactive;

	useEffect(() => {
		// clear filters on site change
		if (cSiteId !== pSiteId) {
			// dispatch: update state
			const payload: SiteRoomsActionsFiltersPayloadInterface = {
				active: false,
				inactive: false,
				siteId: undefined
			};
			dispatch(SiteRoomsUpdateFilters(payload));
		}
	}, [dispatch, cSiteId, pSiteId]);

	// loader
	if (sites.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (sites.errors) {
		return <PageError message={sites.errors.text} />;
	}

	// null
	if (!sites?.content) {
		return null;
	}

	// empty
	if (!siteSingle?.id || !siteSingle?.rooms.available) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			<SiteRoomsActions active={active} inactive={inactive} />

			{/* Grid */}
			<SiteRoomsListGrid siteSingle={siteSingle} active={active} inactive={inactive} />
		</Box>
	);
};
export default SiteRooms;

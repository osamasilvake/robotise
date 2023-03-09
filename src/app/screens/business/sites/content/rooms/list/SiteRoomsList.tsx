import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import { AppDispatch } from '../../../../../../slices';
import {
	QRCodesFetch,
	qrCodesSelector
} from '../../../../../../slices/business/sites/rooms/qrCode/QRCodes.slice';
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

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const rooms = useSelector(roomsSelector);
	const qrCodes = useSelector(qrCodesSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const pSiteId = rooms.content?.state?.pSiteId;
	const cSiteId = params.siteId;

	const siteSingle = sites.content?.dataById[cSiteId];

	const active = cSiteId === pSiteId && !!rooms.content?.state?.active;
	const inactive = cSiteId === pSiteId && !!rooms.content?.state?.inactive;
	const searchText = cSiteId === pSiteId ? rooms.content?.state?.searchText || '' : '';

	useEffect(() => {
		// clear filters on site change
		if (cSiteId !== pSiteId) {
			// dispatch: update state
			const state: SRCStateInterface = {
				active: false,
				inactive: false,
				searchText: ''
			};
			dispatch(RoomsUpdateState(cSiteId, state));
		}
	}, [dispatch, cSiteId, pSiteId]);

	useEffect(() => {
		// return if content
		if (qrCodes.content) return;

		// dispatch: fetch QR codes
		cSiteId && dispatch(QRCodesFetch(cSiteId));
	}, [dispatch, cSiteId, qrCodes.content]);

	useEffect(() => {
		const executeServices = () => {
			// dispatch: fetch QR codes
			cSiteId && dispatch(QRCodesFetch(cSiteId));
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.sites.content.qrCodes.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, cSiteId]);

	// loader
	if (rooms.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (rooms.errors) {
		return <PageError message={rooms.errors?.text} />;
	}

	// init
	if (!rooms.init) return null;

	// empty
	if (!siteSingle || !rooms?.content?.data?.length) {
		return (
			<Box className={classes.sBox}>
				{/* Actions */}
				<SiteRoomsActions active={active} inactive={inactive} searchText={searchText} />

				{/* Empty */}
				<PageEmpty message="EMPTY.MESSAGE" />
			</Box>
		);
	}

	return (
		<Box className={classes.sBox}>
			{/* Actions */}
			<SiteRoomsActions active={active} inactive={inactive} searchText={searchText} />

			{/* Grid */}
			<SiteRoomsGrid
				siteSingle={siteSingle}
				active={active}
				inactive={inactive}
				searchText={searchText}
			/>
		</Box>
	);
};
export default SiteRoomsList;

import { Checkbox, FormControlLabel } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SiteRoomsUpdateFilters, siteSelector } from '../../../../../../../slices/sites/Site.slice';
import { sitesSelector } from '../../../../../../../slices/sites/Sites.slice';
import { SiteParamsInterface } from '../../../../Site.interface';
import {
	SiteRoomsActionsFiltersPayloadInterface,
	SiteRoomsInactiveRoomsInterface
} from './SiteRoomsActions.interface';
import { SiteRoomsActionsStyles } from './SiteRoomsActions.style';

const SiteRoomsInactiveRooms: FC<SiteRoomsInactiveRoomsInterface> = (props) => {
	const { inactive } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteRoomsActionsStyles();

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const site = useSelector(siteSelector);

	const params: SiteParamsInterface = useParams();
	const siteSingle = sites.content?.dataById[params.site];

	/**
	 * toggle inactive rooms
	 */
	const toggleRoomState = () => {
		// dispatch: update state
		const payload: SiteRoomsActionsFiltersPayloadInterface = {
			...site.rooms.content,
			inactive: !inactive,
			siteId: siteSingle?.id
		};
		dispatch(SiteRoomsUpdateFilters(payload));
	};

	return (
		<FormControlLabel
			className={classes.sInactive}
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

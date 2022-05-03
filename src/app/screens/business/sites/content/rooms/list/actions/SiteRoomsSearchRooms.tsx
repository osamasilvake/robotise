import { Paper, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../slices';
import { RoomsUpdateState } from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import { SRCStateInterface } from '../../../../../../../slices/business/sites/rooms/Rooms.slice.interface';
import { useDebounce } from '../../../../../../../utilities/hooks/debounce/Debounce';
import { SiteParamsInterface } from '../../../../Site.interface';
import { SiteRoomsSearchRoomsInterface } from './SiteRoomsActions.interface';

const SiteRoomsSearchRooms: FC<SiteRoomsSearchRoomsInterface> = (props) => {
	const { active, inactive, searchText } = props;
	const { t } = useTranslation('SITES');

	const dispatch = useDispatch<AppDispatch>();

	const [values, setValues] = useState({ text: searchText, pressed: false });
	const debouncedValue = useDebounce(values, 500);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const translation = 'CONTENT.ROOMS.LIST.ACTIONS.SEARCH';

	useEffect(() => {
		// return if not pressed
		if (!debouncedValue.pressed) return;

		// dispatch: update state
		const state: SRCStateInterface = {
			active,
			inactive,
			searchText: debouncedValue.text
		};
		cSiteId && dispatch(RoomsUpdateState(cSiteId, state));
	}, [dispatch, debouncedValue, cSiteId, active, inactive]);

	return (
		<Paper elevation={13}>
			<TextField
				fullWidth
				type="text"
				id="search"
				label={t(`${translation}.LABEL`)}
				placeholder={t(`${translation}.PLACEHOLDER`)}
				size="small"
				value={values.text}
				onChange={(event) => setValues({ text: event.target.value, pressed: true })}
			/>
		</Paper>
	);
};
export default SiteRoomsSearchRooms;

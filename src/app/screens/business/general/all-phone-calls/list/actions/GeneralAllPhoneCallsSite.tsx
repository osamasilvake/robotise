import { Autocomplete, Box, ListItem, TextField } from '@mui/material';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../slices';
import {
	allPhoneCallsSelector,
	AllPhoneCallsUpdateState
} from '../../../../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice';
import { APCStateInterface } from '../../../../../../slices/business/general/all-phone-calls/AllPhoneCalls.slice.interface';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import {
	GeneralAllPhoneCallsSiteComboBoxInterface,
	GeneralAllPhoneCallsSiteInterface
} from './GeneralAllPhoneCallsActions.interface';

const GeneralAllPhoneCallsSite: FC<GeneralAllPhoneCallsSiteInterface> = (props) => {
	const { siteId } = props;
	const { t } = useTranslation('GENERAL');

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const allPhoneCalls = useSelector(allPhoneCallsSelector);

	const [sitesList, setSitesList] = useState<GeneralAllPhoneCallsSiteComboBoxInterface[]>([]);

	const translation = 'COMMON.PHONE_CALLS.LIST.ACTIONS.FILTERS';
	const showHidden = !!sites.content?.state?.showHidden;

	useEffect(() => {
		sites.content &&
			setSitesList([
				{ id: '', label: t(`${translation}.SITE.ALL_SITES`) },
				...sites.content.data
					.filter((r) => !showHidden || (showHidden && !r.configs.isHidden))
					.map((site) => ({
						id: site.id,
						label: site.title
					}))
			]);
	}, [sites.content, t, showHidden]);

	/**
	 * handle site
	 * @param _event
	 * @param option
	 */
	const handleSite = (
		_event: SyntheticEvent,
		option: GeneralAllPhoneCallsSiteComboBoxInterface | null
	) => {
		// dispatch: update state
		const state: APCStateInterface = {
			...allPhoneCalls.content?.state,
			page: 0,
			siteId: option?.id
		};
		dispatch(AllPhoneCallsUpdateState(state));
	};

	return sitesList.length ? (
		<Box>
			<Autocomplete
				disablePortal
				size="small"
				id="sites"
				options={sitesList}
				value={sitesList.find((site) => site.id === siteId) || sitesList[0]}
				onChange={handleSite}
				renderOption={(props, option) => (
					<ListItem {...props} key={option.id}>
						{option.label}
					</ListItem>
				)}
				renderInput={(params) => (
					<TextField {...params} label={t(`${translation}.SITE.LABEL`)} />
				)}
				sx={{ minWidth: 180 }}
			/>
		</Box>
	) : null;
};
export default GeneralAllPhoneCallsSite;

import { Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../slices';
import {
	SitesFetchList,
	sitesSelector,
	SitesUpdateState
} from '../../../../../slices/business/sites/Sites.slice';
import { SSCStateInterface } from '../../../../../slices/business/sites/Sites.slice.interface';

const SitesHidden: FC = () => {
	const { t } = useTranslation('SITES');

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);

	const hidden = !!sites.content?.state?.hidden;

	/**
	 * handle hidden
	 */
	const handleHidden = () => {
		// dispatch: update state
		const state: SSCStateInterface = { hidden: !hidden };
		dispatch(SitesUpdateState(state));

		// dispatch: fetch sites
		dispatch(SitesFetchList());
	};

	return (
		<FormControlLabel
			control={
				<Checkbox color="primary" name="hidden" checked={hidden} onChange={handleHidden} />
			}
			label={t<string>('LIST.ACTIONS.FILTERS.HIDDEN')}
		/>
	);
};
export default SitesHidden;

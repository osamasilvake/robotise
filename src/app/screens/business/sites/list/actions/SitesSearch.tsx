import { Box, TextField } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../slices';
import { sitesSelector, SitesUpdateState } from '../../../../../slices/business/sites/Sites.slice';
import { SSCStateInterface } from '../../../../../slices/business/sites/Sites.slice.interface';

const RobotsSearch: FC = () => {
	const { t } = useTranslation('SITES');

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);

	const searchText = sites.content?.state?.searchText;

	/**
	 * search sites
	 */
	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		// dispatch: update state
		const state: SSCStateInterface = {
			...sites.content?.state,
			searchText: value
		};
		dispatch(SitesUpdateState(state));
	};

	return (
		<Box>
			<TextField
				size="small"
				required
				type="text"
				id="robot"
				name="robot"
				label={t('LIST.ACTIONS.FILTERS.SEARCH.LABEL')}
				placeholder={t('LIST.ACTIONS.FILTERS.SEARCH.PLACEHOLDER')}
				value={searchText}
				onChange={handleSearch}
			/>
		</Box>
	);
};
export default RobotsSearch;

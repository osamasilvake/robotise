import { Box, TextField } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../slices';
import {
	robotTwinsSummarySelector,
	RobotTwinsSummaryUpdateState
} from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { RTSContentStateInterface } from '../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

const RobotsSearch: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch<AppDispatch>();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const searchText = robotTwinsSummary.content?.state?.searchText;

	/**
	 * search robot
	 * @param event
	 */
	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		// dispatch: update state
		const state: RTSContentStateInterface = {
			...robotTwinsSummary.content?.state,
			searchText: value?.toLowerCase()
		};
		dispatch(RobotTwinsSummaryUpdateState(state));
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

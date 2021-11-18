import { Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector,
	RobotTwinsSummaryUpdateState
} from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { RTSContentStateInterface } from '../../../../../slices/business/robots/RobotTwinsSummary.slice.interface';

const RobotsHidden: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const hidden = !!robotTwinsSummary.content?.state?.hidden;

	/**
	 * toggle hidden
	 */
	const toggleHidden = () => {
		// dispatch: update state
		const state: RTSContentStateInterface = { hidden: !hidden };
		dispatch(RobotTwinsSummaryUpdateState(state));

		// dispatch: fetch robot twins summary
		dispatch(RobotTwinsSummaryFetchList());
	};

	return (
		<FormControlLabel
			control={
				<Checkbox color="primary" name="hidden" checked={hidden} onChange={toggleHidden} />
			}
			label={t<string>('LIST.ACTIONS.FILTERS.HIDDEN')}
		/>
	);
};
export default RobotsHidden;

import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	robotTwinsSummarySelector,
	RobotTwinsSummaryUpdateState
} from '../../../../../slices/robots/RobotTwinsSummary.slice';
import { RTSContentStateInterface } from '../../../../../slices/robots/RobotTwinsSummary.slice.interface';
import { RobotsHiddenInterface } from './RobotsActions.interface';

const RobotsHidden: FC<RobotsHiddenInterface> = (props) => {
	const { hidden } = props;
	const { t } = useTranslation('ROBOTS');

	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	/**
	 * toggle hidden
	 */
	const toggleHidden = () => {
		// dispatch: update state
		const state: RTSContentStateInterface = {
			...robotTwinsSummary.content?.state,
			hidden: !hidden
		};
		dispatch(RobotTwinsSummaryUpdateState(state));
	};

	return (
		<Box>
			<FormControlLabel
				control={
					<Checkbox
						color="primary"
						name="hidden"
						checked={hidden}
						onChange={toggleHidden}
					/>
				}
				label={t('LIST.ACTIONS.HIDDEN.LABEL')}
			/>
		</Box>
	);
};
export default RobotsHidden;

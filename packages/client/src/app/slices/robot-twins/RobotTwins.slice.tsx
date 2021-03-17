import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { TriggerMessageTypeEnum } from '../../components/frame/message/Message.enum';
import { TriggerMessageInterface } from '../../components/frame/message/Message.interface';
import RobotsService from '../../screens/business/robots/Robots.service';
import { deserializeRobotTwins } from '../../utilities/serializers/json-api/JsonApi';
import { triggerMessage } from '../general/General.slice';
import { RootStateInterface } from '../Slices.interface';
import { RTSInterface, RTSResponseInterface } from './RobotTwins.slice.interface';
import { updateRobotTwins } from './RobotTwinsSummary.slice';

// initial state
export const initialState: RTSInterface = {
	loading: false,
	content: null,
	errors: null
};

// slice
const dataSlice = createSlice({
	name: 'Robot Twins',
	initialState,
	reducers: {
		loading: (state) => {
			state.loading = true;
		},
		success: (state, action) => {
			state.loading = false;
			state.content = action.payload;
			state.errors = null;
		},
		failure: (state, action) => {
			state.loading = false;
			state.content = null;
			state.errors = action.payload;
		},
		reset: () => initialState
	}
});

// actions
export const { loading, success, failure, reset } = dataSlice.actions;

// selector
export const robotTwinsSelector = (state: RootStateInterface) => state['robotTwins'];

// reducer
export default dataSlice.reducer;

/**
 * fetch robot twins list
 */
export const RobotTwinsFetchList = () => async (dispatch: Dispatch) => {
	// fetch robot twins list
	RobotsService.robotTwinsFetch()
		.then(async (res) => {
			// deserialize response
			const result = await deserializeRobotTwins(res);

			// count alerts for badge
			const alerts = countAlerts(result);

			// dispatch: success
			dispatch(success({ ...result, alerts }));

			// dispatch: update robot twins result with robots list
			dispatch(updateRobotTwins({ ...result, alerts }));
		})
		.catch(() => {
			const message: TriggerMessageInterface = {
				show: true,
				severity: TriggerMessageTypeEnum.ERROR,
				text: 'API.FETCH'
			};

			// dispatch: trigger message
			dispatch(triggerMessage(message));

			// dispatch: error
			dispatch(failure(message));
		});
};

/**
 * count alerts
 * @param payload
 * @returns
 */
const countAlerts = (payload: RTSResponseInterface) => {
	return Object.keys(payload.dataById).reduce(
		(acc, key) => {
			const robotTwin = payload.dataById[key];
			const allAlerts = robotTwin.alerts.value;
			if (allAlerts.length) {
				const danger = allAlerts.filter((f) => f.level === 'danger');
				const warn = allAlerts.filter((f) => f.level === 'warning');
				acc.danger = acc.danger += danger.length;
				acc.warning = acc.warning += warn.length;
			}
			return acc;
		},
		{ danger: 0, warning: 0 }
	);
};

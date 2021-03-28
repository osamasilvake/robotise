import { AnyAction, combineReducers } from 'redux';

import auth, { initialState as aState } from './auth/Auth.slice';
import general from './general/General.slice';
import robot, { initialState as rState } from './robot/Robot.slice';
import robotTwins, { initialState as rtState } from './robot-twins/RobotTwins.slice';
import robotTwinsSummary, { initialState as rtbState } from './robot-twins/RobotTwinsSummary.slice';
import sites, { initialState as sState } from './sites/Sites.slice';

// app reducers
const combinedReducer = combineReducers({
	auth,
	general,
	robot,
	robotTwins,
	robotTwinsSummary,
	sites
});

// reducers type
export type AppReducerType = ReturnType<typeof combinedReducer>;

// root reducer
const rootReducer = (rootState: AppReducerType | undefined, action: AnyAction) => {
	// terminate the state of a redux store
	if (action.type === 'Auth/terminate') {
		if (rootState) {
			rootState = {
				...rootState,
				auth: aState,
				general: rootState.general,
				robot: rState,
				robotTwins: rtState,
				robotTwinsSummary: rtbState,
				sites: sState
			};
		}
	}
	return combinedReducer(rootState, action);
};
export default rootReducer;

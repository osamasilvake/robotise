import { AnyAction, combineReducers } from 'redux';

import auth from './auth/Auth.slice';
import general from './general/General.slice';
import robotTwins from './robot-twins/RobotTwins.slice';
import robotTwinsSummary from './robot-twins/RobotTwinsSummary.slice';
import sites from './sites/Sites.slice';

// app reducers
const appReducer = combineReducers({
	auth,
	general,
	robotTwins,
	robotTwinsSummary,
	sites
});

// reducers type
export type AppReducerType = ReturnType<typeof appReducer>;

// root reducer
const rootReducer = (rootState: AppReducerType | undefined, action: AnyAction) => {
	// terminate the state of a redux store
	if (action.type === 'Auth/terminate') {
		rootState = undefined;
	}
	return appReducer(rootState, action);
};
export default rootReducer;

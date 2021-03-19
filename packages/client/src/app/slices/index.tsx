import { AnyAction, combineReducers } from 'redux';

import auth from './auth/Auth.slice';
import general from './general/General.slice';
import robotTwinsSummary from './robot-twins/RobotTwinsSummary.slice';
import sites from './sites/Sites.slice';

// init reducer
const initReducer = combineReducers({ auth, general });

// app reducers
const appReducer = combineReducers({
	auth,
	general,
	robotTwinsSummary,
	sites
});

// types
export type initReducerType = ReturnType<typeof initReducer>;
export type appReducerType = ReturnType<typeof appReducer>;

// root reducer
const rootReducer = (
	rootState: initReducerType | appReducerType | undefined,
	action: AnyAction
) => {
	// reset the state of a redux store
	if (action.type === 'Auth/reset') {
		if (rootState?.general) {
			rootState = {
				auth: rootState.auth,
				general: rootState.general
			};
			return initReducer(rootState, action);
		}
		rootState = undefined;
	}
	return appReducer(rootState as appReducerType, action);
};
export default rootReducer;

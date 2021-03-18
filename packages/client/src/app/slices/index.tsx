import { combineReducers } from 'redux';

import auth from './auth/Auth.slice';
import general from './general/General.slice';
import robotTwinsSummary from './robot-twins/RobotTwinsSummary.slice';
import sites from './sites/Sites.slice';

// combine reducers
const rootReducer = combineReducers({
	auth,
	general,
	robotTwinsSummary,
	sites
});

// export root reducer
export default rootReducer;

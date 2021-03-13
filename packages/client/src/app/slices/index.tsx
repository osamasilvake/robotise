import { combineReducers } from 'redux';

import auth from './auth/Auth.slice';
import general from './general/General.slice';
import robotTwins from './robot-twins/RobotTwins.slice';
import robots from './robots/Robots.slice';
import sites from './sites/Sites.slice';

// combine reducers
const rootReducer = combineReducers({
	auth,
	general,
	sites,
	robotTwins,
	robots
});

// export root reducer
export default rootReducer;

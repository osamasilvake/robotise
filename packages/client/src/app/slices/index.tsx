import { combineReducers } from 'redux';

import auth from './auth/Auth.slice';
import general from './general/General.slice';

// combine reducers
const rootReducer = combineReducers({
	auth,
	general
});

// export root reducer
export default rootReducer;

import { combineReducers } from 'redux';

import auth from './auth/Auth.slice';

// combine reducers
const rootReducer = combineReducers({
	auth
});

// export root reducer
export default rootReducer;

import { combineReducers } from 'redux';

import auth, { AuthInterface } from './auth';

// combine reducers
const rootReducer = combineReducers({
	auth
});

// root state
export interface RootState {
	auth: AuthInterface;
}

// export root reducer
export default rootReducer;

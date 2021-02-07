import { combineReducers } from 'redux';

import { AuthInterface } from './auth/Auth.interface';
import auth from './auth/Auth.slice';

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

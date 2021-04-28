import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { AnyAction, combineReducers } from 'redux';
import ReduxLogger from 'redux-logger';

import auth from './auth/Auth.slice';
import general from './general/General.slice';
import inventory from './inventory/Inventory.slice';
import order from './orders/Order.slice';
import orders from './orders/Orders.slice';
import products from './products/Products.slice';
import purchase from './purchases/Purchase.slice';
import purchases from './purchases/Purchases.slice';
import robot from './robot/Robot.slice';
import robotTwins from './robot-twins/RobotTwins.slice';
import robotTwinsSummary from './robot-twins/RobotTwinsSummary.slice';
import sites from './sites/Sites.slice';

// app reducers
const combinedReducer = combineReducers({
	auth,
	general,
	sites,
	robotTwinsSummary,
	robotTwins,
	robot,
	products,
	inventory,
	orders,
	order,
	purchases,
	purchase
});

// reducers type
export type AppReducerType = ReturnType<typeof combinedReducer>;

// root reducer
let initRootState: AppReducerType | undefined = undefined;
const rootReducer = (rootState: AppReducerType | undefined, action: AnyAction) => {
	// terminate the state of a redux store
	if (action.type === 'Auth/terminate') {
		if (rootState && initRootState) {
			rootState = {
				...initRootState,
				general: rootState.general
			};
		}
	}
	return combinedReducer(rootState, action);
};

// configure store
export const store = configureStore({
	reducer: rootReducer,
	middleware: [...getDefaultMiddleware(), ReduxLogger]
});

// store redux initial state
initRootState = store.getState();

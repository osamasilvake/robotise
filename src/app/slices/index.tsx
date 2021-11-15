import { configureStore } from '@reduxjs/toolkit';
import { AnyAction, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

import auth from './authentication/Auth.slice';
import emails from './business/general/emails/Emails.slice';
import commandsLog from './business/robots/commands-log/CommandsLog.slice';
import elevatorCalls from './business/robots/elevator-calls/ElevatorCalls.slice';
import inventory from './business/robots/inventory/Inventory.slice';
import order from './business/robots/orders/Order.slice';
import orders from './business/robots/orders/Orders.slice';
import purchase from './business/robots/purchases/Purchase.slice';
import purchases from './business/robots/purchases/Purchases.slice';
import robot from './business/robots/Robot.slice';
import robotTwins from './business/robots/RobotTwins.slice';
import robotTwinsSummary from './business/robots/RobotTwinsSummary.slice';
import notifications from './business/sites/configuration/Notifications.slice';
import servicePositions from './business/sites/configuration/ServicePositions.slice';
import phoneCalls from './business/sites/phone-calls/PhoneCalls.slice';
import phoneConfigs from './business/sites/phone-configs/PhoneConfigs.slice';
import products from './business/sites/products/Products.slice';
import rooms from './business/sites/rooms/Rooms.slice';
import site from './business/sites/Site.slice';
import sites from './business/sites/Sites.slice';
import general from './general/General.slice';
import alertCodes from './information/alert-codes/AlertCodes.slice';
import deepLinks from './settings/deep-links/DeepLinks.slice';

// app reducers
const combinedReducer = combineReducers({
	auth,
	general,
	emails,
	sites,
	site,
	products,
	rooms,
	notifications,
	servicePositions,
	phoneConfigs,
	phoneCalls,
	robotTwinsSummary,
	robotTwins,
	robot,
	inventory,
	orders,
	order,
	purchases,
	purchase,
	commandsLog,
	elevatorCalls,
	alertCodes,
	deepLinks
});

// reducers type
export type AppReducerType = ReturnType<typeof combinedReducer>;

// root reducer
let initRootState: AppReducerType | undefined = undefined;
const rootReducer = (rootState: AppReducerType | undefined, action: AnyAction) => {
	// terminate all states of a redux store except general
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
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			createLogger({
				collapsed: true
			})
		)
});

// store redux initial state
initRootState = store.getState();

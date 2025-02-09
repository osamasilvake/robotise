import { configureStore } from '@reduxjs/toolkit';
import { AnyAction, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

import app from './app/App.slice';
import auth from './authentication/Auth.slice';
import allElevatorCalls from './business/general/all-elevator-calls/AllElevatorCalls.slice';
import allOrder from './business/general/all-orders/AllOrder.slice';
import allOrders from './business/general/all-orders/AllOrders.slice';
import allPhoneCalls from './business/general/all-phone-calls/AllPhoneCalls.slice';
import allSMSList from './business/general/all-sms-list/AllSMSList.slice';
import email from './business/general/emails/Email.slice';
import emails from './business/general/emails/Emails.slice';
import generalOperations from './business/general/GeneralOperations.slice';
import commandsLog from './business/robots/commands-log/CommandsLog.slice';
import robotCloudConfiguration from './business/robots/configuration/cloud/RobotCloudConfiguration.slice';
import robotConfiguration from './business/robots/configuration/robot/RobotConfiguration.slice';
import elevatorCalls from './business/robots/elevator-calls/ElevatorCalls.slice';
import inventory from './business/robots/inventory/Inventory.slice';
import order from './business/robots/orders/Order.slice';
import orders from './business/robots/orders/Orders.slice';
import purchase from './business/robots/purchases/Purchase.slice';
import purchases from './business/robots/purchases/Purchases.slice';
import robotOperations from './business/robots/RobotOperations.slice';
import robotTwins from './business/robots/RobotTwins.slice';
import robotTwinsSummary from './business/robots/RobotTwinsSummary.slice';
import siteCloudConfiguration from './business/sites/configuration/cloud/SiteCloudConfiguration.slice';
import coldCalls from './business/sites/configuration/cold-calls/ColdCalls.slice';
import marketingRides from './business/sites/configuration/marketing-rides/MarketingRides.slice';
import notifications from './business/sites/configuration/notifications/Notifications.slice';
import siteConfiguration from './business/sites/configuration/site/SiteConfiguration.slice';
import floors from './business/sites/floors/Floors.slice';
import performance from './business/sites/performance/Performance.slice';
import phoneCalls from './business/sites/phone-calls/PhoneCalls.slice';
import phoneConfigs from './business/sites/phone-configs/PhoneConfigs.slice';
import products from './business/sites/products/Products.slice';
import qrCodes from './business/sites/rooms/qrCode/QRCodes.slice';
import rooms from './business/sites/rooms/Rooms.slice';
import sites from './business/sites/Sites.slice';
import smsList from './business/sites/sms-list/SMSList.slice';
import wifiHeatmap from './business/sites/statistics/WifiHeatmap.slice';
import alertCodes from './information/alert-codes/AlertCodes.slice';
import deepLink from './settings/deep-links/DeepLink.slice';
import deepLinks from './settings/deep-links/DeepLinks.slice';
import middlewareConfig from './settings/middleware-config/MiddlewareConfig.slice';
import robotPassword from './setup/robot-password/RobotPassword.slice';

// app reducers
const combinedReducer = combineReducers({
	app,
	auth,

	generalOperations,
	emails,
	email,
	allOrders,
	allOrder,
	allElevatorCalls,
	allPhoneCalls,
	allSMSList,

	sites,
	products,
	floors,
	rooms,
	qrCodes,
	notifications,
	phoneConfigs,
	phoneCalls,
	smsList,
	wifiHeatmap,
	performance,
	marketingRides,
	coldCalls,
	siteCloudConfiguration,
	siteConfiguration,

	robotTwinsSummary,
	robotTwins,
	robotOperations,
	inventory,
	orders,
	order,
	purchases,
	purchase,
	commandsLog,
	elevatorCalls,
	robotCloudConfiguration,
	robotConfiguration,

	alertCodes,
	deepLink,
	deepLinks,

	middlewareConfig,
	robotPassword
});

// type: root state
export type RootState = ReturnType<typeof combinedReducer>;

// root reducer
let initRootState: RootState | undefined = undefined;
const rootReducer = (rootState: RootState | undefined, action: AnyAction) => {
	// terminate all states of a redux store except: app store
	if (action.type === 'Auth/terminate') {
		if (rootState && initRootState) {
			rootState = {
				...initRootState,
				app: rootState.app
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

// type: dispatch
export type AppDispatch = typeof store.dispatch;

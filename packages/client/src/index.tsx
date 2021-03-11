import './i18n/i18n';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxLogger from 'redux-logger';

import App from './app/App';
import rootReducer from './app/slices';

// configure store
export const store = configureStore({
	reducer: rootReducer,
	middleware: [...getDefaultMiddleware(), ReduxLogger]
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

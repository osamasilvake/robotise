import './i18n/i18n';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/App';
import { store } from './app/slices';

const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);

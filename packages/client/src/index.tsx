import './i18n/i18n';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/App';
import { store } from './app/slices';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

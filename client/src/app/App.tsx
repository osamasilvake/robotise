import {
	createMuiTheme,
	CssBaseline,
	LinearProgress,
	MuiThemeProvider,
	useMediaQuery
} from '@material-ui/core';
import React, { FC, Suspense, useMemo } from 'react';

import Meta from './frame/meta/Meta';
import PushMessage from './frame/push-message/PushMessage';
import Routes from './Routes';
import { InterceptorService } from './services';
import { ThemeSettings } from './Theme';

// init axios interceptor
InterceptorService.setIntercertors();

const App: FC = () => {
	/**
	 * theme setting
	 */
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(() => createMuiTheme(ThemeSettings(prefersDarkMode)), [prefersDarkMode]);

	return (
		<MuiThemeProvider theme={theme}>
			{/* UI baseline */}
			<CssBaseline />

			{/* Meta */}
			<Meta />

			{/* Routes */}
			<Suspense fallback={<LinearProgress />}>
				<Routes />
			</Suspense>

			{/* push message */}
			<PushMessage />
		</MuiThemeProvider>
	);
};
export default App;

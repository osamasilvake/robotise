import { createMuiTheme, CssBaseline, MuiThemeProvider, useMediaQuery } from '@material-ui/core';
import React, { FC, Suspense, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import Loader from './components/loader/Loader';
import Meta from './frame/meta/Meta';
import PushMessage from './frame/push-message/PushMessage';
import Routes from './Routes';
import { InterceptorService } from './services';
import { ThemeSettings } from './Theme';

// init axios interceptor
InterceptorService.setIntercertors();

const App: FC = () => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(() => createMuiTheme(ThemeSettings(prefersDarkMode)), [prefersDarkMode]);

	return (
		<MuiThemeProvider theme={theme}>
			{/* UI baseline */}
			<CssBaseline />

			<HelmetProvider>
				{/* Meta */}
				<Meta />

				{/* Routes */}
				<Suspense fallback={<Loader />}>
					<Routes />
				</Suspense>

				{/* push message */}
				<PushMessage />
			</HelmetProvider>
		</MuiThemeProvider>
	);
};
export default App;

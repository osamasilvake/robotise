import { CssBaseline } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { FC, Suspense, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from './AppRouter';
import Header from './frame/header/Header';
import Auth from './screens/authentication/Auth';

const App: FC = () => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light'
				}
			}),
		[prefersDarkMode]
	);

	return (
		<MuiThemeProvider theme={theme}>
			{/* UI baseline */}
			<CssBaseline />

			<Suspense fallback={<LinearProgress />}>
				<BrowserRouter>
					<Auth>
						{/* Header */}
						<Header />

						<AppRouter />

						{/* Footer */}
					</Auth>
				</BrowserRouter>
			</Suspense>
		</MuiThemeProvider>
	);
};
export default App;

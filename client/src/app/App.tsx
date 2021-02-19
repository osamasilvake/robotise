import { CssBaseline } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { FC, Suspense, useMemo } from 'react';

import { AppVariables } from '../app.config';
import Routes from './Routes';

const App: FC = () => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light',
					background: {
						default: prefersDarkMode ? AppVariables.colors.c3 : AppVariables.colors.c2
					},
					primary: {
						main: '#ddd'
					}
				},
				overrides: {
					MuiAvatar: {
						img: {
							objectFit: 'contain'
						}
					}
				}
			}),
		[prefersDarkMode]
	);

	return (
		<MuiThemeProvider theme={theme}>
			{/* UI baseline */}
			<CssBaseline />

			<Suspense fallback={<LinearProgress />}>
				<Routes />
			</Suspense>
		</MuiThemeProvider>
	);
};
export default App;

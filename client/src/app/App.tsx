import { CssBaseline } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { FC, Suspense, useMemo } from 'react';

import Meta from './frame/meta/Meta';
import Routes from './Routes';
import { Dark, Light } from './Theme';

const App: FC = () => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: prefersDarkMode ? Dark : Light,
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

			{/* Meta */}
			<Meta>
				<title>ROC | Robotise AG</title>
				<meta name="description" content="A ROC application for managing Robots" />
			</Meta>

			<Suspense fallback={<LinearProgress />}>
				<Routes />
			</Suspense>
		</MuiThemeProvider>
	);
};
export default App;

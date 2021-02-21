import {
	createMuiTheme,
	CssBaseline,
	LinearProgress,
	MuiThemeProvider,
	useMediaQuery
} from '@material-ui/core';
import React, { FC, Suspense, useMemo } from 'react';

import Meta from './frame/meta/Meta';
import Routes from './Routes';
import { ApiIntercept } from './services';
import { ThemeSettings } from './Theme';

// intercept
ApiIntercept.setIntercertors();

const App: FC = () => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(() => createMuiTheme(ThemeSettings(prefersDarkMode)), [prefersDarkMode]);

	return (
		<MuiThemeProvider theme={theme}>
			{/* UI baseline */}
			<CssBaseline />

			{/* Meta */}
			<Meta description="An application to manage and monitor Robots on different Sites." />

			{/* Routes */}
			<Suspense fallback={<LinearProgress />}>
				<Routes />
			</Suspense>
		</MuiThemeProvider>
	);
};
export default App;

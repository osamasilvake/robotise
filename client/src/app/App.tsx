import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { FC, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from './AppRouter';
import Header from './frame/header/Header';

// theme setting
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#3c4252',
			contrastText: '#ffffff'
		},
		secondary: {
			main: '#333333'
		},
		error: {
			main: '#e74c3c'
		}
	}
});

const App: FC = () => {
	return (
		<MuiThemeProvider theme={theme}>
			<Suspense fallback={<LinearProgress />}>
				<BrowserRouter>
					{/* Header */}
					<Header />

					<AppRouter />

					{/* Footer */}
				</BrowserRouter>
			</Suspense>
		</MuiThemeProvider>
	);
};
export default App;

import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import React, { FC, Suspense, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import Loader from './components/loader/Loader';
import ErrorBoundary from './frame/error-boundary/ErrorBoundary';
import Message from './frame/message/Message';
import Meta from './frame/meta/Meta';
import Routes from './Routes';
import { InterceptorService, LoggerService } from './services';
import { ThemePaletteTypeEnum } from './slices/general/General.enum';
import { generalSelector } from './slices/general/General.slice';
import { ThemeSettings } from './Theme';

// init axios-interceptor and log-level
InterceptorService.setIntercertors();
LoggerService.init();

const App: FC = () => {
	const { themePalette } = useSelector(generalSelector);

	const theme = useMemo(
		() => createMuiTheme(ThemeSettings(themePalette === ThemePaletteTypeEnum.DARK)),
		[themePalette]
	);

	return (
		<MuiThemeProvider theme={theme}>
			{/* UI baseline */}
			<CssBaseline />

			<HelmetProvider>
				{/* Meta: top-level with general info */}
				<Meta />

				<ErrorBoundary>
					<Suspense fallback={<Loader />}>
						<Routes />
					</Suspense>
				</ErrorBoundary>
			</HelmetProvider>

			{/* Message: a snackbar for the app notifications */}
			<Message />
		</MuiThemeProvider>
	);
};
export default App;

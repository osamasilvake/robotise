import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import React, { FC, Suspense, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import Loader from './components/loader/Loader';
import ErrorBoundary from './frame/error-boundary/ErrorBoundary';
import Message from './frame/message/Message';
import Meta from './frame/meta/Meta';
import ScrollTop from './frame/scroll-top/ScrollTop';
import Routes from './routes/Routes';
import { InterceptorService, LoggerService } from './services';
import { ThemePaletteTypeEnum } from './slices/general/General.enum';
import { generalSelector } from './slices/general/General.slice';
import { Common, Dark, Light, Overrides, Palette } from './themes';

// init axios-interceptor and log-level
InterceptorService.init();
LoggerService.init();

const App: FC = () => {
	const { themePalette } = useSelector(generalSelector);
	const theme = useMemo(
		() =>
			createMuiTheme(
				themePalette === ThemePaletteTypeEnum.DARK
					? Dark(Common, Palette, Overrides)
					: Light(Common, Palette, Overrides)
			),
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

			{/* Scroll Top */}
			<ScrollTop />
		</MuiThemeProvider>
	);
};
export default App;

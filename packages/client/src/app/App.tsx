import {
	createMuiTheme,
	CssBaseline,
	MuiThemeProvider,
	StyledEngineProvider
} from '@material-ui/core';
import { FC, Suspense, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import Loader from './components/common/loader/Loader';
import Meta from './components/common/meta/Meta';
import ErrorBoundary from './components/frame/error-boundary/ErrorBoundary';
import Listeners from './components/frame/listeners/Listeners';
import Message from './components/frame/message/Message';
import ScrollTop from './components/frame/scroll-top/ScrollTop';
import Routes from './routes/Routes';
import { InterceptorService, LoggerService } from './services';
import { generalSelector } from './slices/general/General.slice';
import { GeneralThemePaletteTypeEnum } from './slices/general/General.slice.enum';
import { Dark, Light } from './themes';
import Options from './themes/options';

// init axios-interceptor and log-level
InterceptorService.init();
LoggerService.init();

const App: FC = () => {
	const general = useSelector(generalSelector);

	// change theme
	const theme = useMemo(
		() =>
			createMuiTheme(
				general.themePalette === GeneralThemePaletteTypeEnum.DARK
					? Dark(Options)
					: Light(Options)
			),
		[general.themePalette]
	);

	return (
		<MuiThemeProvider theme={theme}>
			{/* Precedence to makeStyles */}
			<StyledEngineProvider injectFirst>
				{/* UI baseline */}
				<CssBaseline />

				<HelmetProvider>
					{/* Meta: General Top-Level */}
					<Meta />

					<ErrorBoundary>
						<Suspense fallback={<Loader />}>
							<Routes />
						</Suspense>
					</ErrorBoundary>
				</HelmetProvider>

				{/* Message: Snackbar for Notifications */}
				<Message />

				{/* Scroll-Top */}
				<ScrollTop />

				{/* Listeners: Network */}
				<Listeners />
			</StyledEngineProvider>
		</MuiThemeProvider>
	);
};
export default App;

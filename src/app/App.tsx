import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, Suspense, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { ErrorTypeEnum } from './components/common/error/Error.enum';
import Loader from './components/common/loader/Loader';
import Meta from './components/common/meta/Meta';
import ErrorBoundary from './components/frame/error-boundary/ErrorBoundary';
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
			createTheme(
				general.themePalette === GeneralThemePaletteTypeEnum.DARK
					? Dark(Options)
					: Light(Options)
			),
		[general.themePalette]
	);

	return (
		<ThemeProvider theme={theme}>
			{/* Precedence to makeStyles */}
			<StyledEngineProvider injectFirst>
				{/* UI baseline */}
				<CssBaseline />

				<HelmetProvider>
					{/* Meta: Top-Level */}
					<Meta />

					<ErrorBoundary error={ErrorTypeEnum.ERROR_BOUNDARY}>
						<Suspense fallback={<Loader />}>
							<Routes />
						</Suspense>
					</ErrorBoundary>
				</HelmetProvider>

				{/* Snackbar */}
				<Message />

				{/* Scroll-Top */}
				<ScrollTop />
			</StyledEngineProvider>
		</ThemeProvider>
	);
};
export default App;

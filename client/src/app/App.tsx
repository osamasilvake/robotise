import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import React, { FC, Suspense, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import Loader from './components/loader/Loader';
import Meta from './frame/meta/Meta';
import PushMessage from './frame/push-message/PushMessage';
import Routes from './Routes';
import { InterceptorService } from './services';
import { ThemeColorsEnum } from './slices/general/General.enum';
import { generalSelector } from './slices/general/General.slice';
import { ThemeSettings } from './Theme';

// init axios interceptor
InterceptorService.setIntercertors();

const App: FC = () => {
	const { themeColor } = useSelector(generalSelector);

	const theme = useMemo(
		() => createMuiTheme(ThemeSettings(themeColor === ThemeColorsEnum.DARK)),
		[themeColor]
	);

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

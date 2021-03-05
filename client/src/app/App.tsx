import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import React, { FC, Suspense, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import Loader from './components/loader/Loader';
import Message from './frame/message/Message';
import Meta from './frame/meta/Meta';
import Routes from './Routes';
import { InterceptorService } from './services';
import { ThemePaletteEnum } from './slices/general/General.enum';
import { generalSelector } from './slices/general/General.slice';
import { ThemeSettings } from './Theme';

// init axios interceptor
InterceptorService.setIntercertors();

const App: FC = () => {
	const { themePalette } = useSelector(generalSelector);

	const theme = useMemo(
		() => createMuiTheme(ThemeSettings(themePalette === ThemePaletteEnum.DARK)),
		[themePalette]
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

				{/* Message */}
				<Message />
			</HelmetProvider>
		</MuiThemeProvider>
	);
};
export default App;

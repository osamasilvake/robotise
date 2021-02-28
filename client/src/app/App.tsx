import {
	createMuiTheme,
	CssBaseline,
	LinearProgress,
	MuiThemeProvider,
	useMediaQuery
} from '@material-ui/core';
import React, { FC, Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Meta from './frame/meta/Meta';
import Routes from './Routes';
import { InterceptorService } from './services';
import { ThemeSettings } from './Theme';

// init axios interceptor
InterceptorService.setIntercertors();

const App: FC = () => {
	const { t } = useTranslation('META');

	/**
	 * theme setting
	 */
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(() => createMuiTheme(ThemeSettings(prefersDarkMode)), [prefersDarkMode]);

	return (
		<MuiThemeProvider theme={theme}>
			{/* UI baseline */}
			<CssBaseline />

			{/* Meta */}
			<Meta description={t('GENERAL.DESCRIPTION')} />

			{/* Routes */}
			<Suspense fallback={<LinearProgress />}>
				<Routes />
			</Suspense>
		</MuiThemeProvider>
	);
};
export default App;

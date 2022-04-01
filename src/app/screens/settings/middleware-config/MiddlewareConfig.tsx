import { Paper } from '@mui/material';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import ErrorBoundary from '../../../components/frame/error-boundary/ErrorBoundary';
import MiddlewareConfigList from './list/MiddlewareConfigList';

const MiddlewareConfig: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="MIDDLEWARE_CONFIG.TITLE" description="MIDDLEWARE_CONFIG.DESCRIPTION" />

			{/* List */}
			<ErrorBoundary>
				<MiddlewareConfigList />
			</ErrorBoundary>
		</Paper>
	);
};
export default MiddlewareConfig;

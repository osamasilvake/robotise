import { Paper } from '@mui/material';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import ErrorBoundary from '../../../components/frame/error-boundary/ErrorBoundary';
import SitesList from './list/SitesList';

const Sites: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="SITES.TITLE" description="SITES.DESCRIPTION" />

			{/* List */}
			<ErrorBoundary>
				<SitesList />
			</ErrorBoundary>
		</Paper>
	);
};
export default Sites;

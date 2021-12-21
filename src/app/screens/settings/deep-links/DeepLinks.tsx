import { Paper } from '@mui/material';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import ErrorBoundary from '../../../components/frame/error-boundary/ErrorBoundary';
import DeepLinksList from './list/DeepLinksList';

const DeepLinks: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="DEEP_LINKS.TITLE" description="DEEP_LINKS.DESCRIPTION" />

			{/* List */}
			<ErrorBoundary>
				<DeepLinksList />
			</ErrorBoundary>
		</Paper>
	);
};
export default DeepLinks;

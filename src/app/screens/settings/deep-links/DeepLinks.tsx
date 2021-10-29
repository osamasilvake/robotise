import { Paper } from '@mui/material';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import DeepLinksList from './list/DeepLinksList';

const DeepLinks: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="DEEP_LINKS.TITLE" description="DEEP_LINKS.DESCRIPTION" />

			{/* List */}
			<DeepLinksList />
		</Paper>
	);
};
export default DeepLinks;

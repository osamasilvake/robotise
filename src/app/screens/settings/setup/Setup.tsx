import { Paper } from '@mui/material';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import SetupTabs from './Setup.tabs';

const Setup: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="SETUP.TITLE" description="SETUP.DESCRIPTION" />

			{/* Content */}
			<SetupTabs />
		</Paper>
	);
};
export default Setup;

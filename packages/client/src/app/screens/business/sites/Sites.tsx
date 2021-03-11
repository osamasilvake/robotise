import { Box } from '@material-ui/core';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';

const Sites: FC = () => {
	return (
		<Box component="section">
			{/* Page Head */}
			<PageHead title="SITES.TITLE" description="SITES.DESCRIPTION" />
		</Box>
	);
};
export default Sites;

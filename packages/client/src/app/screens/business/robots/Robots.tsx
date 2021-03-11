import { Box } from '@material-ui/core';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';

const Robots: FC = () => {
	return (
		<Box component="section">
			{/* Page Head */}
			<PageHead title="ROBOTS.TITLE" description="ROBOTS.DESCRIPTION" />
		</Box>
	);
};
export default Robots;

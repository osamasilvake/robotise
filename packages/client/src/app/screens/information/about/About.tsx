import { Box } from '@material-ui/core';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';

const About: FC = () => {
	return (
		<Box component="section">
			{/* Page Head */}
			<PageHead title="ABOUT.TITLE" description="ABOUT.DESCRIPTION" />
		</Box>
	);
};
export default About;

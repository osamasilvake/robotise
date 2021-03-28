import { Paper } from '@material-ui/core';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';

const Sites: FC = () => {
	return (
		<Paper elevation={12} component="section">
			{/* Page Head */}
			<PageHead title="SITES.TITLE" description="SITES.DESCRIPTION" />
		</Paper>
	);
};
export default Sites;

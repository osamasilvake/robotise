import { Paper } from '@material-ui/core';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';

const Site: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="SITES.SITE.TITLE" description="SITES.SITE.DESCRIPTION" />
		</Paper>
	);
};
export default Site;

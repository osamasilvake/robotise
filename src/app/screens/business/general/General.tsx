import { Paper } from '@mui/material';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import GeneralContent from './GeneralContent';

const General: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead title="GENERAL.TITLE" description="GENERAL.DESCRIPTION" />

			{/* Content */}
			<GeneralContent />
		</Paper>
	);
};
export default General;

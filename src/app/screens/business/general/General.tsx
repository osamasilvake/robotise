import { Paper } from '@mui/material';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import { AppConfigService } from '../../../services';
import GenTabs from './Gen.tabs';

const General: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead
				title="GENERAL.TITLE"
				description="GENERAL.DESCRIPTION"
				disableGeneralTab={AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.MAIN}
			/>

			{/* Content */}
			<GenTabs />
		</Paper>
	);
};
export default General;

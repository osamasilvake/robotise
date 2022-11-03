import { Paper } from '@mui/material';
import { FC } from 'react';

import PageHead from '../../../components/content/page-head/PageHead';
import { AppConfigService } from '../../../services';
import SetupTabs from './Setup.tabs';

const Setup: FC = () => {
	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead
				title="SETUP.TITLE"
				description="SETUP.DESCRIPTION"
				disableGeneralTab={AppConfigService.AppRoutes.SCREENS.SETTINGS.SETUP.MAIN}
			/>

			{/* Content */}
			<SetupTabs />
		</Paper>
	);
};
export default Setup;

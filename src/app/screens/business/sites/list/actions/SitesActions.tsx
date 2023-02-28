import { Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { SitesActionsStyle } from './SitesActions.style';
import SitesCreate from './SitesCreate';
import SitesHidden from './SitesHidden';
import SitesSearch from './SitesSearch';

const SitesActions: FC = () => {
	const classes = SitesActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack
				spacing={0.5}
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				flexWrap="wrap">
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					flexWrap="wrap">
					{/* Hidden */}
					<SitesHidden />

					{/* Search */}
					<SitesSearch />
				</Stack>

				{/* Create Site */}
				<SitesCreate />
			</Stack>
		</Paper>
	);
};
export default SitesActions;

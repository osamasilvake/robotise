import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { SiteRoomsActionsInterface } from './SiteRoomsActions.interface';
import { SiteRoomsActionsStyle } from './SiteRoomsActions.style';
import SiteRoomsActiveRooms from './SiteRoomsActiveRooms';
import SiteRoomsInactiveRooms from './SiteRoomsInactiveRooms';
import SiteRoomsSearchRooms from './SiteRoomsSearchRooms';

const SiteRoomsActions: FC<SiteRoomsActionsInterface> = (props) => {
	const { active, inactive, searchText } = props;
	const classes = SiteRoomsActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack
				spacing={0.5}
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				flexWrap="wrap">
				<Box>
					{/* Active Rooms */}
					<SiteRoomsActiveRooms active={active} />

					{/* Inactive Rooms */}
					<SiteRoomsInactiveRooms inactive={inactive} />
				</Box>
				<Stack
					spacing={0.5}
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					flexWrap="wrap">
					{/* Search Rooms */}
					<SiteRoomsSearchRooms
						active={active}
						inactive={inactive}
						searchText={searchText}
					/>
				</Stack>
			</Stack>
		</Paper>
	);
};
export default SiteRoomsActions;

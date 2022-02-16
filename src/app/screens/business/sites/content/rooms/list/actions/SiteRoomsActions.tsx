import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { SiteRoomsActionsInterface } from './SiteRoomsActions.interface';
import { SiteRoomsActionsStyle } from './SiteRoomsActions.style';
import SiteRoomsActiveRooms from './SiteRoomsActiveRooms';
import SiteRoomsInactiveRooms from './SiteRoomsInactiveRooms';
import SiteRoomsModifyRooms from './SiteRoomsModifyRooms';

const SiteRoomsActions: FC<SiteRoomsActionsInterface> = (props) => {
	const { active, inactive } = props;
	const classes = SiteRoomsActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Box>
					{/* Active Rooms */}
					<SiteRoomsActiveRooms active={active} />

					{/* Inactive Rooms */}
					<SiteRoomsInactiveRooms inactive={inactive} />
				</Box>
				<Box>
					{/* Modify Rooms */}
					<SiteRoomsModifyRooms />
				</Box>
			</Stack>
		</Paper>
	);
};
export default SiteRoomsActions;

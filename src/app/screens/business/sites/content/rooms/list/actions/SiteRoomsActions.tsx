import { Box, Paper } from '@material-ui/core';
import { FC } from 'react';

import { FloatStyle } from '../../../../../../../utilities/styles/Float.style';
import { SiteRoomsActionsInterface } from './SiteRoomsActions.interface';
import SiteRoomsActiveRooms from './SiteRoomsActiveRooms';
import SiteRoomsInactiveRooms from './SiteRoomsInactiveRooms';

const SiteRoomsActions: FC<SiteRoomsActionsInterface> = (props) => {
	const { active, inactive } = props;
	const floatStyle = FloatStyle();

	return (
		<Paper elevation={2} square className={floatStyle.sFloat1}>
			<Box>
				{/* Active Rooms */}
				<SiteRoomsActiveRooms active={active} />

				{/* Inactive Rooms */}
				<SiteRoomsInactiveRooms inactive={inactive} />
			</Box>
		</Paper>
	);
};
export default SiteRoomsActions;

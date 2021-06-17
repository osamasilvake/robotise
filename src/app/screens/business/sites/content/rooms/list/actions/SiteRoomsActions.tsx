import { Box, Paper, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyle } from '../../../../../../../utilities/styles/Float.style';
import { SiteRoomsActionsInterface } from './SiteRoomsActions.interface';
import SiteRoomsActiveRooms from './SiteRoomsActiveRooms';
import SiteRoomsInactiveRooms from './SiteRoomsInactiveRooms';

const SiteRoomsActions: FC<SiteRoomsActionsInterface> = (props) => {
	const { active, inactive } = props;
	const { t } = useTranslation('SITES');
	const floatStyle = FloatStyle();

	return (
		<Paper elevation={2} square className={floatStyle.sFloat1}>
			<Box>
				{/* Heading */}
				<Typography variant="h6" color="textSecondary">
					{t('CONTENT.ROOMS.LIST.ACTIONS.HEADINGS.FILTERS')}
				</Typography>

				{/* Active Rooms */}
				<SiteRoomsActiveRooms active={active} />

				{/* Inactive Rooms */}
				<SiteRoomsInactiveRooms inactive={inactive} />
			</Box>
		</Paper>
	);
};
export default SiteRoomsActions;

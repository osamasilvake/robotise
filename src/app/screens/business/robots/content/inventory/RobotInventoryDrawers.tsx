import { Box } from '@material-ui/core';
import { FC } from 'react';

import { RobotInventoryDrawersInterface } from './RobotInventory.interface';
import RobotInventoryDrawer from './RobotInventoryDrawer';

const RobotInventoryDrawers: FC<RobotInventoryDrawersInterface> = (props) => {
	const { inventory } = props;

	return inventory && inventory.content ? (
		<Box>
			{inventory.content.drawers.map((drawer) => (
				<RobotInventoryDrawer
					key={drawer.index}
					drawer={drawer}
					isLastDrawer={(inventory.content?.drawers.length || 0) - 1 === drawer.index}
				/>
			))}
		</Box>
	) : null;
};
export default RobotInventoryDrawers;

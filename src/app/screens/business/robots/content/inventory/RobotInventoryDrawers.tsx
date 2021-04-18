import { Box } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { inventorySelector } from '../../../../../slices/inventory/Inventory.slice';
import RobotInventoryDrawer from './RobotInventoryDrawer';

const RobotInventoryDrawers: FC = () => {
	const inventory = useSelector(inventorySelector);

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

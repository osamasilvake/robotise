import { Box } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { inventorySelector } from '../../../../../slices/inventory/Inventory.slice';
import RobotInventoryDrawer from './RobotInventoryDrawer';

const RobotInventoryDrawers: FC = () => {
	const inventory = useSelector(inventorySelector);

	return (
		<Box>
			{inventory &&
				inventory.content?.drawers.map((drawer) => (
					<RobotInventoryDrawer key={drawer.index} drawer={drawer} />
				))}
		</Box>
	);
};
export default RobotInventoryDrawers;

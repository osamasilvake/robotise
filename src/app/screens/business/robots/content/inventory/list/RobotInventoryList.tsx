import { Box } from '@material-ui/core';
import { FC } from 'react';

import RobotInventoryInfo from './info/RobotInventoryInfo';
import { RobotInventoryListInterface } from './RobotInventoryList.interface';
import RobotInventoryTable from './table/RobotInventoryTable';

const RobotInventoryList: FC<RobotInventoryListInterface> = (props) => {
	const { inventory } = props;

	return inventory && inventory.content ? (
		<Box>
			{inventory.content.drawers.map((drawer) => (
				<Box key={drawer.index}>
					{/* Info */}
					<RobotInventoryInfo drawer={drawer} />

					{/* Table */}
					<RobotInventoryTable
						drawer={drawer}
						isLastDrawer={(inventory.content?.drawers.length || 0) - 1 === drawer.index}
					/>
				</Box>
			))}
		</Box>
	) : null;
};
export default RobotInventoryList;

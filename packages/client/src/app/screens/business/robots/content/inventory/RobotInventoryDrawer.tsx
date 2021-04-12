import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@material-ui/core';
import { Box } from '@material-ui/core';
import { FC } from 'react';

import { RobotInventoryDrawerInterface } from './RobotInventory.interface';

const RobotInventoryDrawer: FC<RobotInventoryDrawerInterface> = (props) => {
	const { drawer } = props;

	return (
		<Box>
			{/* Title */}
			<Typography variant="h4">{drawer.title}</Typography>

			{/* List */}
			<TableContainer>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Size</TableCell>
							<TableCell>Quantity</TableCell>
							<TableCell>Capacity</TableCell>
							<TableCell>Price</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{drawer &&
							drawer.lanes.map(
								(lane) =>
									lane && (
										<TableRow key={lane.index}>
											<TableCell>{lane.product?.name}</TableCell>
											<TableCell>{lane.product?.volume}</TableCell>
											<TableCell>{lane.quantity}</TableCell>
											<TableCell>{lane.capacity}</TableCell>
											<TableCell>{lane.product?.price}</TableCell>
										</TableRow>
									)
							)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};
export default RobotInventoryDrawer;

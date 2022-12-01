import { Table, TableContainer } from '@mui/material';
import { FC } from 'react';

import { RobotOrderTableInterface } from './RobotOrderTable.interface';
import { columns } from './RobotOrderTable.list';
import RobotOrderTableBody from './RobotOrderTableBody';
import RobotOrderTableHead from './RobotOrderTableHead';

const RobotOrderTable: FC<RobotOrderTableInterface> = (props) => {
	const { order } = props;

	return (
		<TableContainer>
			<Table>
				{/* Head */}
				<RobotOrderTableHead columns={columns} />

				{/* Body */}
				<RobotOrderTableBody order={order} />
			</Table>
		</TableContainer>
	);
};
export default RobotOrderTable;

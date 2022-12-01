import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';

import {
	RobotOrderTableBodyInterface,
	RobotOrderTableColumnInterface
} from './RobotOrderTable.interface';
import { columns } from './RobotOrderTable.list';
import RobotOrderTableBodyCell from './RobotOrderTableBodyCell';

const RobotOrderTableBody: FC<RobotOrderTableBodyInterface> = (props) => {
	const { order } = props;

	const history = order?.content?.history || [];

	return (
		<TableBody>
			{history?.map((item, index) => (
				<TableRow key={String(item.createdAt)}>
					{columns.map((column: RobotOrderTableColumnInterface) => (
						<RobotOrderTableBodyCell
							key={column.id}
							column={column}
							order={item}
							nextOrder={history[index + 1]}
							firstOrder={history[0]}
						/>
					))}
				</TableRow>
			))}
		</TableBody>
	);
};
export default RobotOrderTableBody;

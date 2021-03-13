import { TableCell, TableHead, TableRow } from '@material-ui/core';
import { FC } from 'react';

import {
	RobotsListTableColumnInterface,
	RobotsListTableHeadInterface
} from './RobotsList.interface';

const RobotsListTableHead: FC<RobotsListTableHeadInterface> = (props) => {
	const { columns } = props;

	return (
		<TableHead>
			<TableRow>
				{columns?.map((column: RobotsListTableColumnInterface) => (
					<TableCell
						key={column.id}
						align={column.align}
						style={{ minWidth: column.minWidth }}>
						{column.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};
export default RobotsListTableHead;

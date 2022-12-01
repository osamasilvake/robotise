import { TableBody, TableRow } from '@mui/material';
import { FC } from 'react';

import {
	GeneralAllOrderTableBodyInterface,
	GeneralAllOrderTableColumnInterface
} from './GeneralAllOrderTable.interface';
import { columns } from './GeneralAllOrderTable.list';
import GeneralAllOrderTableBodyCell from './GeneralAllOrderTableBodyCell';

const GeneralAllOrderTableBody: FC<GeneralAllOrderTableBodyInterface> = (props) => {
	const { order } = props;

	const history = order?.content?.history || [];

	return (
		<TableBody>
			{history?.map((item, index) => (
				<TableRow key={String(item.createdAt)}>
					{columns.map((column: GeneralAllOrderTableColumnInterface) => (
						<GeneralAllOrderTableBodyCell
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
export default GeneralAllOrderTableBody;

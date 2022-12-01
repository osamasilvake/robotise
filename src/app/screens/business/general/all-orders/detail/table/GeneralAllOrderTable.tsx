import { Table, TableContainer } from '@mui/material';
import { FC } from 'react';

import { GeneralAllOrderTableInterface } from './GeneralAllOrderTable.interface';
import { columns } from './GeneralAllOrderTable.list';
import GeneralAllOrderTableBody from './GeneralAllOrderTableBody';
import GeneralAllOrderTableHead from './GeneralAllOrderTableHead';

const GeneralAllOrderTable: FC<GeneralAllOrderTableInterface> = (props) => {
	const { order } = props;

	return (
		<TableContainer>
			<Table>
				{/* Head */}
				<GeneralAllOrderTableHead columns={columns} />

				{/* Body */}
				<GeneralAllOrderTableBody order={order} />
			</Table>
		</TableContainer>
	);
};
export default GeneralAllOrderTable;

import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { GeneralAllPhoneCallsTableColumnsTypeEnum } from './GeneralAllPhoneCallsTable.enum';
import {
	GeneralAllPhoneCallsTableColumnInterface,
	GeneralAllPhoneCallsTableHeadInterface
} from './GeneralAllPhoneCallsTable.interface';

const GeneralAllPhoneCallsTableHead: FC<GeneralAllPhoneCallsTableHeadInterface> = (props) => {
	const { columns, order, orderBy, onRequestSort } = props;
	const { t } = useTranslation('GENERAL');

	/**
	 * handle sort request
	 * @param property
	 * @returns
	 */
	const handleSortRequest =
		(property: GeneralAllPhoneCallsTableColumnsTypeEnum) => (event: MouseEvent) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				{columns.map((column: GeneralAllPhoneCallsTableColumnInterface) => (
					<TableCell
						key={column.id}
						align={column.align}
						style={{
							minWidth: column.minWidth,
							width: column.width,
							padding: column?.padding
						}}
						sortDirection={orderBy === column.id ? order : false}>
						<TableSortLabel
							disabled={column.noSort}
							active={orderBy === column.id}
							direction={orderBy === column.id ? order : 'asc'}
							onClick={handleSortRequest(column.id)}>
							{t(column.label)}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};
export default GeneralAllPhoneCallsTableHead;

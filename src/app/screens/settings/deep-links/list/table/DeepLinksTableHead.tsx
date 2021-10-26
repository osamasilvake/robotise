import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { DeepLinksTableColumnsTypeEnum } from './DeepLinksTable.enum';
import {
	DeepLinksTableColumnInterface,
	DeepLinksTableHeadInterface
} from './DeepLinksTable.interface';

const DeepLinksTableHead: FC<DeepLinksTableHeadInterface> = (props) => {
	const { columns, order, orderBy, onRequestSort } = props;
	const { t } = useTranslation('DEEP_LINKS');

	/**
	 * handle sort request
	 * @param property
	 * @returns
	 */
	const handleSortRequest = (property: DeepLinksTableColumnsTypeEnum) => (event: MouseEvent) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{columns.map((column: DeepLinksTableColumnInterface) => (
					<TableCell
						key={column.id}
						align={column.align}
						style={{
							minWidth: column.minWidth,
							width: column.width
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
export default DeepLinksTableHead;

import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { AlertCodesTableColumnsTypeEnum } from './AlertCodesTable.enum';
import {
	AlertCodesTableColumnInterface,
	AlertCodesTableHeadInterface
} from './AlertCodesTable.interface';

const AlertCodesTableHead: FC<AlertCodesTableHeadInterface> = (props) => {
	const { columns, order, orderBy, onRequestSort } = props;
	const { t } = useTranslation('ALERT_CODES');

	/**
	 * handle sort request
	 * @param property
	 * @returns
	 */
	const handleSortRequest = (property: AlertCodesTableColumnsTypeEnum) => (event: MouseEvent) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{columns.map((column: AlertCodesTableColumnInterface) => (
					<TableCell
						key={column.id}
						align={column.align}
						style={{
							minWidth: column.minWidth,
							width: column.width
						}}
						sortDirection={orderBy === column.id ? order : false}>
						<TableSortLabel
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
export default AlertCodesTableHead;

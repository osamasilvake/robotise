import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { SiteSMSListTableColumnsTypeEnum } from './SiteSMSListTable.enum';
import {
	SiteSMSListTableColumnInterface,
	SiteSMSListTableHeadInterface
} from './SiteSMSListTable.interface';

const SiteSMSListTableHead: FC<SiteSMSListTableHeadInterface> = (props) => {
	const { columns, order, orderBy, onRequestSort } = props;
	const { t } = useTranslation('SITES');

	/**
	 * handle sort request
	 * @param property
	 * @returns
	 */
	const handleSortRequest =
		(property: SiteSMSListTableColumnsTypeEnum) => (event: MouseEvent) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				{columns.map((column: SiteSMSListTableColumnInterface) => (
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
export default SiteSMSListTableHead;

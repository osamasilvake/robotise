import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotsTableColumnsTypeEnum } from './RobotsTable.enum';
import { RobotsTableColumnInterface, RobotsTableHeadInterface } from './RobotsTable.interface';

const RobotsTableHead: FC<RobotsTableHeadInterface> = (props) => {
	const { columns, order, orderBy, onRequestSort } = props;
	const { t } = useTranslation('ROBOTS');

	/**
	 * handle sort request
	 * @param property
	 * @returns
	 */
	const handleSortRequest = (property: RobotsTableColumnsTypeEnum) => (event: MouseEvent) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{columns.map((column: RobotsTableColumnInterface) => (
					<TableCell
						key={column.id}
						align={column.align}
						style={{ minWidth: column.minWidth, width: column.width }}
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
export default RobotsTableHead;

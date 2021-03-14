import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import {
	RobotsListTableColumnInterface,
	RobotsListTableHeadId,
	RobotsListTableHeadInterface
} from './RobotsList.interface';

const RobotsListTableHead: FC<RobotsListTableHeadInterface> = (props) => {
	const { columns, order, orderBy, onRequestSort } = props;
	const { t } = useTranslation('ROBOTS');

	/**
	 * create sort handler
	 * @param property
	 * @returns
	 */
	const createSortHandler = (property: RobotsListTableHeadId) => (event: MouseEvent) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{columns?.map((column: RobotsListTableColumnInterface) => (
					<TableCell
						key={column.id}
						align={column.align}
						style={{ minWidth: column.minWidth }}
						sortDirection={orderBy === column.id ? order : false}>
						<TableSortLabel
							active={orderBy === column.id}
							direction={orderBy === column.id ? order : 'asc'}
							onClick={createSortHandler(column.id)}>
							{t(column.label)}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};
export default RobotsListTableHead;

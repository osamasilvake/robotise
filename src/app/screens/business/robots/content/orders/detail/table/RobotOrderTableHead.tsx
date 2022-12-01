import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
	RobotOrderTableColumnInterface,
	RobotOrderTableHeadInterface
} from './RobotOrderTable.interface';

const RobotOrderTableHead: FC<RobotOrderTableHeadInterface> = (props) => {
	const { columns } = props;
	const { t } = useTranslation('GENERAL');

	return (
		<TableHead>
			<TableRow>
				{columns.map((column: RobotOrderTableColumnInterface) => (
					<TableCell
						key={column.id}
						align={column.align}
						style={{
							minWidth: column.minWidth,
							width: column.width
						}}>
						<TableSortLabel>{t(column.label)}</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};
export default RobotOrderTableHead;

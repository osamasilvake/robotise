import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
	GeneralAllOrderTableColumnInterface,
	GeneralAllOrderTableHeadInterface
} from './GeneralAllOrderTable.interface';

const GeneralAllOrderTableHead: FC<GeneralAllOrderTableHeadInterface> = (props) => {
	const { columns } = props;
	const { t } = useTranslation('GENERAL');

	return (
		<TableHead>
			<TableRow>
				{columns.map((column: GeneralAllOrderTableColumnInterface) => (
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
export default GeneralAllOrderTableHead;

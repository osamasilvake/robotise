import { Checkbox, TableCell } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../../components/common/status/Status';
import { SOCDataInterface } from '../../../../../../../slices/orders/Orders.slice.interface';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import {
	RobotOrdersTableBodyCellInterface,
	RobotOrdersTableColumnInterface
} from './RobotOrdersTable.interface';
import { columns } from './RobotOrdersTable.list';
import { mapStatusLevel } from './RobotOrdersTable.map';

const RobotOrdersTableBodyCell: FC<RobotOrdersTableBodyCellInterface> = (props) => {
	const { column, order } = props;
	const { t } = useTranslation('ROBOTS');

	/**
	 * set cell value
	 * @param robot
	 * @param column
	 * @returns
	 */
	const setCellValue = (order: SOCDataInterface, column: RobotOrdersTableColumnInterface) => {
		const value = order[column.id];
		if (columns[0].id === column.id && typeof value === 'string') {
			return (
				<Status level={mapStatusLevel(value)}>
					{t(`CONTENT.ORDERS.LIST.TABLE.VALUES.STATUS.${value.replace(':', '_')}`)}
				</Status>
			);
		} else if (columns[1].id === column.id) {
			return value ? value : t('CONTENT.ORDERS.LIST.TABLE.VALUES.TARGET.RECEPTION');
		} else if (columns[2].id === column.id) {
			return t(`CONTENT.ORDERS.LIST.TABLE.VALUES.MODE.${value}`);
		} else if (columns[3].id === column.id) {
			return momentFormat1(value);
		} else if (columns[4].id === column.id) {
			return t(`CONTENT.ORDERS.LIST.TABLE.VALUES.ORIGIN.${value}`);
		} else if (columns[5].id === column.id) {
			return <Checkbox disabled name="testOrder" checked={!!value} />;
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(order, column)}
		</TableCell>
	);
};
export default RobotOrdersTableBodyCell;

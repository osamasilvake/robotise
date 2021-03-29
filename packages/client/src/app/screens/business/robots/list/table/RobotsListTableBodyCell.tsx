import { TableCell } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../components/common/status/Status';
import { RTSFinalDataInterface } from '../../../../../slices/robot-twins/RobotTwinsSummary.slice.interface';
import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import {
	RobotsListTableBodyCellInterface,
	RobotsListTableColumnInterface
} from './RobotsListTable.interface';
import { columns } from './RobotsListTable.list';

const RobotsListTableBodyCell: FC<RobotsListTableBodyCellInterface> = (props) => {
	const { column, robot } = props;
	const { t } = useTranslation('ROBOTS');

	/**
	 * set cell value
	 * @param robot
	 * @param column
	 * @returns
	 */
	const setCellValue = (robot: RTSFinalDataInterface, column: RobotsListTableColumnInterface) => {
		const value = robot[column.id];
		if (columns[2].id === column.id) {
			return (
				<Status active={robot.isReady}>
					{robot.isReady ? t('LIST.TABLE.VALUES.ON') : t('LIST.TABLE.VALUES.OFF')}
				</Status>
			);
		} else if (columns[3].id === column.id) {
			return (
				<Status active={robot.acceptOrders}>
					{robot.acceptOrders
						? t('LIST.TABLE.VALUES.ACTIVE')
						: t('LIST.TABLE.VALUES.INACTIVE')}
				</Status>
			);
		} else if (columns[4].id === column.id) {
			return momentFormat1(value);
		} else if (columns[5].id === column.id) {
			return `${robot.alerts.danger}/${robot.alerts.warning}`;
		}
		return value;
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(robot, column)}
		</TableCell>
	);
};
export default RobotsListTableBodyCell;

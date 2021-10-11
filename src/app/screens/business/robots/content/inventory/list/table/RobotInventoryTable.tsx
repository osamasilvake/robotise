import {
	Avatar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';
import clsx from 'clsx';
import i18next from 'i18next';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Status from '../../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../../services';
import { SICDrawerLaneInterface } from '../../../../../../../slices/business/robots/inventory/Inventory.slice.interface';
import { robotTwinsSummarySelector } from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { RobotInventoryTableColumnsTypeEnum } from './RobotInventoryTable.enum';
import {
	RobotInventoryTableColumnInterface,
	RobotInventoryTableInterface
} from './RobotInventoryTable.interface';
import { columns } from './RobotInventoryTable.list';
import { mapStatus } from './RobotInventoryTable.map';
import { RobotsInventoryTableStyle } from './RobotInventoryTable.style';

const RobotInventoryTable: FC<RobotInventoryTableInterface> = (props) => {
	const { drawer, isLastDrawer } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotsInventoryTableStyle();

	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const params: RobotParamsInterface = useParams();
	const cRobotId = params.robotId;
	const currency = robotTwinsSummary.content?.dataById[cRobotId]?.siteCurrency;
	const none = AppConfigService.AppOptions.common.none;

	/**
	 * set cell value
	 * @param lane
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		lane: SICDrawerLaneInterface,
		column: RobotInventoryTableColumnInterface
	) => {
		switch (column.id) {
			case RobotInventoryTableColumnsTypeEnum.IMAGE:
				return (
					<Avatar
						variant="square"
						className={clsx(classes.sImage, {
							[classes.sImageBackground]:
								lane.product &&
								lane.product[RobotInventoryTableColumnsTypeEnum.PRICE] === 1
						})}
						src={
							(lane.product && lane.product[column.id]) ||
							AppConfigService.AppImageURLs.logo.iconOff
						}
						alt={
							(lane.product && lane.product.name) ||
							AppConfigService.AppImageURLs.logo.name
						}
					/>
				);
			case RobotInventoryTableColumnsTypeEnum.QUANTITY:
				return <Status level={mapStatus(lane.status)}>{lane[column.id]}</Status>;
			case RobotInventoryTableColumnsTypeEnum.CAPACITY:
				return lane[column.id];
			case RobotInventoryTableColumnsTypeEnum.PRICE:
				return lane.product && currency
					? `${currencyFormat(lane.product[column.id], currency, i18next.language)}`
					: none;
			default:
				return lane.product ? lane.product[column.id] || none : none;
		}
	};

	return drawer ? (
		<TableContainer
			className={clsx({
				[classes.sTableContainer]: !isLastDrawer
			})}>
			<Table>
				<TableHead>
					<TableRow>
						{columns.map((column: RobotInventoryTableColumnInterface) => (
							<TableCell
								key={column.id}
								align={column.align}
								style={{
									minWidth: column.minWidth,
									width: column.width
								}}>
								{t(column.label)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{drawer.lanes.map((lane) => (
						<TableRow key={lane.index}>
							{columns.map((column: RobotInventoryTableColumnInterface) => (
								<TableCell key={column.id} align={column.align}>
									{setCellValue(lane, column)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	) : null;
};
export default RobotInventoryTable;

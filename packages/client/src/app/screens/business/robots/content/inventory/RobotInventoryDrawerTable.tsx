import {
	Avatar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Status from '../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../services';
import { InventoryContentDrawerLaneInterface } from '../../../../../slices/inventory/Inventory.slice.interface';
import { robotTwinsSummarySelector } from '../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import { RobotInventoryColumnsTypeEnum } from './RobotInventory.enum';
import {
	RobotInventoryDrawerInterface,
	RobotInventoryTableColumnInterface
} from './RobotInventory.interface';
import { columns } from './RobotInventory.list';
import { mapStatusLevel } from './RobotInventory.map';
import { RobotsInventoryStyles } from './RobotInventory.style';

const RobotInventoryDrawerTable: FC<RobotInventoryDrawerInterface> = (props) => {
	const { drawer, isLastDrawer } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotsInventoryStyles();

	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const params: RobotParamsInterface = useParams();
	const cSiteId = robotTwinsSummary.content?.dataById[params.robot]?.site.id;
	const currency = (cSiteId && sites.content?.dataById[cSiteId]?.currency) || '€';

	/**
	 * set cell value
	 * @param lane
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		lane: InventoryContentDrawerLaneInterface,
		column: RobotInventoryTableColumnInterface
	) => {
		switch (column.id) {
			case RobotInventoryColumnsTypeEnum.IMAGE:
				return (
					<Avatar
						variant="square"
						className={clsx(classes.sImage, {
							[classes.sImageBg]:
								lane.product &&
								lane.product[RobotInventoryColumnsTypeEnum.PRICE] === 1 &&
								lane[RobotInventoryColumnsTypeEnum.QUANTITY] === 0 &&
								lane[RobotInventoryColumnsTypeEnum.QUANTITY] ===
									lane[RobotInventoryColumnsTypeEnum.CAPACITY]
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
			case RobotInventoryColumnsTypeEnum.QUANTITY:
				return <Status level={mapStatusLevel(lane['status'])}>{lane[column.id]}</Status>;
			case RobotInventoryColumnsTypeEnum.CAPACITY:
				return lane[column.id];
			case RobotInventoryColumnsTypeEnum.PRICE:
				return lane.product ? `${currency} ${lane.product[column.id]}` : '-';
			default:
				return lane.product ? lane.product[column.id] || '-' : '-';
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
export default RobotInventoryDrawerTable;

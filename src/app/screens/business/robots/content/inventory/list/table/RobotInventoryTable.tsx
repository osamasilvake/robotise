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
import i18next from 'i18next';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Status from '../../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../../services';
import { SICDrawerLaneInterface } from '../../../../../../../slices/inventory/Inventory.slice.interface';
import { robotTwinsSummarySelector } from '../../../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../../../slices/sites/Sites.slice';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { RobotInventoryTableColumnsTypeEnum } from './RobotInventoryTable.enum';
import {
	RobotInventoryTableColumnInterface,
	RobotInventoryTableInterface
} from './RobotInventoryTable.interface';
import { columns } from './RobotInventoryTable.list';
import { mapStatusLevel } from './RobotInventoryTable.map';
import { RobotsInventoryTableStyles } from './RobotInventoryTable.style';

const RobotInventoryTable: FC<RobotInventoryTableInterface> = (props) => {
	const { drawer, isLastDrawer } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotsInventoryTableStyles();

	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const params: RobotParamsInterface = useParams();
	const siteId = robotTwinsSummary.content?.dataById[params.robot]?.site.id;
	const currency =
		(siteId && sites.content?.dataById[siteId]?.currency) ||
		AppConfigService.AppOptions.common.defaultCurrency;
	const unknown = 'N/A';

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
							[classes.sImageBg]:
								lane.product &&
								lane.product[RobotInventoryTableColumnsTypeEnum.PRICE] === 1 &&
								lane[RobotInventoryTableColumnsTypeEnum.QUANTITY] === 0 &&
								lane[RobotInventoryTableColumnsTypeEnum.QUANTITY] ===
									lane[RobotInventoryTableColumnsTypeEnum.CAPACITY]
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
				return <Status level={mapStatusLevel(lane['status'])}>{lane[column.id]}</Status>;
			case RobotInventoryTableColumnsTypeEnum.CAPACITY:
				return lane[column.id];
			case RobotInventoryTableColumnsTypeEnum.PRICE:
				return lane.product
					? `${currencyFormat(lane.product[column.id], currency, i18next.language)}`
					: unknown;
			default:
				return lane.product ? lane.product[column.id] || unknown : unknown;
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

import {
	Avatar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@material-ui/core';
import { Box } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Status from '../../../../../components/common/status/Status';
import { StatusTypeEnum } from '../../../../../components/common/status/Status.enum';
import { AppConfigService } from '../../../../../services';
import { InventoryContentDrawerLaneInterface } from '../../../../../slices/inventory/Inventory.slice.interface';
import { robotTwinsSummarySelector } from '../../../../../slices/robot-twins/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import { RobotInventoryColumnsTypeEnum, RobotInventoryStatusTypeEnum } from './RobotInventory.enum';
import {
	RobotInventoryDrawerInterface,
	RobotInventoryTableColumnInterface
} from './RobotInventory.interface';
import { columns } from './RobotInventory.list';
import { RobotsInventoryStyles } from './RobotInventory.style';

const RobotInventoryDrawer: FC<RobotInventoryDrawerInterface> = (props) => {
	const { drawer, isLastDrawer } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotsInventoryStyles();

	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const params: RobotParamsInterface = useParams();
	const cSiteId = robotTwinsSummary.content?.dataById[params.id]?.site.id;
	const currency = (cSiteId && sites.content?.dataById[cSiteId]?.currency) || '€';

	/**
	 * map product status
	 * @param status
	 * @returns
	 */
	const mapProductStatus = (status: string) => {
		switch (status) {
			case RobotInventoryStatusTypeEnum.HIGH:
				return StatusTypeEnum.SUCCESS;
			case RobotInventoryStatusTypeEnum.MEDIUM:
				return StatusTypeEnum.WARNING;
			case RobotInventoryStatusTypeEnum.LOW:
			default:
				return StatusTypeEnum.ERROR;
		}
	};

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
						className={classes.sImage}
						src={
							(lane.product && lane.product[column.id]) ||
							AppConfigService.AppImageURLs.logo.iconOff
						}
						alt={lane.product ? lane.product.name : ''}
					/>
				);
			case RobotInventoryColumnsTypeEnum.QUANTITY:
				return <Status level={mapProductStatus(lane['status'])}>{lane[column.id]}</Status>;
			case RobotInventoryColumnsTypeEnum.CAPACITY:
				return lane[column.id];
			case RobotInventoryColumnsTypeEnum.PRICE:
				return lane.product ? `${currency} ${lane.product[column.id]}` : '-';
			default:
				return lane.product ? lane.product[column.id] || '-' : '-';
		}
	};

	return drawer ? (
		<Box>
			{/* Title */}
			<Box className={classes.sTitleBox}>
				<Typography variant="caption" color="textSecondary">
					{t(drawer.type)}
				</Typography>
				<Typography variant="h6" color="textSecondary">
					{t(`CONTENT.INVENTORY.DRAWERS.TITLES.${drawer.title.toUpperCase()}`)}
				</Typography>
			</Box>

			{/* Table */}
			<TableContainer
				className={clsx({
					[classes.sTableContainer]: !isLastDrawer
				})}>
				<Table size="small">
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
		</Box>
	) : null;
};
export default RobotInventoryDrawer;

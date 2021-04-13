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
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Status from '../../../../../components/common/status/Status';
import { StatusTypeEnum } from '../../../../../components/common/status/Status.enum';
import { AppConfigService } from '../../../../../services';
import { InventoryContentDrawerLaneInterface } from '../../../../../slices/inventory/Inventory.slice.interface';
import { sitesSelector } from '../../../../../slices/sites/Sites.slice';
import { RobotParamsInterface } from '../../Robot.interface';
import { RobotInventoryStatusTypeEnum } from './RobotInventory.enum';
import {
	RobotInventoryDrawerInterface,
	RobotInventoryTableColumnInterface
} from './RobotInventory.interface';
import { columns } from './RobotInventory.list';
import { RobotsInventoryStyles } from './RobotInventory.style';

const RobotInventoryDrawer: FC<RobotInventoryDrawerInterface> = (props) => {
	const { drawer } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotsInventoryStyles();

	const sites = useSelector(sitesSelector);

	const params: RobotParamsInterface = useParams();
	const currency = sites.content?.dataById[params.id]?.currency || '€';

	/**
	 * map status
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
			case 'image':
				return (
					<Avatar
						src={
							(lane.product && lane.product[column.id]) ||
							AppConfigService.AppImageURLs.logo.iconOff
						}
						alt="product"
						variant="square"
					/>
				);
			case 'quantity':
				return <Status level={mapProductStatus(lane['status'])}>{lane[column.id]}</Status>;
			case 'capacity':
				return lane[column.id];
			case 'price':
				return lane.product ? `${currency} ${lane.product[column.id]}` : '-';
			default:
				return lane.product ? lane.product[column.id] : '-';
		}
	};

	return drawer ? (
		<Box>
			{/* Title */}
			<Typography variant="h6" color="textSecondary" className={classes.sTitle}>
				{t(drawer.title)}
			</Typography>

			{/* Table */}
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((column: RobotInventoryTableColumnInterface) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}>
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

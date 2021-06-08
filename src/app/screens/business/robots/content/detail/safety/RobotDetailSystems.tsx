import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { momentFormat3 } from '../../../../../../utilities/methods/Moment';
import {
	RobotDetailSafetyTableColumnsTypeEnum,
	RobotDetailSafetyTypeEnum
} from './RobotDetailSafety.enum';
import {
	RobotDetailSafetyColumnInterface,
	RobotDetailSystemsInterface
} from './RobotDetailSafety.interface';
import { columns } from './RobotDetailSafety.list';
import { mapSafetyContent } from './RobotDetailSafety.map';
import { RobotDetailSafetyStyles } from './RobotDetailSafety.style';

const RobotDetailSystems: FC<RobotDetailSystemsInterface> = (props) => {
	const { systems } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailSafetyStyles();

	const mappedSystem = systems && mapSafetyContent(systems, RobotDetailSafetyTypeEnum.SYSTEMS);

	return mappedSystem ? (
		<Box className={classes.sStateContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.DETAIL.SAFETY.SYSTEMS.TITLE')}
			</Typography>

			{/* Date */}
			<Typography variant="caption" color="textSecondary">
				{momentFormat3(systems?.updatedAt)}
			</Typography>

			{/* Table */}
			<TableContainer className={classes.sSafetyTable}>
				<Table size="small">
					<TableHead>
						<TableRow>
							{columns.map((column: RobotDetailSafetyColumnInterface) => (
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
						{mappedSystem.map((row) => (
							<TableRow key={row.proto}>
								{columns.map((column: RobotDetailSafetyColumnInterface) => (
									<TableCell
										key={column.id}
										align={column.align}
										className={clsx({
											[classes.sSafetyActive]:
												column.id ===
													RobotDetailSafetyTableColumnsTypeEnum.TRUE &&
												row.value,
											[classes.sSafetyInactive]:
												column.id ===
													RobotDetailSafetyTableColumnsTypeEnum.FALSE &&
												!row.value
										})}>
										{t(row[column.id])}
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
export default RobotDetailSystems;

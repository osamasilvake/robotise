import { Error, ExpandLess, ExpandMore, Report } from '@mui/icons-material';
import {
	alpha,
	Chip,
	Collapse,
	Icon,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../services';
import {
	RobotDetailInformationTypeEnum,
	RobotDetailSafetyKeysTypeEnum,
	RobotDetailSafetySystemCounterTypeEnum
} from './RobotDetailInformation.enum';
import {
	RobotDetailSafetyMappedResultInterface,
	RobotDetailSafetySystemsInterface
} from './RobotDetailInformation.interface';
import { mapSafetyContent } from './RobotDetailInformation.map';
import { RobotDetailInformationStyle } from './RobotDetailInformation.style';

const RobotDetailSafetySystems: FC<RobotDetailSafetySystemsInterface> = (props) => {
	const { systems, isDocked } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailInformationStyle();

	const [open, setOpen] = useState(false);

	const mappedSystem =
		systems && mapSafetyContent(systems, RobotDetailInformationTypeEnum.SAFETY_SYSTEMS);
	const orange = alpha(AppConfigService.AppOptions.colors.c14, 0.09);
	const red = alpha(AppConfigService.AppOptions.colors.c12, 0.09);

	/**
	 * add colors and warnings
	 * @param row
	 * @param counter
	 * @param type
	 * @returns
	 */
	const addColorsAndWarnings = (
		row: RobotDetailSafetyMappedResultInterface,
		counter?: number,
		type?: RobotDetailSafetySystemCounterTypeEnum
	) => {
		const forceStop0Active = !!systems?.properties.forceStop0Active;
		let value1;
		let value2;
		let value3;
		switch (type) {
			case RobotDetailSafetySystemCounterTypeEnum.WARNING:
				value1 = counter;
				value2 = Number(counter) + 1;
				value3 = counter;
				break;
			case RobotDetailSafetySystemCounterTypeEnum.ERROR:
				value1 = counter;
				value2 = counter;
				value3 = Number(counter) + 1;
				break;
			default:
				value1 = undefined;
				value2 = orange;
				value3 = red;
		}

		switch (row.key) {
			case RobotDetailSafetyKeysTypeEnum.FORCE_STOP0_ACTIVE:
				return forceStop0Active ? (row.value && isDocked ? value1 : value3) : value1;
			case RobotDetailSafetyKeysTypeEnum.BRAKE_RELEASED:
			case RobotDetailSafetyKeysTypeEnum.DRIVE_TORQUE_ENABLED:
			case RobotDetailSafetyKeysTypeEnum.NO_STOP:
			case RobotDetailSafetyKeysTypeEnum.NO_DRIVE_STOP:
				return forceStop0Active
					? value1
					: row.value
					? value1
					: row.warning
					? value2
					: value3;
			default:
				return row.opposite
					? !row.value
						? value1
						: row.warning
						? value2
						: value3
					: row.value
					? value1
					: row.warning
					? value2
					: value3;
		}
	};

	// warnings
	const warnings = mappedSystem?.reduce(
		(counter, row) =>
			Number(
				addColorsAndWarnings(row, counter, RobotDetailSafetySystemCounterTypeEnum.WARNING)
			),
		0
	);

	// errors
	const errors = mappedSystem?.reduce(
		(counter, row) =>
			Number(
				addColorsAndWarnings(row, counter, RobotDetailSafetySystemCounterTypeEnum.ERROR)
			),
		0
	);

	return mappedSystem ? (
		<List className={classes.sList}>
			<ListItemButton selected onClick={() => setOpen(!open)}>
				{/* Text */}
				<ListItemText primary={t('CONTENT.DETAIL.INFORMATION.SAFETY_SYSTEMS.TITLE')} />

				{/* Warnings */}
				{!!warnings && (
					<Chip
						size="small"
						label={warnings}
						color="warning"
						icon={<Report />}
						className={classes.sListChip}
					/>
				)}

				{/* Errors */}
				{!!errors && (
					<Chip
						size="small"
						label={errors}
						color="error"
						icon={<Error />}
						className={classes.sListChip}
					/>
				)}

				{/* Collapse */}
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			{mappedSystem.map((row) => (
				<Collapse key={row.label} in={open} timeout="auto" unmountOnExit>
					<ListItem style={{ backgroundColor: String(addColorsAndWarnings(row)) }}>
						<ListItemIcon>
							<Icon>{t(row.icon)}</Icon>
						</ListItemIcon>
						<ListItemText
							primary={t(row.label)}
							secondary={row.value ? t(row.msg1) : t(row.msg2)}
						/>
					</ListItem>
				</Collapse>
			))}
		</List>
	) : null;
};
export default RobotDetailSafetySystems;

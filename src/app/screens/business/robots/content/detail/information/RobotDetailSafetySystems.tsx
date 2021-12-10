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
	RobotDetailSafetySystemKeysTypeEnum
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

	const warnings = mappedSystem?.reduce((counter, row) => {
		const forceStop0Active = !!systems?.properties.forceStop0Active;
		switch (row.key) {
			case RobotDetailSafetySystemKeysTypeEnum.FORCE_STOP0_ACTIVE:
				return counter;
			case RobotDetailSafetySystemKeysTypeEnum.BRAKE_RELEASED:
			case RobotDetailSafetySystemKeysTypeEnum.DRIVE_TORQUE_ENABLED:
			case RobotDetailSafetySystemKeysTypeEnum.NO_STOP:
			case RobotDetailSafetySystemKeysTypeEnum.NO_DRIVE_STOP:
				return forceStop0Active
					? counter
					: row.value
					? counter
					: row.warning
					? (counter += 1)
					: counter;
			default:
				return row.opposite
					? !row.value
						? counter
						: row.warning
						? (counter += 1)
						: counter
					: row.value
					? counter
					: row.warning
					? (counter += 1)
					: counter;
		}
	}, 0);

	const errors = mappedSystem?.reduce((counter, row) => {
		const forceStop0Active = !!systems?.properties.forceStop0Active;
		switch (row.key) {
			case RobotDetailSafetySystemKeysTypeEnum.FORCE_STOP0_ACTIVE:
				return row.opposite ? (row.value && isDocked ? counter : (counter += 1)) : counter;
			case RobotDetailSafetySystemKeysTypeEnum.BRAKE_RELEASED:
			case RobotDetailSafetySystemKeysTypeEnum.DRIVE_TORQUE_ENABLED:
			case RobotDetailSafetySystemKeysTypeEnum.NO_STOP:
			case RobotDetailSafetySystemKeysTypeEnum.NO_DRIVE_STOP:
				return forceStop0Active
					? counter
					: row.value
					? counter
					: row.warning
					? counter
					: (counter += 1);
			default:
				return row.opposite
					? !row.value
						? counter
						: row.warning
						? counter
						: (counter += 1)
					: row.value
					? counter
					: row.warning
					? counter
					: (counter += 1);
		}
	}, 0);

	/**
	 * apply background color
	 * @param row
	 * @returns
	 */
	const applyBackgroundColor = (row: RobotDetailSafetyMappedResultInterface) => {
		const forceStop0Active = !!systems?.properties.forceStop0Active;
		switch (row.key) {
			case RobotDetailSafetySystemKeysTypeEnum.FORCE_STOP0_ACTIVE:
				return row.opposite ? (row.value && isDocked ? undefined : red) : undefined;
			case RobotDetailSafetySystemKeysTypeEnum.BRAKE_RELEASED:
			case RobotDetailSafetySystemKeysTypeEnum.DRIVE_TORQUE_ENABLED:
			case RobotDetailSafetySystemKeysTypeEnum.NO_STOP:
			case RobotDetailSafetySystemKeysTypeEnum.NO_DRIVE_STOP:
				return forceStop0Active
					? undefined
					: row.value
					? undefined
					: row.warning
					? orange
					: red;
			default:
				return row.opposite
					? !row.value
						? undefined
						: row.warning
						? orange
						: red
					: row.value
					? undefined
					: row.warning
					? orange
					: red;
		}
	};

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
					<ListItem style={{ backgroundColor: applyBackgroundColor(row) }}>
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

import { Error, ExpandLess, ExpandMore, Report } from '@mui/icons-material';
import {
	Chip,
	Collapse,
	Icon,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../services';
import { RobotDetailInformationTypeEnum } from './RobotDetailInformation.enum';
import { RobotDetailSafetySensorsInterface } from './RobotDetailInformation.interface';
import { mapSafetyContent } from './RobotDetailInformation.map';
import { RobotDetailInformationStyle } from './RobotDetailInformation.style';

const RobotDetailSafetySensors: FC<RobotDetailSafetySensorsInterface> = (props) => {
	const { sensors } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailInformationStyle();

	const [open, setOpen] = useState(false);

	const mappedSensors =
		sensors && mapSafetyContent(sensors, RobotDetailInformationTypeEnum.SAFETY_SENSORS);
	const yellow = alpha(AppConfigService.AppOptions.colors.c11, 0.15);
	const red = alpha(AppConfigService.AppOptions.colors.c12, 0.15);
	const warnings = mappedSensors?.reduce(
		(counter, obj) =>
			obj.warning && ((obj.value && obj.opposite) || (!obj.value && !obj.opposite))
				? (counter += 1)
				: counter,
		0
	);
	const errors = mappedSensors?.reduce(
		(counter, obj) =>
			!obj.warning && ((obj.value && obj.opposite) || (!obj.value && !obj.opposite))
				? (counter += 1)
				: counter,
		0
	);

	return mappedSensors ? (
		<List component="nav" className={classes.sList}>
			<ListItemButton selected onClick={() => setOpen(!open)}>
				{/* Text */}
				<ListItemText primary={t('CONTENT.DETAIL.INFORMATION.SAFETY_SENSORS.TITLE')} />

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
			{mappedSensors.map((row) => (
				<Collapse key={row.label} in={open} timeout="auto" unmountOnExit>
					<ListItem
						style={{
							backgroundColor: row.opposite
								? !row.value
									? undefined
									: row.warning
									? yellow
									: red
								: row.value
								? undefined
								: row.warning
								? yellow
								: red
						}}>
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
export default RobotDetailSafetySensors;

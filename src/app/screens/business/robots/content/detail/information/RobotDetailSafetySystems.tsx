import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
	alpha,
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
import { RobotDetailInformationTypeEnum } from './RobotDetailInformation.enum';
import { RobotDetailSafetySystemsInterface } from './RobotDetailInformation.interface';
import { mapSafetyContent } from './RobotDetailInformation.map';
import { RobotDetailInformationStyle } from './RobotDetailInformation.style';

const RobotDetailSafetySystems: FC<RobotDetailSafetySystemsInterface> = (props) => {
	const { systems } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailInformationStyle();

	const [open, setOpen] = useState(false);

	const mappedSystem =
		systems && mapSafetyContent(systems, RobotDetailInformationTypeEnum.SAFETY_SYSTEMS);
	const green = alpha(AppConfigService.AppOptions.colors.c10, 0.09);
	const orange = alpha(AppConfigService.AppOptions.colors.c14, 0.09);
	const red = alpha(AppConfigService.AppOptions.colors.c12, 0.09);

	return mappedSystem ? (
		<List className={classes.sList}>
			<ListItemButton selected onClick={() => setOpen(!open)}>
				<ListItemText primary={t('CONTENT.DETAIL.INFORMATION.SAFETY_SYSTEMS.TITLE')} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			{mappedSystem.map((row) => (
				<Collapse key={row.label} in={open} timeout="auto" unmountOnExit>
					<ListItem
						style={{
							backgroundColor: row.opposite
								? !row.value
									? green
									: row.warning
									? orange
									: red
								: row.value
								? green
								: row.warning
								? orange
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
export default RobotDetailSafetySystems;

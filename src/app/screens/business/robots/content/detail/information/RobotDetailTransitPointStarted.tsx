import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
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

import { RobotDetailInformationTypeEnum } from './RobotDetailInformation.enum';
import { RobotDetailTransitPointStartedInterface } from './RobotDetailInformation.interface';
import { mapTransitPointStarted } from './RobotDetailInformation.map';
import { RobotDetailInformationStyle } from './RobotDetailInformation.style';

const RobotDetailTransitPointStarted: FC<RobotDetailTransitPointStartedInterface> = (props) => {
	const { transitPointStarted } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailInformationStyle();

	const [open, setOpen] = useState(false);

	const mappedInfo =
		transitPointStarted &&
		mapTransitPointStarted(
			transitPointStarted,
			RobotDetailInformationTypeEnum.TRANSIT_POINT_STARTED
		);

	return mappedInfo ? (
		<List className={classes.sList}>
			<ListItemButton selected onClick={() => setOpen(!open)}>
				<ListItemText
					primary={t('CONTENT.DETAIL.INFORMATION.TRANSIT_POINT_STARTED.TITLE')}
				/>
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			{mappedInfo.map((row) => (
				<Collapse key={row.label} in={open} timeout="auto" unmountOnExit>
					<ListItem>
						<ListItemIcon>
							<Icon>{t(row.icon)}</Icon>
						</ListItemIcon>
						<ListItemText
							primary={t(row.label)}
							secondary={!Array.isArray(row.value) && row.value}
						/>
					</ListItem>
					{Array.isArray(row.value) &&
						row.value.map((item) => (
							<ListItem key={item.key} dense>
								<ListItemIcon />
								<ListItemText primary={item.key} secondary={item.value} />
							</ListItem>
						))}
				</Collapse>
			))}
		</List>
	) : null;
};
export default RobotDetailTransitPointStarted;

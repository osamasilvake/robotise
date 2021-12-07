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
import { RobotDetailHumanPerceptionInterface } from './RobotDetailInformation.interface';
import { mapHumanPerception } from './RobotDetailInformation.map';
import { RobotDetailInformationStyle } from './RobotDetailInformation.style';

const RobotDetailHumanPerception: FC<RobotDetailHumanPerceptionInterface> = (props) => {
	const { humanPerception } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailInformationStyle();

	const [open, setOpen] = useState(false);

	const mappedInfo =
		humanPerception &&
		mapHumanPerception(humanPerception, RobotDetailInformationTypeEnum.HUMAN_PERCEPTION);

	return mappedInfo ? (
		<List className={classes.sList}>
			<ListItemButton selected onClick={() => setOpen(!open)}>
				<ListItemText primary={t('CONTENT.DETAIL.INFORMATION.HUMAN_PERCEPTION.TITLE')} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			{mappedInfo.map((row) => (
				<Collapse key={row.label} in={open} timeout="auto" unmountOnExit>
					<ListItem>
						<ListItemIcon>
							<Icon>{t(row.icon)}</Icon>
						</ListItemIcon>
						<ListItemText primary={t(row.label)} secondary={row.value} />
					</ListItem>
				</Collapse>
			))}
		</List>
	) : null;
};
export default RobotDetailHumanPerception;

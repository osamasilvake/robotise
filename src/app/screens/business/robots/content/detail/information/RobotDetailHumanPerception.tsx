import { Collapse, Icon, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
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
			<ListItem button selected onClick={() => setOpen(!open)}>
				<ListItemText primary={t('CONTENT.DETAIL.INFORMATION.HUMAN_PERCEPTION.TITLE')} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
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

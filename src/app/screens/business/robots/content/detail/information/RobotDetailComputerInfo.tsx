import { Collapse, Icon, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotDetailInformationTypeEnum } from './RobotDetailInformation.enum';
import { RobotDetailComputerInfoInterface } from './RobotDetailInformation.interface';
import { mapComputerInfo } from './RobotDetailInformation.map';
import { RobotDetailInformationStyle } from './RobotDetailInformation.style';

const RobotDetailComputerInfo: FC<RobotDetailComputerInfoInterface> = (props) => {
	const { computerInfo } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailInformationStyle();

	const [open, setOpen] = useState(false);

	const mappedInfo =
		computerInfo && mapComputerInfo(computerInfo, RobotDetailInformationTypeEnum.COMPUTER_INFO);

	return mappedInfo ? (
		<List className={classes.sList}>
			<ListItem button selected onClick={() => setOpen(!open)}>
				<ListItemText primary={t('CONTENT.DETAIL.INFORMATION.COMPUTER_INFO.TITLE')} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			{mappedInfo.map((row) => (
				<Collapse key={row.label} in={open} timeout="auto" unmountOnExit>
					<ListItem>
						<ListItemIcon>
							<Icon>{t(row.icon)}</Icon>
						</ListItemIcon>
						<ListItemText primary={t(row.label)} />
					</ListItem>
					{Object.values(row.value).map((item) => (
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
export default RobotDetailComputerInfo;

import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotInventoryHeadInterface } from './RobotInventoryHead.interface';
import { RobotsInventoryHeadStyles } from './RobotInventoryHead.style';

const RobotInventoryHead: FC<RobotInventoryHeadInterface> = (props) => {
	const { drawer } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotsInventoryHeadStyles();

	return (
		<Box className={classes.sTitleBox}>
			<Typography variant="caption" color="textSecondary">
				{t(drawer.type)}
			</Typography>
			<Typography variant="h6" color="textSecondary">
				{t(`CONTENT.INVENTORY.DRAWERS.TITLES.${drawer.title}`)}
			</Typography>
		</Box>
	);
};
export default RobotInventoryHead;

import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotInventoryInfoInterface } from './RobotInventoryInfo.interface';
import { RobotsInventoryInfoStyles } from './RobotInventoryInfo.style';

const RobotInventoryInfo: FC<RobotInventoryInfoInterface> = (props) => {
	const { drawer } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotsInventoryInfoStyles();

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
export default RobotInventoryInfo;

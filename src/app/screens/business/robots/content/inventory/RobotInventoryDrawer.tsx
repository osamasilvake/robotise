import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotInventoryDrawerInterface } from './RobotInventory.interface';
import { RobotsInventoryStyles } from './RobotInventory.style';
import RobotInventoryDrawerTable from './RobotInventoryDrawerTable';

const RobotInventoryDrawer: FC<RobotInventoryDrawerInterface> = (props) => {
	const { drawer, isLastDrawer } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotsInventoryStyles();

	return drawer ? (
		<Box>
			{/* Title */}
			<Box className={classes.sTitleBox}>
				<Typography variant="caption" color="textSecondary">
					{t(drawer.type)}
				</Typography>
				<Typography variant="h6" color="textSecondary">
					{t(`CONTENT.INVENTORY.DRAWERS.TITLES.${drawer.title}`)}
				</Typography>
			</Box>

			{/* Table */}
			<RobotInventoryDrawerTable
				key={drawer.index}
				drawer={drawer}
				isLastDrawer={isLastDrawer}
			/>
		</Box>
	) : null;
};
export default RobotInventoryDrawer;

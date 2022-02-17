import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotInventoryHeadInterface } from './RobotInventoryHead.interface';
import { RobotInventoryHeadStyle } from './RobotInventoryHead.style';

const RobotInventoryHead: FC<RobotInventoryHeadInterface> = (props) => {
	const { drawer } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotInventoryHeadStyle();

	return (
		<Box className={classes.sTitleBox}>
			<Typography variant="caption" color="textSecondary">
				{t(drawer.type.toUpperCase())}
			</Typography>
			<Typography variant="h6" color="textSecondary">
				{`${t('CONTENT.INVENTORY.DRAWERS.TITLE')} ${drawer.index}`}
			</Typography>
		</Box>
	);
};
export default RobotInventoryHead;

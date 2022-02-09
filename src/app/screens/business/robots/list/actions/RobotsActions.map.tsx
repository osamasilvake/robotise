import { Add } from '@mui/icons-material';

import { RobotsActionsSpeedDialTypeEnum } from './RobotsActions.enum';

export const robotsActions = [
	{
		icon: <Add />,
		name: 'LIST.ACTIONS.SPEED_DIAL.CREATE_ROBOT',
		operation: RobotsActionsSpeedDialTypeEnum.CREATE_ROBOT
	}
];

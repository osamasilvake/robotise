import { Add } from '@mui/icons-material';

import { DeepLinksActionsSpeedDialTypeEnum } from './DeepLinksActions.enum';

export const deepLinkActions = [
	{
		icon: <Add />,
		name: 'LIST.ACTIONS.SPEED_DIAL.CREATE_LINK',
		operation: DeepLinksActionsSpeedDialTypeEnum.CREATE_LINK
	}
];

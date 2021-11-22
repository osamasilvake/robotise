import { Paper } from '@mui/material';
import { FC } from 'react';

import { FloatStyle } from '../../../../../../utilities/styles/Float.style';
import { GeneralEmailsActionsInterface } from './GeneralEmailsActions.interface';
import GeneralEmailDelivered from './GeneralEmailsDelivered';
import GeneralEmailsSite from './GeneralEmailsSite';

const GeneralEmailsActions: FC<GeneralEmailsActionsInterface> = (props) => {
	const { siteId, delivered } = props;
	const floatStyle = FloatStyle();

	return (
		<Paper elevation={2} square className={floatStyle.sFloat1}>
			{/* Site */}
			<GeneralEmailsSite siteId={siteId} />

			{/* Delivered */}
			<GeneralEmailDelivered delivered={delivered} />
		</Paper>
	);
};
export default GeneralEmailsActions;

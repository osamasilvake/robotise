import { SettingsOutlined } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeepLinksActionsSpeedDialTypeEnum } from './DeepLinksActions.enum';
import { deepLinkActions } from './DeepLinksActions.map';
import { DeepLinksActionsStyle } from './DeepLinksActions.style';

const DeepLinksActions: FC = () => {
	const { t } = useTranslation('DEEP_LINKS');
	const classes = DeepLinksActionsStyle();

	const [, setCreateLink] = useState(false);

	/**
	 * handle speed dial actions
	 * @param operation
	 * @returns
	 */
	const handleActions = (operation: DeepLinksActionsSpeedDialTypeEnum) => () => {
		if (operation === DeepLinksActionsSpeedDialTypeEnum.CREATE_LINK) {
			setCreateLink(true);
		}
	};

	return (
		<>
			{/* Speed Dial */}
			<SpeedDial
				ariaLabel="speed-dial-deep-links"
				className={classes.sSpeedDial}
				icon={
					<SpeedDialIcon icon={<SettingsOutlined />} className={classes.sSpeedDialIcon} />
				}>
				{deepLinkActions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={t(action.name)}
						onClick={handleActions(action.operation)}
					/>
				))}
			</SpeedDial>

			{/* Dialog: Create/Edit Link */}
			{/* <DialogCreateEditLink open={createLink} setOpen={setCreateLink} /> */}
		</>
	);
};
export default DeepLinksActions;

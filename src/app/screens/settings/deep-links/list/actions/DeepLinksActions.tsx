import { SettingsOutlined } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import { authSelector } from '../../../../../slices/authentication/Auth.slice';
import { AuthScopeTypeEnum } from '../../../../authentication/Auth.enum';
import { validateScope } from '../../../../authentication/Auth.scope';
import { DeepLinkCreateEditTypeEnum } from '../table/DeepLinksTable.enum';
import DialogCreateEditDeepLink from '../table/DialogCreateEditDeepLink';
import { DeepLinksActionsSpeedDialTypeEnum } from './DeepLinksActions.enum';
import { deepLinkActions } from './DeepLinksActions.map';
import { DeepLinksActionsStyle } from './DeepLinksActions.style';

const DeepLinksActions: FC = () => {
	const { t } = useTranslation('DEEP_LINKS');
	const classes = DeepLinksActionsStyle();

	const auth = useSelector(authSelector);

	const [createDeepLink, setCreateDeepLink] = useState(false);

	const scope = auth.user?.scope;

	/**
	 * handle speed dial actions
	 * @param operation
	 * @returns
	 */
	const handleActions = (operation: DeepLinksActionsSpeedDialTypeEnum) => () => {
		if (operation === DeepLinksActionsSpeedDialTypeEnum.CREATE_DEEP_LINK) {
			setCreateDeepLink(true);
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
				}
				hidden={
					!validateScope(
						scope,
						AppConfigService.AppRoutes.SCREENS.SETTINGS.DEEP_LINKS,
						AuthScopeTypeEnum.WRITE
					)
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

			{/* Dialog: Create/Edit Deep Link */}
			<DialogCreateEditDeepLink
				type={DeepLinkCreateEditTypeEnum.CREATE}
				open={createDeepLink}
				setOpen={setCreateDeepLink}
			/>
		</>
	);
};
export default DeepLinksActions;

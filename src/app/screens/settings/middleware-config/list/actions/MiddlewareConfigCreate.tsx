import { Add } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import { authSelector } from '../../../../../slices/authentication/Auth.slice';
import { AuthScopeTypeEnum } from '../../../../authentication/Auth.enum';
import { validateScope } from '../../../../authentication/Auth.scope';
import middlewareConfigRoutes from '../../MiddlewareConfig.routes';
import DialogCreateEditMiddlewareConfig from '../table/DialogCreateEditMiddlewareConfig';
import { MiddlewareConfigCreateEditTypeEnum } from '../table/MiddlewareConfigTable.enum';

const MiddlewareConfigCreate: FC = () => {
	const { t } = useTranslation('MIDDLEWARE_CONFIG');

	const auth = useSelector(authSelector);

	const [createMiddlewareConfig, setCreateMiddlewareConfig] = useState(false);

	const scope = auth.user?.scope;
	const translation = 'LIST.ACTIONS.CREATE_EDIT.CREATE';

	return (
		<>
			<Chip
				size="small"
				icon={<Add />}
				label={t(`${translation}.LABEL`)}
				color="primary"
				variant="outlined"
				clickable
				disabled={
					!validateScope(
						scope,
						AuthScopeTypeEnum.WRITE,
						AppConfigService.AppRoutes.SCREENS.SETTINGS.MIDDLEWARE_CONFIG,
						middlewareConfigRoutes[0].scope,
						middlewareConfigRoutes[0].scopeName
					)
				}
				onClick={() => setCreateMiddlewareConfig(true)}
			/>

			{/* Dialog: Create/Edit Middleware Config */}
			{createMiddlewareConfig && (
				<DialogCreateEditMiddlewareConfig
					type={MiddlewareConfigCreateEditTypeEnum.CREATE}
					open={createMiddlewareConfig}
					setOpen={setCreateMiddlewareConfig}
				/>
			)}
		</>
	);
};
export default MiddlewareConfigCreate;

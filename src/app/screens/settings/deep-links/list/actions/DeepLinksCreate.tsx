import { Add } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import { authSelector } from '../../../../../slices/authentication/Auth.slice';
import { AuthScopeTypeEnum } from '../../../../authentication/Auth.enum';
import { validateScope } from '../../../../authentication/Auth.scope';
import { DeepLinkCreateEditTypeEnum } from '../table/DeepLinksTable.enum';
import DialogCreateEditDeepLink from '../table/DialogCreateEditDeepLink';

const DeepLinksCreate: FC = () => {
	const { t } = useTranslation('DEEP_LINKS');

	const auth = useSelector(authSelector);

	const [createDeepLink, setCreateDeepLink] = useState(false);

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
					!validateScope({
						authScopeType: AuthScopeTypeEnum.WRITE,
						authScope: scope,
						link: AppConfigService.AppRoutes.SCREENS.SETTINGS.DEEP_LINKS
					})
				}
				onClick={() => setCreateDeepLink(true)}
			/>

			{/* Dialog: Create/Edit Deep Link */}
			{createDeepLink && (
				<DialogCreateEditDeepLink
					type={DeepLinkCreateEditTypeEnum.CREATE}
					open={createDeepLink}
					setOpen={setCreateDeepLink}
				/>
			)}
		</>
	);
};
export default DeepLinksCreate;

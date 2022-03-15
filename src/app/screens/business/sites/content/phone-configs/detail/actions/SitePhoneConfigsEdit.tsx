import { Edit } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogEditPhoneConfig from './DialogEditPhoneConfig';

const SitePhoneConfigsEdit: FC = () => {
	const { t } = useTranslation('SITES');

	const [editConfig, setEditConfig] = useState(false);

	const translation = 'CONTENT.PHONE_CONFIGS.DETAIL.ACTIONS.EDIT';

	return (
		<>
			<Chip
				size="small"
				icon={<Edit />}
				label={t(`${translation}.LABEL`)}
				color="primary"
				variant="outlined"
				clickable
				onClick={() => setEditConfig(true)}
			/>

			{/* Dialog: Edit Config */}
			{editConfig && <DialogEditPhoneConfig open={editConfig} setOpen={setEditConfig} />}
		</>
	);
};
export default SitePhoneConfigsEdit;

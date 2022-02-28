import { Add } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogCreateSite from './DialogCreateSite';

const SitesCreate: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const [createSite, setCreateSite] = useState(false);

	const translation = 'LIST.ACTIONS.CREATE';

	return (
		<>
			<Chip
				size="small"
				icon={<Add />}
				label={t(`${translation}.LABEL`)}
				color="primary"
				variant="outlined"
				clickable
				onClick={() => setCreateSite(true)}
			/>

			{/* Dialog: Create Site */}
			{createSite && <DialogCreateSite open={createSite} setOpen={setCreateSite} />}
		</>
	);
};
export default SitesCreate;

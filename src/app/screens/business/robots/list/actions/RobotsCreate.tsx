import { Add } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogCreateRobot from './DialogCreateRobot';

const RobotsCreate: FC = () => {
	const { t } = useTranslation('ROBOTS');

	const [createRobot, setCreateRobot] = useState(false);

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
				onClick={() => setCreateRobot(true)}
			/>

			{/* Dialog: Create Robot */}
			{createRobot && <DialogCreateRobot open={createRobot} setOpen={setCreateRobot} />}
		</>
	);
};
export default RobotsCreate;

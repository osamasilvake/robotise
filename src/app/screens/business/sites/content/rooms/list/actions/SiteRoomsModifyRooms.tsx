import { Edit } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogModifyRooms from './DialogModifyRooms';

const SiteRoomsModifyRooms: FC = () => {
	const { t } = useTranslation('SITES');

	const [modifyRooms, setModifyRooms] = useState(false);

	const translation = 'CONTENT.ROOMS.LIST.ACTIONS.MODIFY';

	return (
		<>
			<Chip
				size="small"
				icon={<Edit />}
				label={t(`${translation}.LABEL`)}
				color="primary"
				variant="outlined"
				clickable
				onClick={() => setModifyRooms(true)}
			/>

			{/* Dialog: Modify Rooms */}
			{modifyRooms && <DialogModifyRooms open={modifyRooms} setOpen={setModifyRooms} />}
		</>
	);
};
export default SiteRoomsModifyRooms;

import { Delete, Edit } from '@mui/icons-material';
import {
	IconButton,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Tooltip
} from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogCreateEditServicePosition from './DialogCreateEditServicePosition';
import DialogDeleteServicePosition from './DialogDeleteServicePosition';
import { SiteConfigurationServicePositionsCreateEditTypeEnum } from './SiteConfigurationServicePositions.enum';
import { SiteConfigurationServicePositionInterface } from './SiteConfigurationServicePositions.interface';

const SiteConfigurationServicePosition: FC<SiteConfigurationServicePositionInterface> = (props) => {
	const { servicePosition, index } = props;
	const { t } = useTranslation('TOOLTIP');

	const [openCreateEdit, setOpenCreateEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	return servicePosition ? (
		<ListItem key={servicePosition.id}>
			<ListItemText primary={servicePosition.name} secondary={servicePosition.location} />

			<ListItemSecondaryAction>
				<Tooltip
					placement="left"
					title={t<string>('SERVICE_POSITIONS.EDIT')}
					onClick={() => setOpenCreateEdit(true)}>
					<IconButton edge="end">
						<Edit color="primary" fontSize="small" />
					</IconButton>
				</Tooltip>
				{openCreateEdit && (
					<DialogCreateEditServicePosition
						type={SiteConfigurationServicePositionsCreateEditTypeEnum.EDIT}
						open={openCreateEdit}
						setOpen={setOpenCreateEdit}
						index={index}
					/>
				)}

				<Tooltip
					placement="left"
					title={t<string>('SERVICE_POSITIONS.DELETE')}
					onClick={() => setOpenDelete(true)}>
					<IconButton edge="end">
						<Delete color="error" fontSize="small" />
					</IconButton>
				</Tooltip>
				{openDelete && (
					<DialogDeleteServicePosition
						servicePosition={servicePosition}
						open={openDelete}
						setOpen={setOpenDelete}
					/>
				)}
			</ListItemSecondaryAction>
		</ListItem>
	) : null;
};
export default SiteConfigurationServicePosition;

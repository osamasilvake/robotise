import {
	IconButton,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Tooltip
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogCreateEditServicePosition from './DialogCreateEditServicePosition';
import DialogDeleteServicePosition from './DialogDeleteServicePosition';
import { SiteServicePositionsCreateEditTypeEnum } from './SiteServicePositions.enum';
import { SiteServicePositionInterface } from './SiteServicePositions.interface';

const SiteServicePosition: FC<SiteServicePositionInterface> = (props) => {
	const { servicePosition, index } = props;
	const { t } = useTranslation('TOOLTIPS');

	const [openCreateEdit, setOpenCreateEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	return servicePosition ? (
		<ListItem key={servicePosition.id}>
			<ListItemText primary={servicePosition.name} secondary={servicePosition.location} />

			<ListItemSecondaryAction>
				<Tooltip
					placement="left"
					title={String(t('SERVICE_POSITIONS.EDIT'))}
					onClick={() => setOpenCreateEdit(true)}>
					<IconButton edge="end">
						<Edit color="primary" />
					</IconButton>
				</Tooltip>
				{openCreateEdit && (
					<DialogCreateEditServicePosition
						type={SiteServicePositionsCreateEditTypeEnum.EDIT}
						open={openCreateEdit}
						setOpen={setOpenCreateEdit}
						index={index}
					/>
				)}

				<Tooltip
					placement="left"
					title={String(t('SERVICE_POSITIONS.DELETE'))}
					onClick={() => setOpenDelete(true)}>
					<IconButton edge="end">
						<Delete color="error" />
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
export default SiteServicePosition;

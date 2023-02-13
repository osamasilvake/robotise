import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../../slices';
import {
	RoomLocationsUpdate,
	RoomsLocationsFetch,
	roomsSelector
} from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import { SiteRoomsGridBlockUnblockFloorTypeEnum } from './SiteRoomsGrid.enum';
import { DialogToggleFloorStateInterface } from './SiteRoomsGrid.interface';

const DialogToggleFloorState: FC<DialogToggleFloorStateInterface> = (props) => {
	const { open, setOpen, floorState, siteSingle } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const rooms = useSelector(roomsSelector);

	const translation = 'CONTENT.ROOMS.LIST.GRID';

	/**
	 * handle floor state
	 * @returns
	 */
	const handleFloorState = () => {
		// return on empty
		if (!siteSingle?.id) return;

		const isBlocked = floorState.type === SiteRoomsGridBlockUnblockFloorTypeEnum.BLOCK;
		const floorRooms = floorState?.rooms[floorState?.floor];
		const floorId = floorRooms[0]?.floor?.id;

		// dispatch: update locations
		dispatch(
			RoomLocationsUpdate(floorId, isBlocked, () => {
				// dispatch: fetch locations
				siteSingle?.id && dispatch(RoomsLocationsFetch(siteSingle?.id, true));

				// close dialog
				setOpen(false);
			})
		);
	};

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>{t(`${translation}.FLOOR_STATE.TITLE`)}</DialogTitle>
			<DialogContent>{t(`${translation}.FLOOR_STATE.TEXT`)}</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => setOpen(false)}>
					{t('DIALOG:BUTTONS.CANCEL')}
				</Button>
				<Button
					variant="outlined"
					onClick={handleFloorState}
					disabled={rooms.updating}
					endIcon={rooms.updating && <CircularProgress size={20} />}>
					{t('DIALOG:BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogToggleFloorState;

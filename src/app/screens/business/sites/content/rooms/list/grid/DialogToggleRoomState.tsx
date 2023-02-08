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
	RoomLocationUpdate,
	RoomsLocationsFetch,
	roomsSelector
} from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import { DialogToggleRoomStateInterface } from './SiteRoomsGrid.interface';

const DialogToggleRoomState: FC<DialogToggleRoomStateInterface> = (props) => {
	const { open, setOpen, checkedState, allRooms, siteSingle } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const rooms = useSelector(roomsSelector);

	const translation = 'CONTENT.ROOMS.LIST.GRID';

	/**
	 * handle room state
	 * @returns
	 */
	const handleRoomState = () => {
		// location
		const location = allRooms.find((r) => r.id === checkedState.id);
		if (!location) return;

		// update
		const loc = structuredClone(location);
		loc.metadata.blocked = !!checkedState.checked;

		// dispatch: update location
		dispatch(
			RoomLocationUpdate(loc, () => {
				// dispatch: fetch locations
				siteSingle?.id && dispatch(RoomsLocationsFetch(siteSingle?.id));

				// close dialog
				setOpen(false);
			})
		);
	};

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>
				{t(`${translation}.ROOM_STATE.TITLE`, { value: checkedState.room })}
			</DialogTitle>
			<DialogContent>{t(`${translation}.ROOM_STATE.TEXT`)}</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => setOpen(false)}>
					{t('DIALOG:BUTTONS.CANCEL')}
				</Button>
				<Button
					variant="outlined"
					onClick={handleRoomState}
					disabled={rooms.updating}
					endIcon={rooms.updating && <CircularProgress size={20} />}>
					{t('DIALOG:BUTTONS.CONFIRM')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default DialogToggleRoomState;

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
import { DialogToggleFloorStateInterface } from './SiteRoomsGrid.interface';

const DialogToggleFloorState: FC<DialogToggleFloorStateInterface> = (props) => {
	const { open, setOpen, floorState, allRooms, siteSingle } = props;
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

		console.log(allRooms, floorState);

		const location: any = {};

		// dispatch: update location
		dispatch(
			RoomLocationUpdate(location, () => {
				// dispatch: fetch locations
				siteSingle?.id && dispatch(RoomsLocationsFetch(siteSingle?.id));

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

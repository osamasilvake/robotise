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
	roomsSelector,
	RoomsUpdate
} from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import { SitesFetchList } from '../../../../../../../slices/business/sites/Sites.slice';
import { DialogToggleRoomStateInterface } from './SiteRoomsGrid.interface';

const DialogToggleRoomState: FC<DialogToggleRoomStateInterface> = (props) => {
	const { open, setOpen, checkedState, siteSingle, allWhitelist } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const rooms = useSelector(roomsSelector);

	const translation = 'CONTENT.ROOMS.LIST.GRID';

	/**
	 * handle room state
	 * @returns
	 */
	const handleRoomState = () => {
		// return on empty
		if (!siteSingle?.id) return;

		const whitelist = checkedState.checked
			? allWhitelist.filter((r) => r !== checkedState.room)
			: [...allWhitelist, checkedState.room];

		// dispatch: update room state
		dispatch(
			RoomsUpdate(siteSingle.id, { whitelist }, () => {
				// dispatch: fetch sites
				dispatch(SitesFetchList(true));

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

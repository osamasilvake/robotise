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

import {
	roomsSelector,
	RoomsUpdate
} from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import { SitesFetchList } from '../../../../../../../slices/business/sites/Sites.slice';
import { SiteRoomsGridBlockUnblockFloorTypeEnum } from './SiteRoomsGrid.enum';
import { DialogToggleFloorStateInterface } from './SiteRoomsGrid.interface';

const DialogToggleFloorState: FC<DialogToggleFloorStateInterface> = (props) => {
	const { open, setOpen, floorState, siteSingle, allWhitelist } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const dispatch = useDispatch();
	const rooms = useSelector(roomsSelector);

	const translation = 'CONTENT.ROOMS.LIST.GRID';

	/**
	 * handle floor state
	 * @returns
	 */
	const handleFloorState = () => {
		// return on empty
		if (!siteSingle?.id) return;

		const whitelist =
			floorState.type === SiteRoomsGridBlockUnblockFloorTypeEnum.BLOCK
				? allWhitelist.filter((r) => !floorState.rooms?.includes(r))
				: [...allWhitelist, ...floorState.rooms];

		// dispatch: update rooms state
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

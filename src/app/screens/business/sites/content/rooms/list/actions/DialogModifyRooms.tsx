import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	TextField,
	Typography
} from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	roomsSelector,
	RoomsUpdate
} from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import {
	SitesFetchList,
	sitesSelector
} from '../../../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { SiteParamsInterface } from '../../../../Site.interface';
import {
	DialogModifyRoomsFormInterface,
	DialogModifyRoomsInterface
} from './SiteRoomsActions.interface';

const DialogModifyRooms: FC<DialogModifyRoomsInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);

	const dispatch = useDispatch();
	const sites = useSelector(sitesSelector);
	const rooms = useSelector(roomsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const translation = 'SITES:CONTENT.ROOMS.LIST.ACTIONS.MODIFY';

	const allRooms = siteSingle?.rooms.available;
	const whiteList = siteSingle?.rooms.whitelist || [];
	const blacklist = allRooms?.filter((r) => !whiteList?.includes(r)) || [];

	const strWhitelist = whiteList.join(',');
	const strBlacklist = blacklist.join(',');

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<DialogModifyRoomsFormInterface>(
			{
				whitelist: strWhitelist,
				blocked: strBlacklist
			},
			() => ({ whitelist: '', blocked: '' }),
			async () => {
				// return on empty
				if (!siteSingle?.id) return;

				// string
				const a = values.whitelist as string;
				const b = values.blocked as string;

				const allowed = applyFiltering(a.split(','));
				const blocked = applyFiltering(b.split(','));
				const all = [...allowed, ...blocked];

				// dispatch: update room state
				dispatch(
					RoomsUpdate(siteSingle.id, { whitelist: allowed, available: all }, () => {
						// dispatch: fetch sites
						dispatch(SitesFetchList(true));

						// close dialog
						setOpen(false);
					})
				);
			}
		);

	/**
	 * apply filtering
	 * @param arr
	 * @returns
	 */
	const applyFiltering = (arr: string[]) => {
		if (!arr) return [];
		const mapped: (string | string[])[] = arr.map((r) => {
			if (r.indexOf('-') !== -1) {
				const collection = [];
				const items = r.split('-');
				if (items[1] < items[0]) return items[0];
				for (let i = +items[0]; i <= +items[1]; i++) {
					collection.push(String(i));
				}
				return collection;
			}
			return r;
		});
		const flatted = mapped.flat();
		return Array.from(new Set(flatted));
	};

	/**
	 * close dialog
	 * @param event
	 */
	const closeDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={closeDialog}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
				<DialogContent>
					<Typography color="textSecondary">{t(`${translation}.TEXT`)}</Typography>

					<FormControl fullWidth margin="normal">
						<TextField
							multiline
							type="text"
							id="whitelist"
							name="whitelist"
							rows={4}
							label={t(`${translation}.FIELDS.WHITELIST.LABEL`)}
							placeholder={t(`${translation}.FIELDS.WHITELIST.PLACEHOLDER`)}
							value={values.whitelist}
							onChange={handleChangeInput}
							onBlur={handleBlur}
							error={!!errors?.whitelist}
							helperText={!!errors?.whitelist && t(errors.whitelist)}
							InputLabelProps={{ shrink: true }}
						/>
					</FormControl>

					<FormControl fullWidth margin="normal">
						<TextField
							multiline
							type="text"
							id="blocked"
							name="blocked"
							rows={4}
							label={t(`${translation}.FIELDS.BLOCKED.LABEL`)}
							placeholder={t(`${translation}.FIELDS.BLOCKED.PLACEHOLDER`)}
							value={values.blocked}
							onChange={handleChangeInput}
							onBlur={handleBlur}
							error={!!errors?.blocked}
							helperText={!!errors?.blocked && t(errors.blocked)}
							InputLabelProps={{ shrink: true }}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={closeDialog}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={rooms.updating}
						endIcon={rooms.updating && <CircularProgress size={20} />}>
						{t('BUTTONS.MODIFY')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogModifyRooms;

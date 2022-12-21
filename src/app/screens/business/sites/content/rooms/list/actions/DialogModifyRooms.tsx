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

import { AppDispatch } from '../../../../../../../slices';
import {
	roomsSelector,
	RoomsUpdate
} from '../../../../../../../slices/business/sites/rooms/Rooms.slice';
import {
	SitesFetchList,
	sitesSelector
} from '../../../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { validateEmptyObj } from '../../../../../../../utilities/methods/Object';
import { SiteParamsInterface } from '../../../../Site.interface';
import { ModifyRoomsValidation } from './DialogModifyRooms.validation';
import {
	DialogModifyRoomsFormInterface,
	DialogModifyRoomsInterface
} from './SiteRoomsActions.interface';

const DialogModifyRooms: FC<DialogModifyRoomsInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['SITES', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const rooms = useSelector(roomsSelector);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const siteSingle = sites.content?.dataById[cSiteId];
	const translation = 'CONTENT.ROOMS.LIST.ACTIONS.MODIFY';

	const allRooms = siteSingle?.rooms.available;
	const whiteList = siteSingle?.rooms.whitelist || [];
	const blacklist = allRooms?.filter((r) => !whiteList?.includes(r)) || [];

	/**
	 * group adjacent rooms
	 * @param arr
	 * @returns
	 */
	const groupAdjacentRooms = (arr: string[]) => {
		const sorted = [...arr]?.sort((a, b) => +a - +b);
		const grouped = sorted
			.reduce((arr: string[][], val, i, a: string[]) => {
				if (!i || +val !== +a[i - 1] + 1) arr.push([]);
				arr[arr.length - 1].push(val);
				return arr;
			}, [])
			.map((items: string[]) =>
				items.length <= 1 ? items : `${items[0]}-${items[items.length - 1]}`
			);
		const joined = grouped.join(', ');
		return joined;
	};

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<DialogModifyRoomsFormInterface>(
			{
				whitelist: groupAdjacentRooms(whiteList),
				blocked: groupAdjacentRooms(blacklist)
			},
			ModifyRoomsValidation,
			async () => {
				// return on empty
				if (!siteSingle?.id) return;

				// string
				const a = values.whitelist as string;
				const b = values.blocked as string;

				const allowed = splitAdjacentRooms(a.split(',').map((e: string) => e.trim()));
				const blocked = splitAdjacentRooms(b.split(',')).map((e: string) => e.trim());
				const all = [...allowed, ...blocked]?.filter(Boolean);

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
	 * split adjacent rooms
	 * @param arr
	 * @returns
	 */
	const splitAdjacentRooms = (arr: string[]) => {
		if (!arr) return [];
		const mapped: (string | string[])[] = arr.map((r) => {
			if (r.indexOf('-') !== -1) {
				const collection = [];
				const items = r.split('-');
				const a = items[0]?.trim();
				const b = items[1]?.trim();

				// case: 300-200 -> 300
				if (b < a) return a;

				// loop
				for (let i = +a; i <= +items[1]; i++) {
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
							label={t(`${translation}.FORM.FIELDS.WHITELIST.LABEL`)}
							placeholder={t(`${translation}.FORM.FIELDS.WHITELIST.PLACEHOLDER`)}
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
							label={t(`${translation}.FORM.FIELDS.BLOCKED.LABEL`)}
							placeholder={t(`${translation}.FORM.FIELDS.BLOCKED.PLACEHOLDER`)}
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
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={rooms.updating || (!!errors && !validateEmptyObj(errors))}
						endIcon={rooms.updating && <CircularProgress size={20} />}>
						{t('DIALOG:BUTTONS.MODIFY')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogModifyRooms;

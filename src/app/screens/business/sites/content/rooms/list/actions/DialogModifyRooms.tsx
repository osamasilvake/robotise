import {
	Button,
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

import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import { DialogModifyRoomsInterface } from './SiteRoomsActions.interface';

const DialogModifyRooms: FC<DialogModifyRoomsInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);

	const translation = 'SITES:CONTENT.ROOMS.LIST.ACTIONS.MODIFY';

	const { handleChangeInput, handleBlur, handleSubmit, values, errors } = useForm<any>(
		{
			whiteList: '',
			available: ''
		},
		() => ({ whiteList: '', available: '' }),
		async () => {
			console.log('called', values);
		}
	);

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
							id="whiteList"
							name="whiteList"
							rows={4}
							label={t(`${translation}.FIELDS.WHITELIST.LABEL`)}
							placeholder={t(`${translation}.FIELDS.WHITELIST.PLACEHOLDER`)}
							value={values.whiteList}
							onChange={handleChangeInput}
							onBlur={handleBlur}
							error={!!errors?.whiteList}
							helperText={errors?.whiteList && t(errors.whiteList)}
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
							helperText={errors?.blocked && t(errors.blocked)}
							InputLabelProps={{ shrink: true }}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={closeDialog}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button variant="outlined" type="submit">
						{t('BUTTONS.MODIFY')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogModifyRooms;

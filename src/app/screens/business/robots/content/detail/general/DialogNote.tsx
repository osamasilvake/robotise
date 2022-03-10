import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	TextField
} from '@mui/material';
import DOMPurify from 'dompurify';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	RobotNoteUpdate,
	robotOperationsSelector
} from '../../../../../../slices/business/robots/RobotOperations.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { RobotParamsInterface } from '../../../Robot.interface';
import { NoteFormInterface, NoteInterface } from './RobotDetailGeneral.interface';

const DialogNote: FC<NoteInterface> = (props) => {
	const { open, setOpen, note } = props;
	const { t } = useTranslation(['ROBOTS', 'DIALOG']);

	const robotOperations = useSelector(robotOperationsSelector);
	const dispatch = useDispatch();

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const cRobotId = params.robotId;
	const translation = 'CONTENT.DETAIL.GENERAL.NOTE';
	const fieldNote = 'note';
	const maxLength = 2000;

	const { handleChangeInput, handleSubmit, values } = useForm<NoteFormInterface>(
		{
			note: note || ''
		},
		() => ({ note: '' }),
		async () => {
			// sanitize text
			const note = DOMPurify.sanitize(values.note);

			// dispatch: update note field
			dispatch(RobotNoteUpdate(cRobotId, { note }, () => setOpen(false)));
		}
	);

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t(`${translation}.TITLE`)}</DialogTitle>
				<DialogContent>
					<DialogContentText>{t(`${translation}.EXCERPT`)}</DialogContentText>
					<FormControl fullWidth margin="normal">
						<TextField
							multiline
							type="text"
							id={fieldNote}
							name={fieldNote}
							rows={6}
							label={t(`${translation}.FIELD.LABEL`)}
							placeholder={t(`${translation}.FIELD.PLACEHOLDER`)}
							value={values.note}
							onChange={handleChangeInput}
							onFocus={(e) =>
								e.currentTarget.setSelectionRange(
									e.currentTarget.value.length,
									e.currentTarget.value.length
								)
							}
							error={values.note.length === maxLength}
							helperText={
								values.note.length === maxLength &&
								t(`${translation}.NOTE`, { value: values.note.length })
							}
							inputProps={{ maxLength }}
							inputRef={(input) => input && input.focus()}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						onClick={() =>
							handleChangeInput({
								target: {
									name: fieldNote,
									value: ''
								}
							})
						}>
						{t('DIALOG:BUTTONS.CLEAR')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={robotOperations.note.loading}
						endIcon={robotOperations.note.loading && <CircularProgress size={20} />}>
						{t('DIALOG:BUTTONS.UPDATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogNote;

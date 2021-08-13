import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormHelperText,
	TextField
} from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	RobotNoteUpdate,
	robotSelector
} from '../../../../../../slices/business/robots/Robot.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { RobotParamsInterface } from '../../../Robot.interface';
import { NoteFormInterface, NoteInterface } from './RobotDetailGeneral.interface';

const DialogNote: FC<NoteInterface> = (props) => {
	const { open, setOpen, note } = props;
	const { t } = useTranslation(['DIALOG', 'ROBOTS']);

	const robot = useSelector(robotSelector);
	const dispatch = useDispatch();

	const params: RobotParamsInterface = useParams();
	const cRobotId = params.robotId;
	const common = 'ROBOTS:CONTENT.DETAIL.GENERAL.NOTE';

	const { handleChangeInput, handleSubmit, values, errors } = useForm<NoteFormInterface>(
		{
			note: note || ''
		},
		() => ({ note: '' }),
		async () => {
			// dispatch: update note field
			dispatch(RobotNoteUpdate(cRobotId, values, () => setOpen(false)));
		}
	);

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t(`${common}.TITLE`)}</DialogTitle>
				<DialogContent>
					<DialogContentText>{t(`${common}.EXCERPT`)}</DialogContentText>
					<FormControl error fullWidth margin="normal">
						<TextField
							multiline
							variant="outlined"
							type="text"
							id="note"
							name="note"
							rows={4}
							value={values.note}
							error={!!errors?.note}
							onChange={handleChangeInput}
							inputProps={{ maxLength: 1000 }}
							inputRef={(input) => input && input.focus()}
							onFocus={(e) =>
								e.currentTarget.setSelectionRange(
									e.currentTarget.value.length,
									e.currentTarget.value.length
								)
							}
							label={t(`${common}.FIELDS.LABEL`)}
							placeholder={t(`${common}.FIELDS.PLACEHOLDER`)}
						/>
						{errors?.note && <FormHelperText>{t(errors.note)}</FormHelperText>}
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={robot.note.loading}
						endIcon={robot.note.loading && <CircularProgress size={20} />}>
						{t('BUTTONS.UPDATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogNote;

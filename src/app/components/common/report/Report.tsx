import { CloudDownload } from '@mui/icons-material';
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	Stack,
	TextField,
	Typography
} from '@mui/material';
import { FC, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../slices';
import { GeneralReportsGenerate } from '../../../slices/business/general/GeneralOperations.slice';
import { useForm } from '../../../utilities/hooks/form/UseForm';
import { dateDaysPriorToToday, dateToday } from '../../../utilities/methods/Date';
import { validateEmptyObj } from '../../../utilities/methods/Object';
import { ReportFormInterface, ReportInterface } from './Report.interface';
import { ReportStyle } from './Report.style';
import { ReportValidation } from './Report.validation';

const Report: FC<ReportInterface> = (props) => {
	const { id, open, setOpen, filterId, filterIdType, state } = props;
	const { t } = useTranslation(['REPORT', 'DIALOG']);
	const classes = ReportStyle();

	const dispatch = useDispatch<AppDispatch>();

	const [report, setReport] = useState('');
	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<ReportFormInterface>(
			{
				id,
				from: dateDaysPriorToToday(30),
				to: dateToday()
			},
			ReportValidation,
			async () => {
				// dispatch: generate reports
				dispatch(
					GeneralReportsGenerate(filterId, filterIdType, values, (report) =>
						setReport(report)
					)
				);
			}
		);

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t('TITLE')}</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									type="date"
									id="from"
									name="from"
									label={t('FIELDS.FROM.LABEL')}
									value={values.from}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.from}
									helperText={errors?.from && t(`FIELDS.${errors.from}`)}
									InputLabelProps={{ shrink: true }}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									type="date"
									id="to"
									name="to"
									label={t('FIELDS.TO.LABEL')}
									value={values.to}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									InputLabelProps={{ shrink: true }}
								/>
							</FormControl>
						</Grid>
					</Grid>

					{report && !state.loading && (
						<CSVLink
							data={report}
							separator={';'}
							filename={`${id}_${values.from}_${values.to}`}
							className={classes.sDownloadLink}>
							<Stack spacing={0.5} direction="row" alignItems="center">
								<CloudDownload className={classes.sDownloadIcon} />
								<Typography>{t('DOWNLOAD')}</Typography>
							</Stack>
						</CSVLink>
					)}
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={state.loading || (!!errors && !validateEmptyObj(errors))}
						endIcon={state.loading && <CircularProgress size={20} />}>
						{t('DIALOG:BUTTONS.GENERATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default Report;

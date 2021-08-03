import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	Grid,
	TextField,
	Typography
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import { FC, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useForm } from '../../../utilities/hooks/form/UseForm';
import { moment30DaysFromToday, momentToday } from '../../../utilities/methods/Moment';
import { validateEmptyObj } from '../../../utilities/methods/ObjectUtilities';
import { ReportInterface, ReportPayloadInterface } from './Report.interface';
import { ReportStyle } from './Report.style';
import { ReportValidation } from './Report.validation';

const Report: FC<ReportInterface> = (props) => {
	const { open, setOpen, id, state, GenerateReports } = props;
	const { t } = useTranslation(['DIALOG', 'REPORT']);
	const classes = ReportStyle();

	const dispatch = useDispatch();

	const [report, setReport] = useState('');
	const { handleChangeInput, handleBlur, handleSubmit, values, errors } =
		useForm<ReportPayloadInterface>(
			{
				from: moment30DaysFromToday(),
				to: momentToday()
			},
			ReportValidation,
			async () => {
				// dispatch: generate reports
				dispatch(GenerateReports(id, values, (report) => setReport(report)));
			}
		);

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>{t('REPORT:TITLE')}</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={6}>
							<FormControl error fullWidth margin="normal">
								<TextField
									variant="outlined"
									id="from"
									name="from"
									label={t('REPORT:FIELDS.FROM.LABEL')}
									type="date"
									value={values.from}
									error={!!errors?.from}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									InputLabelProps={{ shrink: true }}
								/>
								{errors?.from && (
									<FormHelperText>
										{t(`REPORT:FIELDS.${errors.from}`)}
									</FormHelperText>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									variant="outlined"
									id="to"
									name="to"
									label={t('REPORT:FIELDS.TO.LABEL')}
									type="date"
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
							filename={t('REPORT:TITLE')}
							className={classes.sDownloadLink}>
							<CloudDownload className={classes.sDownloadIcon} />
							<Typography variant="body1">{t('REPORT:DOWNLOAD')}</Typography>
						</CSVLink>
					)}
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={(!!errors && !validateEmptyObj(errors)) || state.loading}
						endIcon={state.loading && <CircularProgress size={20} />}>
						{t('BUTTONS.GENERATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default Report;

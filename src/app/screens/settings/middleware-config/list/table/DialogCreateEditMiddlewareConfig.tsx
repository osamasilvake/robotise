import {
	Button,
	Checkbox,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import {
	MiddlewareConfigCreateEdit,
	MiddlewareConfigFetchList,
	middlewareConfigSelector
} from '../../../../../slices/settings/middleware-config/MiddlewareConfig.slice';
import { useForm } from '../../../../../utilities/hooks/form/UseForm';
import {
	validateEmptyObj,
	validateEmptyObjProperty
} from '../../../../../utilities/methods/Object';
import { CreateEditMiddlewareConfigValidation } from './DialogCreateEditMiddlewareConfig.validation';
import {
	MiddlewareConfigCreateEditTypeEnum,
	MiddlewareConfigResetTypeEnum
} from './MiddlewareConfigTable.enum';
import {
	DialogCreateEditMiddlewareConfigFormInterface,
	DialogCreateEditMiddlewareConfigInterface
} from './MiddlewareConfigTable.interface';
import {
	MiddlewareConfigDirections,
	MiddlewareConfigStatuses,
	MiddlewareConfigTraceModes
} from './MiddlewareConfigTable.list';

const DialogCreateEditMiddlewareConfig: FC<DialogCreateEditMiddlewareConfigInterface> = (props) => {
	const { config, open, setOpen, type } = props;
	const { t } = useTranslation(['MIDDLEWARE_CONFIG', 'DIALOG']);

	const dispatch = useDispatch();
	const middlewareConfig = useSelector(middlewareConfigSelector);

	const translation = 'LIST.ACTIONS.CREATE_EDIT';

	const {
		handleChangeInput,
		handleChangeSelect,
		handleChangeCheckbox,
		handleBlur,
		handleSubmit,
		values,
		errors
	} = useForm<DialogCreateEditMiddlewareConfigFormInterface>(
		{
			name: config?.name || '',
			desc: config?.desc || '',
			key: config?.key || '',
			prop: config?.prop || '',
			direction: config?.direction || MiddlewareConfigDirections[0].id,
			status: config?.status || MiddlewareConfigStatuses[0].id,
			traceMode: config?.traceMode || MiddlewareConfigTraceModes[0].id,
			debug: !!config?.debug,
			audit: !!config?.audit,
			stopPropagate: !!config?.stopPropagate,
			saveHistory: !!config?.saveHistory
		},
		CreateEditMiddlewareConfigValidation,
		async () => {
			// dispatch: create/edit middleware config
			dispatch(
				MiddlewareConfigCreateEdit(config?.id, values, type, () => {
					// close dialog
					setOpen(false);

					if (type === MiddlewareConfigCreateEditTypeEnum.CREATE) {
						// dispatch: middleware config
						dispatch(
							MiddlewareConfigFetchList({
								page: 0,
								rowsPerPage:
									middlewareConfig.content?.state?.rowsPerPage ||
									AppConfigService.AppOptions.screens.settings.middlewareConfig
										.list.defaultPageSize,
								reset: MiddlewareConfigResetTypeEnum.RESET
							})
						);
					}
				})
			);
		}
	);

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>
					{type === MiddlewareConfigCreateEditTypeEnum.CREATE &&
						t(`${translation}.CREATE.TITLE`)}
					{type === MiddlewareConfigCreateEditTypeEnum.EDIT &&
						t(`${translation}.EDIT.TITLE`)}
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="name"
									name="name"
									label={t(`${translation}.FIELDS.NAME.LABEL`)}
									placeholder={t(`${translation}.FIELDS.NAME.PLACEHOLDER`)}
									value={values?.name}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.name}
									helperText={errors?.name && t(errors.name)}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth margin="normal">
								<TextField
									multiline
									type="text"
									id="desc"
									name="desc"
									rows={3}
									label={t(`${translation}.FIELDS.DESC.LABEL`)}
									placeholder={t(`${translation}.FIELDS.DESC.PLACEHOLDER`)}
									value={values.desc}
									onChange={handleChangeInput}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={6} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="key"
									name="key"
									label={t(`${translation}.FIELDS.KEY.LABEL`)}
									placeholder={t(`${translation}.FIELDS.KEY.PLACEHOLDER`)}
									value={values?.key}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.key}
									helperText={errors?.key && t(errors.key)}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={6} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="prop"
									name="prop"
									label={t(`${translation}.FIELDS.PROP.LABEL`)}
									placeholder={t(`${translation}.FIELDS.PROP.PLACEHOLDER`)}
									value={values?.prop}
									onChange={handleChangeInput}
									onBlur={handleBlur}
									error={!!errors?.prop}
									helperText={errors?.prop && t(errors.prop)}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4}>
							<FormControl fullWidth margin="normal">
								<InputLabel id="label-direction">
									{t(`${translation}.FIELDS.DIRECTION.LABEL`)}
								</InputLabel>
								<Select
									labelId="label-direction"
									id="direction"
									name="direction"
									label={t(`${translation}.FIELDS.DIRECTION.LABEL`)}
									value={values.direction}
									onChange={handleChangeSelect}>
									{MiddlewareConfigDirections.map((dir) => (
										<MenuItem key={dir.id} value={dir.id}>
											{dir.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4}>
							<FormControl fullWidth margin="normal">
								<InputLabel id="label-status">
									{t(`${translation}.FIELDS.STATUS.LABEL`)}
								</InputLabel>
								<Select
									labelId="label-status"
									id="status"
									name="status"
									label={t(`${translation}.FIELDS.STATUS.LABEL`)}
									value={values.status}
									onChange={handleChangeSelect}>
									{MiddlewareConfigStatuses.map((st) => (
										<MenuItem key={st.id} value={st.id}>
											{st.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4}>
							<FormControl fullWidth margin="normal">
								<InputLabel id="label-traceMode">
									{t(`${translation}.FIELDS.TRACE_MODE.LABEL`)}
								</InputLabel>
								<Select
									labelId="label-traceMode"
									id="traceMode"
									name="traceMode"
									label={t(`${translation}.FIELDS.TRACE_MODE.LABEL`)}
									value={values.traceMode}
									onChange={handleChangeSelect}>
									{MiddlewareConfigTraceModes.map((trace) => (
										<MenuItem key={trace.id} value={trace.id}>
											{trace.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12} sm={4}>
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										name="debug"
										checked={values.debug}
										onChange={handleChangeCheckbox}
									/>
								}
								label={t<string>(`${translation}.FIELDS.DEBUG.LABEL`)}
							/>
						</Grid>

						<Grid item xs={12} sm={4}>
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										name="audit"
										checked={values.audit}
										onChange={handleChangeCheckbox}
									/>
								}
								label={t<string>(`${translation}.FIELDS.AUDIT.LABEL`)}
							/>
						</Grid>

						<Grid item xs={12} sm={4}>
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										name="stopPropagate"
										checked={values.stopPropagate}
										onChange={handleChangeCheckbox}
									/>
								}
								label={t<string>(`${translation}.FIELDS.STOP_PROPAGATE.LABEL`)}
							/>
						</Grid>

						<Grid item xs={12} sm={4}>
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										name="saveHistory"
										checked={values.saveHistory}
										onChange={handleChangeCheckbox}
									/>
								}
								label={t<string>(`${translation}.FIELDS.SAVE_HISTORY.LABEL`)}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpen(false)}>
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={
							middlewareConfig.updating ||
							(errors && !validateEmptyObj(errors)) ||
							validateEmptyObjProperty({
								name: values.name,
								key: values.key,
								prop: values.prop
							})
						}
						endIcon={middlewareConfig.updating && <CircularProgress size={20} />}>
						{type === MiddlewareConfigCreateEditTypeEnum.CREATE &&
							t('DIALOG:BUTTONS.CREATE')}
						{type === MiddlewareConfigCreateEditTypeEnum.EDIT &&
							t('DIALOG:BUTTONS.UPDATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateEditMiddlewareConfig;

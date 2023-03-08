import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../slices';
import {
	RobotCreate,
	RobotTwinsSummaryFetchList,
	robotTwinsSummarySelector
} from '../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../utilities/hooks/form/UseForm';
import { validateEmptyObjProperty } from '../../../../../utilities/methods/Object';
import { CreateRobotValidation } from './DialogCreateRobot.validation';
import {
	DialogCreateRobotFormInterface,
	DialogCreateRobotInterface
} from './RobotsActions.interface';

const DialogCreateRobot: FC<DialogCreateRobotInterface> = (props) => {
	const { open, setOpen } = props;
	const { t } = useTranslation(['ROBOTS', 'DIALOG']);

	const dispatch = useDispatch<AppDispatch>();
	const sites = useSelector(sitesSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const translation = 'LIST.ACTIONS.CREATE';

	const { handleChangeInput, handleBlur, handleChangeSelect, handleSubmit, values, errors } =
		useForm<DialogCreateRobotFormInterface>(
			{
				siteId: sites?.content?.data[0].id || '',
				name: '',
				customerName: '',
				ceInventoryId: ''
			},
			CreateRobotValidation,
			async () => {
				// dispatch: create a robot
				dispatch(
					RobotCreate(values, () => {
						// dispatch: fetch robot twins summary
						dispatch(RobotTwinsSummaryFetchList(true));

						// close dialog
						setOpen(false);
					})
				);
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
						<InputLabel id="label-siteId">
							{t(`${translation}.FORM.FIELDS.SITE.LABEL`)}
						</InputLabel>
						<Select
							labelId="label-siteId"
							id="siteId"
							name="siteId"
							label={t(`${translation}.FORM.FIELDS.SITE.LABEL`)}
							value={values.siteId}
							onChange={handleChangeSelect}>
							{sites.content?.data.map((site) => (
								<MenuItem key={site.id} value={site.id}>
									{site.title}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<TextField
							required
							type="text"
							id="name"
							name="name"
							label={t(`${translation}.FORM.FIELDS.NAME.LABEL`)}
							placeholder={t(`${translation}.FORM.FIELDS.NAME.PLACEHOLDER`)}
							value={values?.name}
							onChange={handleChangeInput}
							onBlur={handleBlur}
							error={!!errors?.name}
							helperText={errors?.name && t(errors.name)}
						/>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<TextField
							required
							type="text"
							id="customerName"
							name="customerName"
							label={t(`${translation}.FORM.FIELDS.CUSTOMER_NAME.LABEL`)}
							placeholder={t(`${translation}.FORM.FIELDS.CUSTOMER_NAME.PLACEHOLDER`)}
							value={values?.customerName}
							onChange={handleChangeInput}
							onBlur={handleBlur}
							error={!!errors?.customerName}
							helperText={errors?.customerName && t(errors.customerName)}
						/>
					</FormControl>

					<FormControl fullWidth margin="normal">
						<TextField
							required
							type="text"
							id="ceInventoryId"
							name="ceInventoryId"
							label={t(`${translation}.FORM.FIELDS.CE_INVENTORY_ID.LABEL`)}
							placeholder={t(
								`${translation}.FORM.FIELDS.CE_INVENTORY_ID.PLACEHOLDER`
							)}
							value={values?.ceInventoryId}
							onChange={handleChangeInput}
							onBlur={handleBlur}
							error={!!errors?.ceInventoryId}
							helperText={errors?.ceInventoryId && t(errors.ceInventoryId)}
						/>
					</FormControl>

					<Typography color="textSecondary" variant="body2" noWrap>
						{t(`${translation}.NOTE`)}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={closeDialog}>
						{t('DIALOG:BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={robotTwinsSummary.updating || validateEmptyObjProperty(values)}
						endIcon={robotTwinsSummary.updating && <CircularProgress size={20} />}>
						{t('DIALOG:BUTTONS.CREATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateRobot;

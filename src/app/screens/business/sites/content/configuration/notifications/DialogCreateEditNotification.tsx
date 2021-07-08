import {
	Box,
	Button,
	Chip,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Switch,
	TextField
} from '@material-ui/core';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { siteSelector, SiteUpdateNotification } from '../../../../../../slices/sites/Site.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { DialogCreateEditNotificationValidation } from './DialogCreateEditNotification.validation';
import { SiteNotificationsCreateEditTypeEnum } from './SiteNotifications.enum';
import {
	DialogCreateEditNotificationInterface,
	DialogCreateEditNotificationPayloadInterface
} from './SiteNotifications.interface';
import { SiteNotificationsStyle } from './SiteNotifications.style';

const DialogCreateEditNotification: FC<DialogCreateEditNotificationInterface> = (props) => {
	const { notification, type, open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);
	const classes = SiteNotificationsStyle();

	const dispatch = useDispatch();
	const site = useSelector(siteSelector);

	const common = 'SITES:CONTENT.CONFIGURATION.NOTIFICATIONS.LIST.CREATE_EDIT';

	const { handleChangeMultipleInputs, handleChangeCheckbox, handleSubmit, values, errors } =
		useForm<DialogCreateEditNotificationPayloadInterface>(
			{
				userId: notification.userId,
				isActive: notification.isActive,
				users: notification.users
			},
			DialogCreateEditNotificationValidation,
			async () => {
				// dispatch: update notification
				dispatch(
					SiteUpdateNotification(
						{
							...notification,
							isActive: values.isActive,
							users: values.users.filter((e) => e)
						},
						() => setOpen(false)
					)
				);
			}
		);

	/**
	 * add user field
	 */
	const AddUserField = () => {
		const index = values.users.length || 0;
		const list = [...values.users];

		// add new field
		list.push('');

		// handle change: multiple inputs
		handleChangeMultipleInputs(
			index,
			{
				target: {
					name: 'users',
					value: ''
				}
			},
			list
		);
	};

	/**
	 * close create/edit dialog
	 * @param event
	 */
	const closeCreateEditNotificationDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// close dialog
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={closeCreateEditNotificationDialog} fullWidth>
			<form onSubmit={handleSubmit}>
				<DialogTitle>
					{type === SiteNotificationsCreateEditTypeEnum.CREATE &&
						t(`${common}.CREATE.TITLE`)}
					{type === SiteNotificationsCreateEditTypeEnum.EDIT && t(`${common}.EDIT.TITLE`)}
				</DialogTitle>
				<DialogContent>
					<Box>
						<FormControlLabel
							control={
								<Switch
									color="primary"
									name="isActive"
									checked={values.isActive}
									onChange={handleChangeCheckbox}
								/>
							}
							label={t(`${common}.FIELDS.ACTIVE.LABEL`)}
						/>
					</Box>
					<Box className={classes.sAddUser}>
						{values.users &&
							values.users.map((user, index) => (
								<FormControl error fullWidth margin="normal" key={index}>
									<TextField
										variant="outlined"
										type="email"
										name="users"
										value={user}
										onChange={(e) =>
											handleChangeMultipleInputs(index, e, values.users)
										}
										label={t(`${common}.FIELDS.EMAIL.LABEL`)}
										placeholder={t(`${common}.FIELDS.EMAIL.PLACEHOLDER`)}
									/>
									{errors?.users && errors.users[index] && (
										<FormHelperText>
											{t(`${common}.FIELDS.EMAIL.VALIDATIONS.INVALID`)}
										</FormHelperText>
									)}
								</FormControl>
							))}

						<Chip
							size="small"
							label={t(`${common}.ADD_USER`)}
							color="primary"
							variant="outlined"
							clickable
							onClick={AddUserField}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						disabled={site.notifications.loading}
						onClick={closeCreateEditNotificationDialog}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={site.notifications.loading}
						endIcon={site.notifications.loading && <CircularProgress size={20} />}>
						{type === SiteNotificationsCreateEditTypeEnum.CREATE && t('BUTTONS.CREATE')}
						{type === SiteNotificationsCreateEditTypeEnum.EDIT && t('BUTTONS.UPDATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateEditNotification;

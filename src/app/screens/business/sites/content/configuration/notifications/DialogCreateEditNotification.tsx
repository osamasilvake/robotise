import { Clear, Email } from '@mui/icons-material';
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
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Switch,
	TextField
} from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	notificationsSelector,
	NotificationTypesAndUsersFetchList,
	NotificationUpdate
} from '../../../../../../slices/business/sites/configuration/Notifications.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { SiteParamsInterface } from '../../../Site.interface';
import { DialogCreateEditNotificationValidation } from './DialogCreateEditNotification.validation';
import { SiteNotificationsCreateEditTypeEnum } from './SiteNotifications.enum';
import {
	DialogCreateEditNotificationFormInterface,
	DialogCreateEditNotificationInterface
} from './SiteNotifications.interface';
import { SiteNotificationsStyle } from './SiteNotifications.style';

const DialogCreateEditNotification: FC<DialogCreateEditNotificationInterface> = (props) => {
	const { index, type, open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);
	const classes = SiteNotificationsStyle();

	const dispatch = useDispatch();
	const notifications = useSelector(notificationsSelector);

	const [newNotification, setNewNotification] = useState('');

	const params = useParams() as SiteParamsInterface;
	const cSiteId = params.siteId;

	const notification = index !== undefined ? notifications.content?.data[index] : null;
	const translation = 'SITES:CONTENT.CONFIGURATION.NOTIFICATIONS.CREATE_EDIT';
	const fieldUsers = 'users';

	const { handleChangeStringInputs, handleChangeCheckbox, handleSubmit, values, errors } =
		useForm<DialogCreateEditNotificationFormInterface>(
			{
				isActive: !!notification?.isActive,
				users: notification?.users || []
			},
			DialogCreateEditNotificationValidation,
			async () => {
				// dispatch: update notification
				dispatch(
					NotificationUpdate(
						{
							id: !notification ? newNotification : notification.id,
							isActive: values.isActive,
							users: values.users.filter((e) => e),
							siteId: !notification ? cSiteId : ''
						},
						() => {
							// dispatch: fetch site notification types and users
							dispatch(NotificationTypesAndUsersFetchList(cSiteId, true));

							// reset new notification
							setNewNotification('');

							// close dialog
							setOpen(false);
						}
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

		// handle change: string inputs
		handleChangeStringInputs(
			index,
			{
				target: {
					name: fieldUsers,
					value: ''
				}
			},
			list
		);
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
		<Dialog open={open} onClose={closeDialog} fullWidth>
			<form onSubmit={handleSubmit}>
				<DialogTitle>
					{type === SiteNotificationsCreateEditTypeEnum.CREATE &&
						t(`${translation}.CREATE.TITLE`)}
					{type === SiteNotificationsCreateEditTypeEnum.EDIT &&
						t(`${translation}.EDIT.TITLE`)}
				</DialogTitle>

				{type === SiteNotificationsCreateEditTypeEnum.CREATE && (
					<DialogContent>
						<FormControl fullWidth margin="normal">
							<InputLabel id="notifications">
								{t(`${translation}.FIELDS.NOTIFICATION.LABEL`)}
							</InputLabel>
							<Select
								labelId="notifications"
								id="notifications"
								name="notifications"
								label={t(`${translation}.FIELDS.NOTIFICATION.LABEL`)}
								value={newNotification}
								onChange={(event) => setNewNotification(event.target.value)}>
								{notifications.content?.types.map((type) => (
									<MenuItem
										key={type.id}
										value={type.id}
										disabled={
											notifications.content?.data.filter(
												(item) => item.typeId === type.id
											).length === 1
										}>
										{type.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</DialogContent>
				)}

				{type === SiteNotificationsCreateEditTypeEnum.EDIT && (
					<DialogContent>
						<FormControlLabel
							control={
								<Switch
									name="isActive"
									checked={values.isActive}
									onChange={handleChangeCheckbox}
								/>
							}
							label={t<string>(`${translation}.FIELDS.ACTIVE.LABEL`)}
						/>

						<Box className={classes.sAddUser}>
							{values.users.map((user, index) => (
								<FormControl key={index} fullWidth margin="normal">
									<TextField
										type="email"
										id={`${fieldUsers}-${index}`}
										name={fieldUsers}
										label={t(`${translation}.FIELDS.EMAIL.LABEL`)}
										placeholder={t(`${translation}.FIELDS.EMAIL.PLACEHOLDER`)}
										value={user}
										onChange={(e) =>
											handleChangeStringInputs(index, e, values.users)
										}
										helperText={
											errors?.users &&
											errors.users[index] &&
											t(errors.users[index])
										}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														disabled={!user}
														edge="end"
														onClick={() =>
															handleChangeStringInputs(
																index,
																{
																	target: {
																		name: fieldUsers,
																		value: ''
																	}
																},
																values.users
															)
														}>
														{user ? <Clear /> : <Email />}
													</IconButton>
												</InputAdornment>
											)
										}}
									/>
								</FormControl>
							))}

							<Chip
								size="small"
								label={t(`${translation}.ADD_USER`)}
								color="primary"
								variant="outlined"
								clickable
								onClick={AddUserField}
							/>
						</Box>
					</DialogContent>
				)}

				<DialogActions>
					<Button
						variant="outlined"
						onClick={closeDialog}
						disabled={notifications.updating}>
						{t('BUTTONS.CANCEL')}
					</Button>
					<Button
						variant="outlined"
						type="submit"
						disabled={
							notifications.updating ||
							(type === SiteNotificationsCreateEditTypeEnum.CREATE &&
								!newNotification) ||
							(type === SiteNotificationsCreateEditTypeEnum.EDIT &&
								!!(errors && errors.users.filter((e) => e).length))
						}
						endIcon={notifications.updating && <CircularProgress size={20} />}>
						{type === SiteNotificationsCreateEditTypeEnum.CREATE && t('BUTTONS.CREATE')}
						{type === SiteNotificationsCreateEditTypeEnum.EDIT && t('BUTTONS.UPDATE')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default DialogCreateEditNotification;

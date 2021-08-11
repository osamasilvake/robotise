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
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Switch,
	TextField
} from '@material-ui/core';
import { Clear, Email } from '@material-ui/icons';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	SiteNotificationTypesAndUsersFetch,
	SiteNotificationUpdate,
	siteSelector
} from '../../../../../../slices/business/sites/Site.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { SiteParamsInterface } from '../../../Site.interface';
import { DialogCreateEditNotificationValidation } from './DialogCreateEditNotification.validation';
import { SiteNotificationsCreateEditTypeEnum } from './SiteNotifications.enum';
import {
	DialogCreateEditNotificationInterface,
	DialogCreateEditNotificationPayloadInterface
} from './SiteNotifications.interface';
import { SiteNotificationsStyle } from './SiteNotifications.style';

const DialogCreateEditNotification: FC<DialogCreateEditNotificationInterface> = (props) => {
	const { index, type, open, setOpen } = props;
	const { t } = useTranslation(['DIALOG', 'SITES']);
	const classes = SiteNotificationsStyle();

	const dispatch = useDispatch();
	const site = useSelector(siteSelector);
	const notification = index !== undefined ? site.notifications.content?.data[index] : null;

	const [newNotification, setNewNotification] = useState('');

	const params: SiteParamsInterface = useParams();
	const cSiteId = params.siteId;

	const common = 'SITES:CONTENT.CONFIGURATION.NOTIFICATIONS.LIST.CREATE_EDIT';
	const fieldUsers = 'users';

	const { handleChangeStringInputs, handleChangeCheckbox, handleSubmit, values, errors } =
		useForm<DialogCreateEditNotificationPayloadInterface>(
			{
				isActive: !!notification?.isActive,
				users: notification?.users || []
			},
			DialogCreateEditNotificationValidation,
			async () => {
				// dispatch: update notification
				dispatch(
					SiteNotificationUpdate(
						{
							id: !notification ? newNotification : notification.id,
							isActive: values.isActive,
							users: values.users.filter((e) => e),
							siteId: !notification ? cSiteId : ''
						},
						() => {
							// close dialog
							setOpen(false);

							// reset new notification
							setNewNotification('');

							// create notification: refresh list
							if (index === undefined) {
								// dispatch: fetch notification types and users
								dispatch(SiteNotificationTypesAndUsersFetch(cSiteId, true));
							}
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

				{type === SiteNotificationsCreateEditTypeEnum.CREATE && (
					<DialogContent>
						<FormControl variant="outlined" fullWidth margin="normal">
							<InputLabel id="notification">
								{t(`${common}.FIELDS.NOTIFICATION.LABEL`)}
							</InputLabel>
							<Select
								labelId="notification"
								id="notifications"
								name="notifications"
								label={t(`${common}.FIELDS.NOTIFICATION.LABEL`)}
								value={newNotification}
								onChange={(event) => setNewNotification(event.target.value)}>
								{site.notifications.content?.types.map((type) => (
									<MenuItem
										key={type.id}
										value={type.id}
										disabled={
											site.notifications.content?.data.filter(
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
							{values.users.map((user, index) => (
								<FormControl error fullWidth margin="normal" key={index}>
									<TextField
										variant="outlined"
										type="email"
										id={`${fieldUsers}-${index}`}
										name={fieldUsers}
										value={user}
										onChange={(e) =>
											handleChangeStringInputs(index, e, values.users)
										}
										label={t(`${common}.FIELDS.EMAIL.LABEL`)}
										placeholder={t(`${common}.FIELDS.EMAIL.PLACEHOLDER`)}
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
									{errors?.users && errors.users[index] && (
										<FormHelperText>{t(errors.users[index])}</FormHelperText>
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
				)}

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
						disabled={
							site.notifications.loading ||
							(type === SiteNotificationsCreateEditTypeEnum.CREATE &&
								!newNotification) ||
							(type === SiteNotificationsCreateEditTypeEnum.EDIT &&
								!!(errors && errors.users.filter((e) => e).length))
						}
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

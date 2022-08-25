import { Button, Card, CardContent, FormControl, Grid, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../slices';
import {
	robotPasswordSelector,
	RobotPasswordUpdate
} from '../../../../slices/setup/robot-password/RobotPassword.slice';
import { useForm } from '../../../../utilities/hooks/form/UseForm';
import { SetupRobotPasswordFormInterface } from './SetupRobotPassword.interface';
import { SetupRobotPasswordStyle } from './SetupRobotPassword.style';

const SetupWifiConfigContent: FC = () => {
	const { t } = useTranslation('SETUP');
	const classes = SetupRobotPasswordStyle();

	const dispatch = useDispatch<AppDispatch>();
	const robotPassword = useSelector(robotPasswordSelector);

	const translation = 'CONTENT.ROBOT_PASSWORD';

	const { handleChangeInput, handleBlur, handleSubmit, values } =
		useForm<SetupRobotPasswordFormInterface>(
			{ password: robotPassword.content?.data?.attributes?.password || '' },
			() => ({ password: '' }),
			async () => {
				// dispatch: update robot password
				dispatch(RobotPasswordUpdate(values.password));
			}
		);

	return (
		<Card square elevation={1}>
			<CardContent>
				<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${translation}.EXCERPT`)}
				</Typography>

				<form onSubmit={handleSubmit}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth margin="normal">
								<TextField
									required
									type="text"
									id="password"
									name="password"
									label={t(`${translation}.FORM.FIELDS.PASSWORD.LABEL`)}
									placeholder={t(
										`${translation}.FORM.FIELDS.PASSWORD.PLACEHOLDER`
									)}
									value={values?.password}
									onChange={handleChangeInput}
									onBlur={handleBlur}
								/>
							</FormControl>
						</Grid>
					</Grid>

					<Grid item xs={12} className={classes.sSubmit}>
						<Button variant="outlined" type="submit">
							{t(`${translation}.FORM.BUTTONS.UPDATE`)}
						</Button>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};
export default SetupWifiConfigContent;

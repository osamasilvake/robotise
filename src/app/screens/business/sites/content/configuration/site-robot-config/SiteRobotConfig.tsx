import {
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography
} from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { SiteRobotConfigUpdate } from '../../../../../../slices/business/sites/Site.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { SiteParamsInterface } from '../../../Site.interface';
import {
	SiteRobotConfigFormInterface,
	SiteRobotConfigInterface
} from './SiteRobotConfig.interface';
import { SiteRobotConfigStyle } from './SiteRobotConfig.style';

const SiteRobotConfig: FC<SiteRobotConfigInterface> = (props) => {
	const { sites, site } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteRobotConfigStyle();

	const dispatch = useDispatch();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const params: SiteParamsInterface = useParams();
	const cSiteId = params.siteId;
	const cSiteRobot = sites.content?.dataById[cSiteId].robots[0];
	const attachedRobot = robotTwinsSummary.content?.dataById[cSiteRobot?.id || ''];

	const common = 'CONTENT.CONFIGURATION.SITE_ROBOT_CONFIG';

	const { handleChangeSelect, handleSubmit, values } = useForm<SiteRobotConfigFormInterface>(
		{
			robotId: ''
		},
		() => ({ robotId: '' }),
		async () => {
			// dispatch: update site robot config
			dispatch(SiteRobotConfigUpdate(cSiteId, values));
		}
	);

	return robotTwinsSummary.content?.data.length ? (
		<Grid item xs={12} md={6}>
			<Card square elevation={1}>
				<CardContent>
					<Typography variant="h6">{t(`${common}.TITLE`)}</Typography>
					<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
						{t(`${common}.EXCERPT`)}
					</Typography>

					<form onSubmit={handleSubmit} className={classes.sForm}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<FormControl variant="outlined" fullWidth>
									<InputLabel id="notification">
										{t(`${common}.FORM.FIELDS.SITE.LABEL`)}
									</InputLabel>
									<Select
										labelId="robotId"
										id="robotId"
										name="robotId"
										label={t(`${common}.FORM.FIELDS.SITE.LABEL`)}
										value={values.robotId}
										onChange={handleChangeSelect}>
										{robotTwinsSummary.content?.data
											.filter((robot) => robot.siteId === cSiteId)
											.map((robot) => (
												<MenuItem key={robot.robotId} value={robot.robotId}>
													{robot.robotTitle}
												</MenuItem>
											))}
									</Select>
									{!attachedRobot && (
										<FormHelperText error>
											{t(`${common}.FORM.FIELDS.SITE.NOTE`)}
										</FormHelperText>
									)}
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<Button
									variant="outlined"
									type="submit"
									disabled={site.siteRobotConfig.loading || !values.robotId}
									endIcon={
										site.siteRobotConfig.loading && (
											<CircularProgress size={20} />
										)
									}>
									{t(`${common}.FORM.BUTTONS.UPDATE`)}
								</Button>
							</Grid>
						</Grid>
					</form>
				</CardContent>
			</Card>
		</Grid>
	) : null;
};
export default SiteRobotConfig;

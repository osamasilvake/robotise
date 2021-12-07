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
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SiteRobotConfigUpdate } from '../../../../../../slices/business/sites/Site.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { SiteParamsInterface } from '../../../Site.interface';
import {
	SiteRobotConfigFormInterface,
	SiteRobotConfigInterface
} from './SiteRobotConfig.interface';
import { SiteRobotConfigStyle } from './SiteRobotConfig.style';

const SiteRobotConfig: FC<SiteRobotConfigInterface> = (props) => {
	const { sites, site, robotTwinsSummary } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteRobotConfigStyle();

	const dispatch = useDispatch();

	const params = useParams() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const cSiteRobot = sites.content?.dataById[cSiteId].robots[0];
	const attachedRobot = robotTwinsSummary.content?.dataById[cSiteRobot?.id || ''];
	const translation = 'CONTENT.CONFIGURATION.SITE_ROBOT_CONFIG';

	const { handleChangeSelect, handleSubmit, values } = useForm<SiteRobotConfigFormInterface>(
		{
			robotId: attachedRobot?.robotId || ''
		},
		() => ({ robotId: '' }),
		async () => {
			// dispatch: update site robot config
			dispatch(SiteRobotConfigUpdate(cSiteId, values));
		}
	);

	return robotTwinsSummary.content?.data.length ? (
		<Card square elevation={1}>
			<CardContent>
				<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${translation}.EXCERPT`)}
				</Typography>

				<form onSubmit={handleSubmit} className={classes.sForm}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<FormControl error fullWidth>
								<InputLabel id="label-robotId" error={!attachedRobot}>
									{t(`${translation}.FORM.FIELDS.SITE.LABEL`)}
								</InputLabel>
								<Select
									labelId="label-robotId"
									id="robotId"
									name="robotId"
									label={t(`${translation}.FORM.FIELDS.SITE.LABEL`)}
									value={values.robotId}
									onChange={handleChangeSelect}
									error={!attachedRobot}>
									{robotTwinsSummary.content?.data
										.filter((robot) => robot.siteId === cSiteId)
										.map((robot) => (
											<MenuItem key={robot.robotId} value={robot.robotId}>
												{robot.robotTitle}
											</MenuItem>
										))}
								</Select>
								{!attachedRobot && (
									<FormHelperText>
										{t(`${translation}.FORM.FIELDS.SITE.NOTE`)}
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
									site.siteRobotConfig.loading && <CircularProgress size={20} />
								}>
								{t(`${translation}.FORM.BUTTONS.UPDATE`)}
							</Button>
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	) : null;
};
export default SiteRobotConfig;

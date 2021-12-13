import {
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControl,
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

import { RobotSiteConfigUpdate } from '../../../../../../slices/business/robots/Robot.slice';
import { RobotTwinsFetch } from '../../../../../../slices/business/robots/RobotTwins.slice';
import { RobotTwinsSummaryFetchList } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { RobotParamsInterface } from '../../../Robot.interface';
import {
	RobotSiteConfigFormInterface,
	RobotSiteConfigInterface
} from './RobotSiteConfig.interface';
import { RobotSiteConfigStyle } from './RobotSiteConfig.style';

const RobotSiteConfig: FC<RobotSiteConfigInterface> = (props) => {
	const { sites, robotTwinsSummary, robot } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotSiteConfigStyle();

	const dispatch = useDispatch();

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const cRobotId = params.robotId;
	const robotTwinsSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const translation = 'CONTENT.CONFIGURATION.ROBOT_SITE_CONFIG';

	const { handleChangeSelect, handleSubmit, values } = useForm<RobotSiteConfigFormInterface>(
		{
			siteId: robotTwinsSingle?.siteId || ''
		},
		() => ({ siteId: '' }),
		async () => {
			if (robotTwinsSingle) {
				// dispatch: update robot site config
				dispatch(
					RobotSiteConfigUpdate(cRobotId, values, () => {
						// dispatch: fetch robot twins summary
						dispatch(RobotTwinsSummaryFetchList(true));

						// dispatch: fetch robot twins of a robot
						dispatch(RobotTwinsFetch(robotTwinsSingle.id, true));
					})
				);
			}
		}
	);

	return (
		<Card square elevation={1}>
			<CardContent>
				<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${translation}.EXCERPT`)}
				</Typography>

				<form onSubmit={handleSubmit} className={classes.sForm}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<FormControl fullWidth>
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
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="outlined"
								type="submit"
								disabled={
									robot.robotSiteConfig.loading ||
									(!!values.siteId &&
										sites.content?.dataById[values.siteId]?.id ===
											robotTwinsSingle?.siteId)
								}
								endIcon={
									robot.robotSiteConfig.loading && <CircularProgress size={20} />
								}>
								{t(`${translation}.FORM.BUTTONS.UPDATE`)}
							</Button>
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};
export default RobotSiteConfig;

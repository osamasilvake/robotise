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
} from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RobotSiteConfigUpdate } from '../../../../../../slices/business/robots/Robot.slice';
import { RobotTwinsFetch } from '../../../../../../slices/business/robots/RobotTwins.slice';
import { RobotTwinsSummaryFetchList } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { sitesSelector } from '../../../../../../slices/business/sites/Sites.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { RobotParamsInterface } from '../../../Robot.interface';
import {
	RobotSiteConfigInterface,
	RobotSiteConfigPayloadInterface
} from './RobotSiteConfig.interface';
import { RobotSiteConfigStyle } from './RobotSiteConfig.style';

const RobotSiteConfig: FC<RobotSiteConfigInterface> = (props) => {
	const { robotTwinsSummary, robot } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotSiteConfigStyle();
	const cardClasses = CardStyle();

	const sites = useSelector(sitesSelector);
	const dispatch = useDispatch();

	const params: RobotParamsInterface = useParams();

	const robotSingle = robotTwinsSummary.content?.dataById[params.robotId];
	const common = 'CONTENT.CONFIGURATION.ROBOT_SITE_CONFIG';

	const { handleChangeSelect, handleSubmit, values } = useForm<RobotSiteConfigPayloadInterface>(
		{
			siteId: robotSingle?.siteId || ''
		},
		() => ({ siteId: '' }),
		async () => {
			if (robotSingle?.robotId) {
				// dispatch: update robot site config
				dispatch(
					RobotSiteConfigUpdate(robotSingle.robotId, values, () => {
						// dispatch: fetch robot twins summary
						dispatch(RobotTwinsSummaryFetchList(true));

						// dispatch: fetch robot twins of a robot
						dispatch(RobotTwinsFetch(robotSingle.id, true));
					})
				);
			}
		}
	);

	return (
		<Card square elevation={1}>
			<CardContent className={cardClasses.sCardContent1}>
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
									labelId="siteId"
									id="siteId"
									name="siteId"
									label={t(`${common}.FORM.FIELDS.SITE.LABEL`)}
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
									!!values.siteId &&
									sites.content?.dataById[values.siteId]?.id ===
										robotSingle?.siteId
								}
								endIcon={
									robot.robotSiteConfig.loading && <CircularProgress size={20} />
								}>
								{t(`${common}.FORM.BUTTONS.UPDATE`)}
							</Button>
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};
export default RobotSiteConfig;

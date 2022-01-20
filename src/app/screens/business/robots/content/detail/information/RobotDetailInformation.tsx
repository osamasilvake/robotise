import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { dateFormat2 } from '../../../../../../utilities/methods/Date';
import RobotDetailComputerInfo from './RobotDetailComputerInfo';
import RobotDetailHumanPerception from './RobotDetailHumanPerception';
import { RobotDetailInformationInterface } from './RobotDetailInformation.interface';
import { RobotDetailInformationStyle } from './RobotDetailInformation.style';
import RobotDetailSafetySensors from './RobotDetailSafetySensors';
import RobotDetailSafetySystems from './RobotDetailSafetySystems';
import RobotDetailTransitPointStarted from './RobotDetailTransitPointStarted';

const RobotDetailInformation: FC<RobotDetailInformationInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailInformationStyle();

	const date = robotTwins.safetySystems?.updatedAt || robotTwins.safetySensors?.updatedAt;

	return (
		<Box className={classes.sStateContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.DETAIL.INFORMATION.TITLE')}
			</Typography>

			{/* Date */}
			{date && (
				<Typography variant="caption" color="textSecondary">
					{dateFormat2(date)}
				</Typography>
			)}

			{/* Grid */}
			<Grid container spacing={1} className={classes.sGridContainer}>
				{robotTwins.safetySystems && (
					<Grid item xs={12} md={6}>
						<RobotDetailSafetySystems
							systems={robotTwins.safetySystems}
							isDocked={!!robotTwins.dockingState?.properties.isDocked}
						/>
					</Grid>
				)}
				{robotTwins.safetySensors && (
					<Grid item xs={12} md={6}>
						<RobotDetailSafetySensors sensors={robotTwins.safetySensors} />
					</Grid>
				)}
				{robotTwins.computerInfo && (
					<Grid item xs={12} md={6}>
						<RobotDetailComputerInfo computerInfo={robotTwins.computerInfo} />
					</Grid>
				)}
				{robotTwins.humanPerception && (
					<Grid item xs={12} md={6}>
						<RobotDetailHumanPerception humanPerception={robotTwins.humanPerception} />
					</Grid>
				)}
				{robotTwins.transitPointStarted && (
					<Grid item xs={12} md={6}>
						<RobotDetailTransitPointStarted
							transitPointStarted={robotTwins.transitPointStarted}
						/>
					</Grid>
				)}
			</Grid>
		</Box>
	);
};
export default RobotDetailInformation;

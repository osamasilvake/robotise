import { Box, Grid, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { momentFormat2 } from '../../../../../../utilities/methods/Moment';
import RobotDetailComputerInfo from './RobotDetailComputerInfo';
import { RobotDetailInformationInterface } from './RobotDetailInformation.interface';
import { RobotDetailInformationStyle } from './RobotDetailInformation.style';
import RobotDetailSafetySensors from './RobotDetailSafetySensors';
import RobotDetailSafetySystems from './RobotDetailSafetySystems';

const RobotDetailInformation: FC<RobotDetailInformationInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailInformationStyle();

	return (
		<Box className={classes.sStateContainer}>
			{/* Title */}
			<Typography variant="h6" color="textSecondary">
				{t('CONTENT.DETAIL.INFORMATION.TITLE')}
			</Typography>

			{/* Date */}
			<Typography variant="caption" color="textSecondary">
				{momentFormat2(
					robotTwins.safetySystemsState?.updatedAt ||
						robotTwins.safetySensorsState?.updatedAt
				)}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1} className={classes.sGridContainer}>
				<Grid item xs={12} md={6}>
					<RobotDetailSafetySystems systems={robotTwins.safetySystemsState} />
				</Grid>
				<Grid item xs={12} md={6}>
					<RobotDetailSafetySensors sensors={robotTwins.safetySensorsState} />
				</Grid>
				<Grid item xs={12} md={6}>
					<RobotDetailComputerInfo computerInfo={robotTwins.computerInfoState} />
				</Grid>
			</Grid>
		</Box>
	);
};
export default RobotDetailInformation;

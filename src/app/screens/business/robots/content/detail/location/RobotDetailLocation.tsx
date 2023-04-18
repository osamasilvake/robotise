import { OpenInNew } from '@mui/icons-material';
import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../services';
import { dateFormat2 } from '../../../../../../utilities/methods/Date';
import { RobotDetailLocationInterface } from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';
import RobotDetailLocationCard from './RobotDetailLocationCard';
import RobotDetailLocationInfo from './RobotDetailLocationInfo';

const RobotDetailLocation: FC<RobotDetailLocationInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailLocationStyle();

	const [grid, setGrid] = useState(false);
	const [plannedPath, setPlannedPath] = useState(false);

	const translation = 'CONTENT.DETAIL.LOCATION';
	const siteId = robotTwins?.site?.id;

	/**
	 * open map editor on ROC Tools
	 * @returns
	 */
	const openMapEditor = () => {
		const floorId = robotTwins?.location?.value?.floorId;
		const mapId = robotTwins?.location?.value?.mapId;
		let url = AppConfigService.envRocToolsUrl.replace(':siteId', siteId);
		url = `${url}?floorId=${floorId}&mapId=${mapId}`;
		return `${url}`;
	};

	return robotTwins.location ? (
		<Box className={classes.sContainer}>
			<Stack spacing={1} direction="row" alignItems="center" className={classes.sTitle}>
				{/* Title */}
				<Typography variant="h6" color="textSecondary">
					{t(`${translation}.TITLE`)}
				</Typography>

				{/* Map Editor */}
				{siteId && (
					<Link underline="hover" target="_blank" fontSize={13} href={openMapEditor()}>
						Map Editor
						<OpenInNew fontSize="small" className={classes.sLinkIcon} />
					</Link>
				)}
			</Stack>

			{/* Floor */}
			{robotTwins.location.value.floor && (
				<Typography color="textPrimary">
					{t(`${translation}.FLOOR`)} {robotTwins.location.value.floor}
				</Typography>
			)}

			{/* Date */}
			<Typography variant="caption" color="textSecondary">
				{dateFormat2(robotTwins.location.updatedAt)}
			</Typography>

			{/* Grid */}
			<Grid container spacing={1}>
				{/* Card */}
				<RobotDetailLocationCard
					robotTwins={robotTwins}
					grid={grid}
					plannedPath={plannedPath}
				/>

				{/* Info */}
				<RobotDetailLocationInfo
					location={robotTwins.location}
					grid={grid}
					setGrid={setGrid}
					plannedPath={plannedPath}
					setPlannedPath={setPlannedPath}
				/>
			</Grid>
		</Box>
	) : null;
};
export default RobotDetailLocation;

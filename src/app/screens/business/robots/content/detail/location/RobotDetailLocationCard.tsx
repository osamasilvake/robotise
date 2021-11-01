import { Box, Card, CardContent, Grid } from '@mui/material';
import clsx from 'clsx';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Picture from '../../../../../../components/common/picture/Picture';
import { PictureOnLoadInterface } from '../../../../../../components/common/picture/Picture.interface';
import {
	RobotMapLocationFetch,
	robotSelector
} from '../../../../../../slices/business/robots/Robot.slice';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { robotLocationImageUrl } from '../../../Robots.url';
import { RobotDetailLocationHumanLegTypeEnum } from './RobotDetailLocation.enum';
import {
	RobotDetailLocationCardHumanIconCoordsInterface,
	RobotDetailLocationCardInterface,
	RobotDetailLocationCardPlannedPathIconCoordsInterface
} from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';
import RobotDetailLocationCardHumanIcons from './RobotDetailLocationCardHumanIcon';
import RobotDetailLocationCardPlannedPath from './RobotDetailLocationCardPlannedPath';
import RobotDetailLocationCardRobotIcon from './RobotDetailLocationCardRobotIcon';

const RobotDetailLocationCard: FC<RobotDetailLocationCardInterface> = (props) => {
	const { robotTwins, grid } = props;
	const classes = RobotDetailLocationStyle();
	const cardClasses = CardStyle();

	const dispatch = useDispatch();
	const robot = useSelector(robotSelector);

	const [robotCoords, setRobotCoords] = useState({ x: NaN, y: NaN, yaw: NaN });
	const [humanCoords, setHumanCoords] = useState<
		RobotDetailLocationCardHumanIconCoordsInterface[]
	>([]);
	const [plannedPathCoords, setPlannedPathCoords] = useState<
		RobotDetailLocationCardPlannedPathIconCoordsInterface[]
	>([]);

	const [ratio, setRatio] = useState({ x: NaN, y: NaN, cx: NaN, cy: NaN });

	const robotTwinsMapName = robotTwins.location?.value.mapName || '';
	const robotMapName = robot.map.content?.name || '';

	useEffect(() => {
		if (robotTwinsMapName !== robotMapName) {
			// dispatch: fetch robot map location
			dispatch(RobotMapLocationFetch(robotTwinsMapName));
		}
	}, [dispatch, robotTwinsMapName, robotMapName]);

	useEffect(() => {
		const origin = robot.map.content?.origin;
		const resolution = robot.map.content?.resolution;

		if (origin && resolution && ratio) {
			// robot coordinates
			const robotCoords = robotTwins.location?.value;
			if (robotCoords) {
				const x = (Math.abs(origin[0] - robotCoords.x) / resolution) * ratio.x;
				const y = (Math.abs(origin[1] - robotCoords.y) / resolution) * ratio.y;
				setRobotCoords({
					x: x > 0 ? x % ratio.cx : x,
					y: y > 0 ? y % ratio.cy : y,
					yaw: robotCoords.yaw
				});
			}

			// human coordinates
			const humanCoords = {
				legsClose: robotTwins.humanPerception?.properties.legsClose || [],
				legsFar: robotTwins.humanPerception?.properties.legsFar || []
			};
			if (humanCoords) {
				const legsCoords = [...humanCoords.legsClose, ...humanCoords.legsFar].map(
					(leg, index) => ({
						x: (Math.abs(origin[0] - leg.x) / resolution) * ratio.x,
						y: (Math.abs(origin[1] - leg.y) / resolution) * ratio.y,
						type:
							humanCoords?.legsClose.length > index
								? RobotDetailLocationHumanLegTypeEnum.LEG_CLOSE
								: RobotDetailLocationHumanLegTypeEnum.LEG_FAR
					})
				);
				setHumanCoords(legsCoords);
			}

			// planned path coordinates
			const plannedPathCoords = robotTwins.plannedPath?.properties.points;
			if (plannedPathCoords?.length) {
				const plannedPath = plannedPathCoords.map((point) => ({
					x: (Math.abs(origin[0] - point.xM) / resolution) * ratio.x,
					y: (Math.abs(origin[1] - point.yM) / resolution) * ratio.y
				}));
				setPlannedPathCoords(plannedPath);
			}
		}
	}, [
		ratio,
		robot.map.content?.origin,
		robot.map.content?.resolution,
		robotTwins.location?.value,
		robotTwins.humanPerception?.properties.legsClose,
		robotTwins.humanPerception?.properties.legsFar,
		robotTwins.plannedPath
	]);

	/**
	 * on image load
	 * @param values
	 */
	const onLoad = useCallback((values: PictureOnLoadInterface) => {
		setRatio({
			x: values.clientWidth / values.naturalWidth,
			y: values.clientHeight / values.naturalHeight,
			cx: values.clientWidth,
			cy: values.clientHeight
		});
	}, []);

	return robot.map && !robot.map.loading ? (
		<Grid item sm={12} md={6}>
			<Card square elevation={1} className={classes.sCard}>
				<CardContent className={cardClasses.sCardContent0}>
					{/* Picture */}
					<Box
						className={clsx({
							[classes.sCardGridLines]: grid
						})}>
						<Picture
							src={robotLocationImageUrl(robotTwinsMapName)}
							alt={robotTwinsMapName}
							onLoad={onLoad}
							fullWidth
						/>
					</Box>

					{/* Robot Icon */}
					{robotTwinsMapName && !Number.isNaN(robotCoords.x) && (
						<RobotDetailLocationCardRobotIcon robotCoords={robotCoords} />
					)}

					{/* Human Icons */}
					{robotTwinsMapName &&
						!!humanCoords.length &&
						!Number.isNaN(humanCoords[0].x) && (
							<RobotDetailLocationCardHumanIcons humanCoords={humanCoords} />
						)}

					{/* Planned Path */}
					{robotTwinsMapName &&
						!!plannedPathCoords.length &&
						!Number.isNaN(plannedPathCoords[0].x) && (
							<RobotDetailLocationCardPlannedPath
								plannedPathCoords={plannedPathCoords}
							/>
						)}
				</CardContent>
			</Card>
		</Grid>
	) : null;
};
export default RobotDetailLocationCard;

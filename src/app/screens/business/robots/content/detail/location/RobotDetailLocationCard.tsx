import { Box, Card, CardContent, Grid } from '@mui/material';
import clsx from 'clsx';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Picture from '../../../../../../components/common/picture/Picture';
import { PictureOnLoadInterface } from '../../../../../../components/common/picture/Picture.interface';
import { AppDispatch } from '../../../../../../slices';
import {
	RobotMapFetch,
	robotOperationsSelector
} from '../../../../../../slices/business/robots/RobotOperations.slice';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { robotLocationImageUrl } from '../../../Robots.url';
import { RobotDetailLocationHumanLegTypeEnum } from './RobotDetailLocation.enum';
import {
	RobotDetailLocationCardHumanIconCoordsInterface,
	RobotDetailLocationCardInterface,
	RobotDetailLocationCardPlannedPathCoordsInterface,
	RobotDetailLocationCardRatioInterface
} from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';
import RobotDetailLocationCardHumanIcons from './RobotDetailLocationCardHumanIcon';
import RobotDetailLocationCardPlannedPath from './RobotDetailLocationCardPlannedPath';
import RobotDetailLocationCardRobotIcon from './RobotDetailLocationCardRobotIcon';

const RobotDetailLocationCard: FC<RobotDetailLocationCardInterface> = (props) => {
	const { robotTwins, grid, plannedPath } = props;
	const classes = RobotDetailLocationStyle();
	const cardClasses = CardStyle();

	const dispatch = useDispatch<AppDispatch>();
	const robotOperations = useSelector(robotOperationsSelector);

	const [ratio, setRatio] = useState<RobotDetailLocationCardRatioInterface>({
		x: 0,
		y: 0,
		cx: 0,
		cy: 0
	});
	const [plannedPathCoords, setPlannedPathCoords] = useState<
		RobotDetailLocationCardPlannedPathCoordsInterface[]
	>([]);
	const [robotCoords, setRobotCoords] = useState({ x: 0, y: 0, yaw: 0 });
	const [humanCoords, setHumanCoords] = useState<
		RobotDetailLocationCardHumanIconCoordsInterface[]
	>([]);

	const robotTwinsMapId = robotTwins.location?.value.mapId || '';
	const robotMapUpdatedAt = robotOperations.map.content?.updatedAt;
	const robotMapName = robotOperations?.map?.content?.name || '';
	const robotImagePath = robotOperations?.map?.content?.imagePath || '';

	useEffect(() => {
		// dispatch: fetch robot map
		dispatch(RobotMapFetch(robotTwinsMapId));
	}, [dispatch, robotTwinsMapId]);

	useEffect(() => {
		const origin = robotOperations.map.content?.origin;
		const resolution = robotOperations.map.content?.resolution;

		if (origin && resolution && ratio) {
			// planned path coordinates
			const plannedPathCoords = robotTwins.plannedPath?.properties.points;
			if (plannedPathCoords?.length) {
				setPlannedPathCoords(
					plannedPathCoords.map((point) => ({
						x: (Math.abs(origin[0] - point.xM) / resolution) * ratio.x,
						y: (Math.abs(origin[1] - point.yM) / resolution) * ratio.y
					}))
				);
			}

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
				setHumanCoords(
					[...humanCoords.legsClose, ...humanCoords.legsFar].map((leg, index) => ({
						x: (Math.abs(origin[0] - leg.x) / resolution) * ratio.x,
						y: (Math.abs(origin[1] - leg.y) / resolution) * ratio.y,
						type:
							humanCoords?.legsClose.length > index
								? RobotDetailLocationHumanLegTypeEnum.LEG_CLOSE
								: RobotDetailLocationHumanLegTypeEnum.LEG_FAR
					}))
				);
			}
		}
	}, [
		ratio,
		robotOperations.map.content,
		robotTwins.plannedPath?.properties.points,
		robotTwins.location?.value,
		robotTwins.humanPerception?.properties.legsClose,
		robotTwins.humanPerception?.properties.legsFar
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

	return robotOperations.map && !robotOperations.map.loading ? (
		<Grid item sm={12} md={6}>
			<Card square elevation={1} className={classes.sCard}>
				<CardContent className={cardClasses.sCardContent0}>
					<Box className={clsx({ [classes.sCardGridLines]: grid })}>
						<Picture
							src={robotLocationImageUrl(robotImagePath, robotMapUpdatedAt)}
							alt={robotMapName}
							onLoad={onLoad}
							fullWidth
						/>
					</Box>

					{robotTwinsMapId && (
						<>
							{/* Planned Path */}
							{plannedPath &&
								!!plannedPathCoords.length &&
								!!plannedPathCoords[0].x && (
									<RobotDetailLocationCardPlannedPath
										plannedPathCoords={plannedPathCoords}
										ratio={ratio}
									/>
								)}

							{/* Robot Icon */}
							{!!robotCoords.x && (
								<RobotDetailLocationCardRobotIcon
									robotCoords={robotCoords}
									plannedPath={plannedPath}
									activePoints={!!plannedPathCoords.length}
								/>
							)}

							{/* Human Icons */}
							{!!humanCoords.length && !!humanCoords[0].x && (
								<RobotDetailLocationCardHumanIcons humanCoords={humanCoords} />
							)}
						</>
					)}
				</CardContent>
			</Card>
		</Grid>
	) : null;
};
export default RobotDetailLocationCard;

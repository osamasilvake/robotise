import { Box, Card, CardContent, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Picture from '../../../../../../components/common/picture/Picture';
import { PictureOnLoadInterface } from '../../../../../../components/common/picture/Picture.interface';
import {
	RobotLocationMapFetch,
	robotSelector
} from '../../../../../../slices/business/robots/Robot.slice';
import { robotLocationImageUrl } from '../../../Robots.url';
import { RobotDetailLocationCardInterface } from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';
import RobotDetailLocationCardIcon from './RobotDetailLocationCardIcon';

const RobotDetailLocationCard: FC<RobotDetailLocationCardInterface> = (props) => {
	const { robotTwins, grid } = props;
	const classes = RobotDetailLocationStyle();

	const dispatch = useDispatch();
	const robot = useSelector(robotSelector);

	const [pointCoords, setPointCoords] = useState({ x: NaN, y: NaN, yaw: NaN });
	const [ratio, setRatio] = useState({ x: NaN, y: NaN, cx: NaN, cy: NaN });

	const robotTwinsMapName = robotTwins.location?.value.mapName || '';
	const robotMapName = robot.map.content?.name || '';

	useEffect(() => {
		if (robotTwinsMapName !== robotMapName) {
			// dispatch: fetch robot map location
			dispatch(RobotLocationMapFetch(robotTwinsMapName));
		}
	}, [dispatch, robotTwinsMapName, robotMapName]);

	useEffect(() => {
		const origin = robot.map.content?.origin;
		const coordinates = robotTwins.location?.value;
		const resolution = robot.map.content?.resolution;
		if (origin && resolution && ratio && coordinates) {
			const x = (Math.abs(origin[0] - coordinates.x) / resolution) * ratio.x;
			const y = (Math.abs(origin[1] - coordinates.y) / resolution) * ratio.y;
			setPointCoords({
				x: x > 0 ? x % ratio.cx : x,
				y: y > 0 ? y % ratio.cy : y,
				yaw: coordinates.yaw
			});
		}
	}, [
		ratio,
		robot.map.content?.origin,
		robot.map.content?.resolution,
		robotTwins.location?.value
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
			<Card square elevation={1} className={classes.sLocationCard}>
				<CardContent>
					{/* Picture */}
					<Box
						className={clsx({
							[classes.sLocationCardGridLines]: grid
						})}>
						<Picture
							src={robotLocationImageUrl(robotTwinsMapName)}
							alt={robotTwinsMapName}
							onLoad={onLoad}
							fullWidth
						/>
					</Box>

					{/* Icon */}
					{robotTwinsMapName && !Number.isNaN(pointCoords.x) && (
						<RobotDetailLocationCardIcon pointCoords={pointCoords} />
					)}
				</CardContent>
			</Card>
		</Grid>
	) : null;
};
export default RobotDetailLocationCard;

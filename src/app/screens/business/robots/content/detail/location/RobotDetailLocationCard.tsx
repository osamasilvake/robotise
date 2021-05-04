import { Box, Card, CardContent, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Picture from '../../../../../../components/common/picture/Picture';
import { PictureOnLoadInterface } from '../../../../../../components/common/picture/Picture.interface';
import { RobotLocationMapFetch, robotSelector } from '../../../../../../slices/robot/Robot.slice';
import { robotLocationImageUrl } from '../../../Robots.url';
import { RobotDetailLocationCardInterface } from './RobotDetailLocation.interface';
import { RobotDetailLocationStyles } from './RobotDetailLocation.style';
import RobotDetailLocationCardIcon from './RobotDetailLocationCardIcon';

const RobotDetailLocationCard: FC<RobotDetailLocationCardInterface> = (props) => {
	const { robotTwin, grid } = props;
	const classes = RobotDetailLocationStyles();

	const dispatch = useDispatch();
	const robot = useSelector(robotSelector);

	const [pointCoords, setPointCoords] = useState({ x: 0, y: 0, yaw: 0 });
	const [ratio, setRatio] = useState({ x: 0, y: 0, cx: 0, cy: 0 });

	const robotTwinsMapId = robotTwin.location?.value.map.id || '';
	const robotMapId = robot.map.content?.name || '';

	useEffect(() => {
		if (robotTwinsMapId !== robotMapId) {
			// dispatch: fetch robot map location
			dispatch(RobotLocationMapFetch(robotTwinsMapId));
		}
	}, [dispatch, robotTwinsMapId, robotMapId]);

	useEffect(() => {
		const origin = robot.map.content?.origin;
		const coordinates = robotTwin.location?.value.point;
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
		robotTwin.location?.value.point
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

	return (
		<Grid item sm={12} md={6}>
			<Card square elevation={1} className={classes.sLocationCard}>
				<CardContent>
					{/* Picture */}
					<Box
						className={clsx({
							[classes.sLocationCardGridLines]: grid
						})}>
						<Picture
							src={robotLocationImageUrl(robotTwinsMapId)}
							alt={robotTwinsMapId}
							onLoad={onLoad}
							fullWidth
						/>
					</Box>

					{/* Icon */}
					<RobotDetailLocationCardIcon pointCoords={pointCoords} />
				</CardContent>
			</Card>
		</Grid>
	);
};
export default RobotDetailLocationCard;

import { Box, Card, CardContent, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Picture from '../../../../../../components/common/picture/Picture';
import { PictureOnLoadInterface } from '../../../../../../components/common/picture/Picture.interface';
import { RobotLocationMapFetch, robotSelector } from '../../../../../../slices/robot/Robot.slice';
import { robotLocationImageUrl } from '../../../Robots.url';
import { RobotContentDetailLocationCardInterface } from './RobotContentDetailLocation.interface';
import { RobotContentDetailLocationStyles } from './RobotContentDetailLocation.style';
import RobotContentDetailLocationCardIcon from './RobotContentDetailLocationCardIcon';

const RobotContentDetailLocationCard: FC<RobotContentDetailLocationCardInterface> = (props) => {
	const { robot, grid } = props;
	const classes = RobotContentDetailLocationStyles();

	const dispatch = useDispatch();
	const sRobot = useSelector(robotSelector);

	const [pointCoords, setPointCoords] = useState({ x: 0, y: 0, yaw: 0 });
	const [ratio, setRatio] = useState({ x: 0, y: 0, cx: 0, cy: 0 });

	const mapId = robot.location?.value.map.id || '';

	useEffect(() => {
		// dispatch: fetch robot map location
		dispatch(RobotLocationMapFetch(mapId));
	}, [dispatch, mapId]);

	useEffect(() => {
		const origin = sRobot.map.content?.origin;
		const coordinates = robot.location?.value.point;
		const resolution = sRobot.map.content?.resolution;
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
		sRobot.map.content?.origin,
		sRobot.map.content?.resolution,
		robot.location?.value.point
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
						<Picture src={robotLocationImageUrl(mapId)} alt={mapId} onLoad={onLoad} />
					</Box>

					{/* Icon */}
					<RobotContentDetailLocationCardIcon pointCoords={pointCoords} />
				</CardContent>
			</Card>
		</Grid>
	);
};
export default RobotContentDetailLocationCard;

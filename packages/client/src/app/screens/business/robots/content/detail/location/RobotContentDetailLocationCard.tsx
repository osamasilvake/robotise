import { Card, CardContent, Grid } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Picture from '../../../../../../components/common/picture/Picture';
import { PictureOnLoadInterface } from '../../../../../../components/common/picture/Picture.interface';
import { RobotLocationMapFetch, robotSelector } from '../../../../../../slices/robot/Robot.slice';
import { robotLocationImageUrl } from '../../../Robots.url';
import { RobotContentDetailLocationCardInterface } from './RobotContentDetailLocation.interface';
import { RobotContentDetailLocationStyles } from './RobotContentDetailLocation.style';
import RobotContentDetailLocationCardIcon from './RobotContentDetailLocationCardIcon';

const RobotContentDetailLocationCard: FC<RobotContentDetailLocationCardInterface> = (props) => {
	const { robot } = props;
	const robotContentDetailLocationClasses = RobotContentDetailLocationStyles();

	const dispatch = useDispatch();
	const sRobot = useSelector(robotSelector);

	const [pointCoords, setPointCoords] = useState({ x: 0, y: 0, yaw: 0 });
	const [ratio, setRatio] = useState({ x: 0, y: 0, cx: 0, cy: 0 });

	const mapId = robot.location?.value.map.id || '';
	const coordinates = robot.location?.value.point;
	const resolution = sRobot.map.content?.resolution;
	const origin = sRobot.map.content?.origin;

	useEffect(() => {
		if (mapId) {
			// dispatch: fetch robot map of location
			dispatch(RobotLocationMapFetch(mapId));
		}
	}, [dispatch, mapId]);

	useEffect(() => {
		if (origin && resolution && ratio && coordinates) {
			const values = {
				x: ((Math.abs(origin[0] - coordinates.x) / resolution) * ratio.x) % ratio.cx,
				y: ((Math.abs(origin[1] - coordinates.y) / resolution) * ratio.y) % ratio.cy,
				yaw: coordinates.yaw
			};
			setPointCoords(values);
		}
	}, [origin, resolution, ratio, coordinates]);

	/**
	 * on image load
	 * @param values
	 */
	const onLoad = (values: PictureOnLoadInterface) => {
		const ratio = {
			x: values.clientWidth / values.naturalWidth,
			y: values.clientHeight / values.naturalHeight,
			cx: values.clientWidth,
			cy: values.clientHeight
		};
		setRatio(ratio);
	};

	return (
		<Grid item xs={12} sm={6}>
			<Card square elevation={1} className={robotContentDetailLocationClasses.sLocationCard}>
				<CardContent>
					{/* Picture */}
					<Picture src={robotLocationImageUrl(mapId)} alt="location" onLoad={onLoad} />

					{/* Icon */}
					<RobotContentDetailLocationCardIcon pointCoords={pointCoords} />
				</CardContent>
			</Card>
		</Grid>
	);
};
export default RobotContentDetailLocationCard;

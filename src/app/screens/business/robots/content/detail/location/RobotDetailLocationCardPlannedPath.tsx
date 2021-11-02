import { FC } from 'react';

import { AppConfigService } from '../../../../../../services';
import {
	RobotDetailLocationCardPlannedPathIconCoordsInterface,
	RobotDetailLocationCardPlannedPathInterface
} from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';

const RobotDetailLocationCardPlannedPath: FC<RobotDetailLocationCardPlannedPathInterface> = (
	props
) => {
	const { plannedPathCoords, ratio } = props;
	const classes = RobotDetailLocationStyle();

	/**
	 * prepare string for svg path
	 * @param points
	 * @returns
	 */
	const path = (points: RobotDetailLocationCardPlannedPathIconCoordsInterface[]) =>
		points
			.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${ratio.cy - point.y}`)
			.join(' ');

	return plannedPathCoords.length && ratio.cx && ratio.cy ? (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox={`0 0 ${ratio.cx} ${ratio.cy}`}
				className={classes.sCardPlannedPath}>
				<path
					d={path(plannedPathCoords)}
					style={{
						stroke: AppConfigService.AppOptions.colors.c13,
						strokeWidth: 3,
						fill: 'none',
						strokeDasharray: 4
					}}
				/>
			</svg>
		</>
	) : null;
};
export default RobotDetailLocationCardPlannedPath;

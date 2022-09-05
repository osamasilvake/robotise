import { FC } from 'react';

import { AppConfigService } from '../../../../../../services';
import {
	RobotDetailLocationCardPlannedPathCoordsInterface,
	RobotDetailLocationCardPlannedPathInterface
} from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';

const RobotDetailLocationCardPlannedPath: FC<RobotDetailLocationCardPlannedPathInterface> = (
	props
) => {
	const { plannedPathCoords, ratio } = props;
	const classes = RobotDetailLocationStyle();

	/**
	 * prepare path from coordinates
	 * @param points
	 * @returns
	 */
	const coordsToPath = (points: RobotDetailLocationCardPlannedPathCoordsInterface[]) =>
		points
			.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${ratio.cy - point.y}`)
			.join(' ');

	return plannedPathCoords.length && ratio.cx && ratio.cy ? (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox={`0 0 ${ratio.cx} ${ratio.cy}`}
				className={classes.sCardPlannedPath}>
				<marker
					id="flag"
					refX="5"
					refY="20"
					markerUnits="strokeWidth"
					markerWidth="8"
					markerHeight="8">
					<path
						d="m14.303 6-3-2H6V2H4v20h2v-8h4.697l3 2H20V6z"
						style={{ fill: AppConfigService.AppOptions.colors.c12 }}
					/>
				</marker>
				<path
					markerEnd="url(#flag)"
					d={coordsToPath(plannedPathCoords)}
					style={{
						stroke: AppConfigService.AppOptions.colors.c13,
						strokeWidth: 2,
						fill: 'none',
						strokeDasharray: 2
					}}
				/>
			</svg>
		</>
	) : null;
};
export default RobotDetailLocationCardPlannedPath;

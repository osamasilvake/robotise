import { FC } from 'react';

import { AppConfigService } from '../../../../../../services';
import { RobotDetailLocationCardPlannedPathInterface } from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';

const RobotDetailLocationCardPlannedPath: FC<RobotDetailLocationCardPlannedPathInterface> = (
	props
) => {
	const { plannedPathCoords } = props;
	const classes = RobotDetailLocationStyle();

	return (
		<svg className={classes.sCardPlannedPath}>
			<path
				d={plannedPathCoords.join(' ')}
				style={{
					stroke: AppConfigService.AppOptions.colors.c13,
					strokeWidth: 2.5,
					fill: 'none',
					strokeDasharray: 6
				}}
			/>
		</svg>
	);
};
export default RobotDetailLocationCardPlannedPath;

import { FC } from 'react';

import { AppConfigService } from '../../../../../../services';
import { RobotDetailLocationCardPlannedPathInterface } from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';

const RobotDetailLocationCardPlannedPath: FC<RobotDetailLocationCardPlannedPathInterface> = (
	props
) => {
	const { plannedPathCoords } = props;
	const classes = RobotDetailLocationStyle();

	console.log(plannedPathCoords);

	return plannedPathCoords.length ? (
		<>
			{plannedPathCoords.map((coord, index) => (
				<svg
					key={index}
					viewBox="0 0 50 36"
					className={classes.sCardRobotIcon}
					style={{
						fill: AppConfigService.AppOptions.colors.c10,
						left: coord.x,
						bottom: coord.y
					}}>
					<path d="M18.9546 17.1025C49.3217 17.2345 49.5601 17.5859 49.5489 17.9795C49.5383 18.3726 49.2816 18.7226 48.9081 18.8523L1.21318 35.4363C0.873975 35.5551 0.506408 35.4677 0.263355 35.2246C0.227058 35.1884 0.194082 35.1487 0.163776 35.1052C-0.0690426 34.7741 -0.0518402 34.3226 0.203918 33.9969L12.5201 18.3816L0.567195 1.47521C0.334344 1.14676 0.346901 0.699951 0.598739 0.372927C0.850578 0.0459033 1.28107 -0.0825509 1.66182 0.0539142L48.9546 17.1025Z" />
				</svg>
			))}
		</>
	) : null;
};
export default RobotDetailLocationCardPlannedPath;

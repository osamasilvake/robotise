import { FC } from 'react';

import { RobotDetailLocationCardRobotIconInterface } from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';

const RobotDetailLocationCardRobotIcon: FC<RobotDetailLocationCardRobotIconInterface> = (props) => {
	const { robotCoords, goalReached } = props;
	const classes = RobotDetailLocationStyle();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 128 128"
			className={classes.sCardRobotIcon}
			style={{
				bottom: robotCoords.y,
				left: robotCoords.x,
				transform: `translate(-50%, 50%) rotate(${
					robotCoords.yaw < 0 ? Math.abs(robotCoords.yaw) : -(robotCoords.yaw + 10)
				}deg)`
			}}>
			<g>
				<path d="M64,0a64,64,0,0,1,64,64H0A64,64,0,0,1,64,0Z" />
				{!goalReached && (
					<animateTransform
						attributeName="transform"
						type="rotate"
						values="0 64 64;-40 64 64;0 64 64"
						dur="1000ms"
						repeatCount="indefinite"
					/>
				)}
			</g>
			<g>
				<path d="M64,128A64,64,0,0,1,0,64H128A64,64,0,0,1,64,128Z" />
				{!goalReached && (
					<animateTransform
						attributeName="transform"
						type="rotate"
						values="0 64 64;40 64 64;0 64 64"
						dur="1000ms"
						repeatCount="indefinite"
					/>
				)}
			</g>
		</svg>
	);
};
export default RobotDetailLocationCardRobotIcon;

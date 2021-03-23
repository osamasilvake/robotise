import { FC } from 'react';

import RobotContentDetailState from './RobotContentDetailState';
import { RobotContentDetailStatesInterface } from './RobotContentDetailStates.interface';
import { robotStates } from './RobotContentDetailStates.list';

const RobotContentDetailStates: FC<RobotContentDetailStatesInterface> = (props) => {
	const { robot } = props;

	return (
		<>
			{robotStates(robot).map((state) => (
				<RobotContentDetailState key={state.type} robot={robot} state={state} />
			))}
		</>
	);
};
export default RobotContentDetailStates;

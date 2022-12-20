import { Grid } from '@mui/material';
import { FC } from 'react';

import RobotDetailStateCard from './RobotDetailStateCard';
import { RobotDetailStateInterface } from './RobotDetailStates.interface';
import { mapRobotStates } from './RobotDetailStates.map';

const RobotDetailState: FC<RobotDetailStateInterface> = (props) => {
	const { robotTwins, state } = props;

	return state && state.content ? (
		<>
			{Object.keys(state.content.properties).map((property) => {
				const mappedResult = mapRobotStates(`${state.type}.${property}`, robotTwins);
				return (
					mappedResult && (
						<Grid item xs={12} sm={6} md={4} lg={3} key={property}>
							<RobotDetailStateCard title={state.title} item={mappedResult} />
						</Grid>
					)
				);
			})}
		</>
	) : null;
};
export default RobotDetailState;

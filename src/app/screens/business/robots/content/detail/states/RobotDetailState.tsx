import { Grid } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import RobotDetailStateCard from './RobotDetailStateCard';
import { RobotDetailStateInterface } from './RobotDetailStates.interface';
import { mapRobotStates } from './RobotDetailStates.map';

const RobotDetailState: FC<RobotDetailStateInterface> = (props) => {
	const { robotTwins, state } = props;
	const { t } = useTranslation('ROBOTS');

	return state && state.content ? (
		<>
			{Object.keys(state.content.properties).map((property) => {
				const mappedResult = mapRobotStates(`${state.type}.${property}`, robotTwins);
				return (
					mappedResult && (
						<Grid key={property} item xs={12} sm={6} md={4} lg={3}>
							<RobotDetailStateCard
								icon={mappedResult?.icon}
								title={`${t(state.title)} ${t(mappedResult.title)}`}
								value={t(mappedResult.value)}
								date={mappedResult.date}
							/>
						</Grid>
					)
				);
			})}
		</>
	) : null;
};
export default RobotDetailState;

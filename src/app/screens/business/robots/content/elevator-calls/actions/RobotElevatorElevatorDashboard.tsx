import { Box } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ExternalLink from '../../../../../../components/common/external-link/ExternalLink';
import { ExternalLinkActionTypeEnum } from '../../../../../../components/common/external-link/ExternalLink.enum';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { deepLinkSelector } from '../../../../../../slices/settings/deep-links/DeepLink.slice';
import { RobotParamsInterface } from '../../../Robot.interface';

const RobotElevatorElevatorDashboard: FC = () => {
	const { t } = useTranslation('GENERAL');

	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const deepLink = useSelector(deepLinkSelector);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;

	const translation = 'COMMON.ELEVATOR_CALLS.LIST.ACTIONS.ELEVATOR_DASHBOARD';

	return (
		<Box>
			{/* Deep Link: Elevator Logs */}
			<ExternalLink
				text={t(`${translation}.LABEL`)}
				payload={{
					siteId: cSiteId,
					from: 'now-1d',
					to: 'now'
				}}
				actionType={ExternalLinkActionTypeEnum.ELEVATOR_DASHBOARD}
				showIcon={deepLink.elevatorDashboard.loading}
				disabled={deepLink.elevatorDashboard.loading}
			/>
		</Box>
	);
};
export default RobotElevatorElevatorDashboard;

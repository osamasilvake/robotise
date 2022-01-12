import { Tooltip } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../services';
import { StyledBadge } from '../../../../../../utilities/styles/Badge.style';
import { RobotDetailLocationHumanLegTypeEnum } from './RobotDetailLocation.enum';
import { RobotDetailLocationCardHumanIconInterface } from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';

const RobotDetailLocationCardHumanIcon: FC<RobotDetailLocationCardHumanIconInterface> = (props) => {
	const { humanCoords } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailLocationStyle();

	const translation = 'CONTENT.DETAIL.LOCATION.MAP.HUMAN_PERCEPTION';

	return (
		<>
			{humanCoords.map((coord, index) => (
				<Tooltip
					key={index}
					title={t<string>(`${translation}.${coord.type}`)}
					className={classes.sCardHumanTooltip}>
					<StyledBadge
						variant="dot"
						overlap="circular"
						style={{
							color: AppConfigService.AppOptions.colors.c12,
							left: coord.x,
							bottom: coord.y
						}}
						className={clsx(classes.sCardHumanIcon, {
							['Mui-dot-red']:
								coord.type === RobotDetailLocationHumanLegTypeEnum.LEG_CLOSE,
							['Mui-dot-orange']:
								coord.type === RobotDetailLocationHumanLegTypeEnum.LEG_FAR
						})}></StyledBadge>
				</Tooltip>
			))}
		</>
	);
};
export default RobotDetailLocationCardHumanIcon;

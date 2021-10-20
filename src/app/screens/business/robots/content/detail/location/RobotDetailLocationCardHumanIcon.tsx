import { Badge, Tooltip } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../services';
import { BadgeStyle } from '../../../../../../utilities/styles/Badge.style';
import { RobotDetailLocationHumanLegTypeEnum } from './RobotDetailLocation.enum';
import { RobotDetailLocationCardHumanIconInterface } from './RobotDetailLocation.interface';
import { RobotDetailLocationStyle } from './RobotDetailLocation.style';

const RobotDetailLocationCardHumanIcon: FC<RobotDetailLocationCardHumanIconInterface> = (props) => {
	const { humanCoords } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotDetailLocationStyle();
	const badgeClasses = BadgeStyle();

	const translation = 'CONTENT.DETAIL.LOCATION.MAP.HUMAN_PERCEPTION';

	return (
		<>
			{humanCoords.map((coord, index) => (
				<Tooltip
					key={index}
					title={String(t(`${translation}.${coord.type}`))}
					className={classes.sCardHumanTooltip}>
					<Badge
						variant="dot"
						overlap="circular"
						style={{
							color: AppConfigService.AppOptions.colors.c12,
							bottom: coord.y,
							left: coord.x
						}}
						classes={{
							badge: clsx(badgeClasses.sDot, {
								[badgeClasses.sRed]:
									coord.type === RobotDetailLocationHumanLegTypeEnum.LEG_CLOSE,
								[badgeClasses.sOrange]:
									coord.type === RobotDetailLocationHumanLegTypeEnum.LEG_FAR
							})
						}}
						className={classes.sCardHumanIcon}
					/>
				</Tooltip>
			))}
		</>
	);
};
export default RobotDetailLocationCardHumanIcon;

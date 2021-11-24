import { Box, Card, CardContent, Icon, Stack, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import ExternalLink from '../../../../../../components/common/external-link/ExternalLink';
import { ExternalLinkTypeEnum } from '../../../../../../components/common/external-link/ExternalLink.enum';
import { AppConfigService } from '../../../../../../services';
import { robotSelector } from '../../../../../../slices/business/robots/Robot.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotDetailStateCardInterface } from './RobotDetailStates.interface';
import { RobotDetailStatesStyle } from './RobotDetailStates.style';

const RobotDetailStateCard: FC<RobotDetailStateCardInterface> = (props) => {
	const { title, item } = props;
	const { t } = useTranslation(['ROBOTS', 'TOOLTIP']);
	const classes = RobotDetailStatesStyle();

	const robot = useSelector(robotSelector);

	const params = useParams() as RobotParamsInterface;

	const cRobotId = params.robotId;

	return (
		<Card variant="elevation" square elevation={1}>
			<CardContent className={clsx(classes.sCardContent)}>
				<Stack direction="row" className={classes.sCardContentIcons}>
					{/* Link */}
					{item.link && (
						<Box className={classes.sCardContentIconExternal}>
							<Tooltip title={t<string>(`TOOLTIP:${item.link?.tooltip}`)}>
								<Box>
									<ExternalLink
										text={t(item.link?.label)}
										payload={{
											robotId: cRobotId,
											from: 'now-1d',
											to: 'now'
										}}
										FetchExternalLink={item.link?.action}
										showIcon={robot.battery.loading}
										disabled={robot.battery.loading}
										type={ExternalLinkTypeEnum.ICON}
									/>
								</Box>
							</Tooltip>
						</Box>
					)}

					{/* Icon */}
					{item.icon && <Icon>{item.icon}</Icon>}
				</Stack>

				{/* Title */}
				{title && item.title && (
					<Typography variant="subtitle2" color="textSecondary">
						{`${t(title)} ${t(item.title)}`}
					</Typography>
				)}

				{/* Value */}
				<Typography variant="h4" className={classes.sCardContentValue}>
					{t(`${item.value}`) || AppConfigService.AppOptions.common.none}
				</Typography>

				{/* Date */}
				{item.date && (
					<Typography variant="body2" color="textSecondary">
						{item.date}
					</Typography>
				)}
			</CardContent>
		</Card>
	);
};
export default RobotDetailStateCard;

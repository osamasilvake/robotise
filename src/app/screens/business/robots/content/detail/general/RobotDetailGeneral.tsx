import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../components/common/status/Status';
import Tooltip from '../../../../../../components/common/tooltip/Tooltip';
import { AppConfigService } from '../../../../../../services';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { strRemoveSymbols } from '../../../../../../utilities/methods/StringUtilities';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { RobotDetailControlModeTypeEnum } from '../commands/RobotDetailCommands.enum';
import { RobotDetailGeneralInterface } from './RobotDetailGeneral.interface';
import { RobotDetailGeneralStyle } from './RobotDetailGeneral.style';

const RobotDetailGeneral: FC<RobotDetailGeneralInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation(['ROBOTS', 'TOOLTIPS']);
	const classes = RobotDetailGeneralStyle();
	const cardClasses = CardStyle();

	const common = 'CONTENT.DETAIL.GENERAL';

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${common}.SITE`)}
				</Typography>
				<Typography variant="body1">{robotTwins.site.title}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${common}.LAST_UPDATED`)}
				</Typography>
				<Typography variant="body1">{momentFormat1(robotTwins.updatedAt)}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGeneralItemBlock}>
					{t(`${common}.STATUS.LABEL`)}
				</Typography>
				<Status active={robotTwins.robotState.isReady.value}>
					{robotTwins.robotState.isReady.value
						? t(`${common}.STATUS.ON`)
						: t(`${common}.STATUS.OFF`)}
				</Status>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGeneralItemBlock}>
					{t(`${common}.CONTROL_MODE`)}
				</Typography>
				<Status
					active={
						robotTwins.controlMode.value === RobotDetailControlModeTypeEnum.AUTONOMOUS
					}>
					{strRemoveSymbols(robotTwins.controlMode.value)}
				</Status>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2} className={classes.sGeneralLastRowItem}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGeneralItemBlock}>
					{t(`${common}.ACCEPT_ORDERS.LABEL`)}
				</Typography>
				<Status active={!!robotTwins.site.acceptOrders}>
					{robotTwins.site.acceptOrders
						? t(`${common}.ACCEPT_ORDERS.ACTIVE`)
						: t(`${common}.ACCEPT_ORDERS.INACTIVE`)}
				</Status>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${common}.CUSTOMER_NAME`)}
				</Typography>
				<Typography variant="body1">
					{robotTwins.robot.customerName || AppConfigService.AppOptions.common.none}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${common}.MISSION`)}
				</Typography>
				<Typography variant="body1" className={classes.sGeneralItemFlex}>
					{robotTwins.mission.status || AppConfigService.AppOptions.common.none}
					{robotTwins.mission.description && (
						<Tooltip
							title={
								<Card square elevation={1}>
									<CardContent className={cardClasses.sCardContent2}>
										<Typography variant="body2" color="inherit">
											{robotTwins.mission.description}
										</Typography>
									</CardContent>
								</Card>
							}>
							<InfoOutlined
								fontSize="small"
								className={classes.sGeneralItemInfoIcon}
							/>
						</Tooltip>
					)}
				</Typography>
			</Grid>
		</Grid>
	);
};
export default RobotDetailGeneral;

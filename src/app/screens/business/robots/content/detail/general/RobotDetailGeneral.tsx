import { Card, CardContent, Grid, IconButton, Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { Edit } from '@material-ui/icons';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Status from '../../../../../../components/common/status/Status';
import Tooltip from '../../../../../../components/common/tooltip/Tooltip';
import { AppConfigService } from '../../../../../../services';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { strRemoveSymbols, strToLinks } from '../../../../../../utilities/methods/String';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { RobotDetailControlModeTypeEnum } from '../commands/RobotDetailCommands.enum';
import DialogNote from './DialogNote';
import { RobotDetailGeneralInterface } from './RobotDetailGeneral.interface';
import { RobotDetailGeneralStyle } from './RobotDetailGeneral.style';

const RobotDetailGeneral: FC<RobotDetailGeneralInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation(['ROBOTS', 'TOOLTIPS']);
	const classes = RobotDetailGeneralStyle();
	const cardClasses = CardStyle();

	const [open, setOpen] = useState(false);

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
					className={classes.sGridItemBlock}>
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
					className={classes.sGridItemBlock}>
					{t(`${common}.CONTROL_MODE`)}
				</Typography>
				<Status
					active={
						robotTwins.controlMode.value === RobotDetailControlModeTypeEnum.AUTONOMOUS
					}>
					{strRemoveSymbols(robotTwins.controlMode.value)}
				</Status>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2} className={classes.sGridLastRowItem}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGridItemBlock}>
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
				<Typography variant="body1" className={classes.sGridItemFlex}>
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
							<InfoOutlined fontSize="small" className={classes.sGridItemInfoIcon} />
						</Tooltip>
					)}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={8} lg={6} className={classes.sNoteGrid}>
				<Typography variant="caption" color="textSecondary">
					{t(`${common}.NOTE.TITLE`)}
					<IconButton
						className={classes.sNoteEditIconButton}
						onClick={() => setOpen(true)}>
						<Edit color="primary" className={classes.sNoteEditIcon} />
					</IconButton>
				</Typography>
				<Typography
					variant="body1"
					dangerouslySetInnerHTML={{
						__html:
							(robotTwins.robot.note && strToLinks(robotTwins.robot.note)) ||
							AppConfigService.AppOptions.common.none
					}}
					className={classes.sNote}
				/>
				{open && <DialogNote open={open} setOpen={setOpen} note={robotTwins.robot.note} />}
			</Grid>
		</Grid>
	);
};
export default RobotDetailGeneral;

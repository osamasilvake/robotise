import { Edit, InfoOutlined } from '@mui/icons-material';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ReadMore from '../../../../../../components/common/read-more/ReadMore';
import Status from '../../../../../../components/common/status/Status';
import { AppConfigService } from '../../../../../../services';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { strRemoveSymbols } from '../../../../../../utilities/methods/String';
import { RobotDetailControlModeTypeEnum } from '../commands/RobotDetailCommands.enum';
import DialogNote from './DialogNote';
import { RobotDetailGeneralInterface } from './RobotDetailGeneral.interface';
import { RobotDetailGeneralStyle } from './RobotDetailGeneral.style';

const RobotDetailGeneral: FC<RobotDetailGeneralInterface> = (props) => {
	const { robotTwins } = props;
	const { t } = useTranslation(['ROBOTS', 'TOOLTIPS']);
	const classes = RobotDetailGeneralStyle();

	const [open, setOpen] = useState(false);

	const translation = 'CONTENT.DETAIL.GENERAL';

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.SITE`)}
				</Typography>
				<Typography>{robotTwins.site.title}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.LAST_UPDATED`)}
				</Typography>
				<Typography>{momentFormat1(robotTwins.updatedAt)}</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGridItemBlock}>
					{t(`${translation}.STATUS.LABEL`)}
				</Typography>
				<Status active={robotTwins.robotState.isReady.value}>
					{robotTwins.robotState.isReady.value
						? t(`${translation}.STATUS.ON`)
						: t(`${translation}.STATUS.OFF`)}
				</Status>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={2}>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.sGridItemBlock}>
					{t(`${translation}.CONTROL_MODE`)}
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
					{t(`${translation}.ACCEPT_ORDERS.LABEL`)}
				</Typography>
				<Status active={!!robotTwins.site.acceptOrders}>
					{robotTwins.site.acceptOrders
						? t(`${translation}.ACCEPT_ORDERS.ACTIVE`)
						: t(`${translation}.ACCEPT_ORDERS.INACTIVE`)}
				</Status>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.CUSTOMER_NAME`)}
				</Typography>
				<Typography>
					{robotTwins.robot.customerName || AppConfigService.AppOptions.common.none}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4} lg={3}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.MISSION`)}
				</Typography>
				<Typography className={classes.sGridItemFlex}>
					{robotTwins.mission.status || AppConfigService.AppOptions.common.none}
					{robotTwins.mission.description && (
						<Tooltip title={robotTwins.mission.description}>
							<InfoOutlined fontSize="small" className={classes.sGridItemInfoIcon} />
						</Tooltip>
					)}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={8} lg={6} className={classes.sNoteGrid}>
				<Typography variant="caption" color="textSecondary">
					{t(`${translation}.NOTE.TITLE`)}
					<Tooltip
						placement="right"
						title={String(t('TOOLTIPS:EDIT'))}
						onClick={() => setOpen(true)}>
						<IconButton
							className={classes.sNoteEditIconButton}
							onClick={() => setOpen(true)}>
							<Edit color="primary" className={classes.sNoteEditIcon} />
						</IconButton>
					</Tooltip>
				</Typography>
				<ReadMore text={robotTwins.robot.note} />
				{open && <DialogNote open={open} setOpen={setOpen} note={robotTwins.robot.note} />}
			</Grid>
		</Grid>
	);
};
export default RobotDetailGeneral;

import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogSyncConfirmation from './DialogSyncConfirmation';
import { RobotConfigurationSyncConfigsTypeEnum } from './RobotConfigurationSyncConfigs.enum';
import { RobotConfigurationSyncConfigsStyle } from './RobotConfigurationSyncConfigs.style';

const RobotConfigurationSyncConfigs: FC = () => {
	const { t } = useTranslation('ROBOTS');
	const classes = RobotConfigurationSyncConfigsStyle();

	const [open, setOpen] = useState({
		status: false,
		type: RobotConfigurationSyncConfigsTypeEnum.SYNC_ROBOT
	});

	const translation = 'CONTENT.CONFIGURATION.SYNC_CONFIGS';

	/**
	 * handle confirm before sync
	 * @param type
	 */
	const handleConfirm = (type: RobotConfigurationSyncConfigsTypeEnum) => {
		setOpen({ status: true, type });
	};

	return (
		<Box>
			<Card square elevation={1}>
				<CardContent>
					<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
					<Typography variant="body2" color="textSecondary">
						{t(`${translation}.EXCERPT`)}
					</Typography>

					<Button
						variant="outlined"
						className={classes.sButton}
						onClick={() =>
							handleConfirm(RobotConfigurationSyncConfigsTypeEnum.SYNC_ROBOT)
						}>
						{t(`${translation}.BUTTONS.SYNC_ROBOT`)}
					</Button>
					<Button
						variant="outlined"
						className={clsx(classes.sButton, classes.sButtonGap)}
						onClick={() =>
							handleConfirm(RobotConfigurationSyncConfigsTypeEnum.SYNC_SITE)
						}>
						{t(`${translation}.BUTTONS.SYNC_SITE`)}
					</Button>
				</CardContent>
			</Card>

			{/* Dialog: Confirmation */}
			{open.status && <DialogSyncConfirmation open={open} setOpen={setOpen} />}
		</Box>
	);
};
export default RobotConfigurationSyncConfigs;

import { Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../../slices';
import { CloudConfigurationProductsSync } from '../../../../../../../slices/business/robots/configuration/cloud/CloudConfiguration.slice';
import { dateFormat1 } from '../../../../../../../utilities/methods/Date';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { RobotConfigurationSyncProductsInterface } from './RobotConfigurationSyncProducts.interface';
import { RobotConfigurationSyncProductsStyle } from './RobotConfigurationSyncProducts.style';

const RobotConfigurationSyncProducts: FC<RobotConfigurationSyncProductsInterface> = (props) => {
	const { robotTwinsSummary, cloudConfiguration } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotConfigurationSyncProductsStyle();

	const dispatch = useDispatch<AppDispatch>();

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const cRobotId = params.robotId;

	const robotTwinSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const robotIsReady = robotTwinSingle?.robotIsReady;
	const lastSynced = robotTwinSingle?.robotLastSyncedProducts;

	const translation = 'CONTENT.CONFIGURATION.SYNC_PRODUCTS';

	/**
	 * handle sync products
	 */
	const handleSyncProducts = () => {
		// dispatch: sync products on the robot
		cRobotId && dispatch(CloudConfigurationProductsSync(cRobotId));
	};

	return (
		<Card square elevation={1}>
			<CardContent>
				<Typography variant="h6">{t(`${translation}.TITLE`)}</Typography>
				<Typography variant="body2" color="textSecondary">
					{t(`${translation}.EXCERPT`)}
				</Typography>

				<Button
					variant="outlined"
					className={classes.sButton}
					onClick={handleSyncProducts}
					disabled={!robotIsReady || cloudConfiguration.syncProducts.loading}
					endIcon={
						cloudConfiguration.syncProducts.loading && <CircularProgress size={20} />
					}>
					{t(`${translation}.SYNC`)}
				</Button>

				{lastSynced && (
					<Typography variant="body2" color="textSecondary" className={classes.sUpdated}>
						{dateFormat1(lastSynced)}
					</Typography>
				)}

				<Typography variant="body2" color="textSecondary" className={classes.sNote}>
					{t(`${translation}.NOTE`)}
				</Typography>
			</CardContent>
		</Card>
	);
};
export default RobotConfigurationSyncProducts;

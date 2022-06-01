import { Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../slices';
import { RobotProductsSync } from '../../../../../../slices/business/robots/RobotOperations.slice';
import { dateFormat1 } from '../../../../../../utilities/methods/Date';
import { RobotParamsInterface } from '../../../Robot.interface';
import { SyncProductsInterface } from './SyncProducts.interface';
import { SyncProductsStyle } from './SyncProducts.style';

const SyncProducts: FC<SyncProductsInterface> = (props) => {
	const { robotTwinsSummary, robotOperations } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = SyncProductsStyle();

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
		cRobotId && dispatch(RobotProductsSync(cRobotId));
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
					disabled={!robotIsReady || robotOperations.syncProducts.loading}
					endIcon={
						robotOperations.syncProducts.loading && <CircularProgress size={20} />
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
export default SyncProducts;

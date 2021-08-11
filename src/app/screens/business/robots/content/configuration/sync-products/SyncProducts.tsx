import { Button, Card, CardContent, CircularProgress, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RobotProductsSync } from '../../../../../../slices/business/robots/Robot.slice';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { RobotParamsInterface } from '../../../Robot.interface';
import { SyncProductsInterface } from './SyncProducts.interface';
import { SyncProductsStyle } from './SyncProducts.style';

const SyncProducts: FC<SyncProductsInterface> = (props) => {
	const { robotTwinsSummary, robot } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = SyncProductsStyle();
	const cardClasses = CardStyle();

	const dispatch = useDispatch();

	const params: RobotParamsInterface = useParams();
	const cRobotId = params.robotId;

	const robotTwinSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const robotIsReady = robotTwinSingle?.robotIsReady;
	const lastSynced = robotTwinSingle?.lastSyncedProducts;

	const common = 'CONTENT.CONFIGURATION.SYNC_PRODUCTS';

	/**
	 * handle sync products
	 */
	const handleSyncProducts = () => {
		// dispatch: sync products on the robot
		cRobotId && dispatch(RobotProductsSync(cRobotId));
	};

	return (
		<Card square elevation={1}>
			<CardContent className={cardClasses.sCardContent1}>
				<Typography variant="h6">{t(`${common}.TITLE`)}</Typography>
				<Typography variant="body2" color="textSecondary">
					{t(`${common}.EXCERPT`)}
				</Typography>

				<Button
					variant="outlined"
					className={classes.sButton}
					onClick={handleSyncProducts}
					disabled={!robotIsReady || robot.syncProducts.loading}
					endIcon={robot.syncProducts.loading && <CircularProgress size={20} />}>
					{t(`${common}.SYNC`)}
				</Button>

				{lastSynced && (
					<Typography variant="body2" color="textSecondary" className={classes.sUpdated}>
						{momentFormat1(lastSynced)}
					</Typography>
				)}
			</CardContent>
		</Card>
	);
};
export default SyncProducts;

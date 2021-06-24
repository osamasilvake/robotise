import { Button, Card, CardContent, CircularProgress, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RobotSyncProducts } from '../../../../../../slices/robots/Robot.slice';
import { momentFormat1 } from '../../../../../../utilities/methods/Moment';
import { CardStyle } from '../../../../../../utilities/styles/Card.style';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotConfigurationSyncProductsInterface } from './RobotConfigurationSyncProducts.interface';
import { RobotConfigurationSyncProductsStyle } from './RobotConfigurationSyncProducts.style';

const RobotConfigurationSyncProducts: FC<RobotConfigurationSyncProductsInterface> = (props) => {
	const { robotTwinsSummary, robot } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotConfigurationSyncProductsStyle();
	const cardClasses = CardStyle();

	const dispatch = useDispatch();

	const params: RobotParamsInterface = useParams();
	const robotId = params.robot;
	const robotIsReady = robotTwinsSummary.content?.dataById[params.robot]?.robotIsReady;
	const lastSynced = robotTwinsSummary.content?.dataById[params.robot]?.lastSyncedProducts;

	/**
	 * handle sync products
	 */
	const handleSyncProducts = () => {
		// dispatch: sync products with robot GUI
		robotId && dispatch(RobotSyncProducts(robotId));
	};

	return (
		<Card square elevation={1}>
			<CardContent className={cardClasses.sCardContent1}>
				<Typography variant="h6">
					{t('CONTENT.CONFIGURATION.SYNC_PRODUCTS.TITLE')}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{t('CONTENT.CONFIGURATION.SYNC_PRODUCTS.EXCERPT')}
				</Typography>

				<Button
					variant="outlined"
					className={classes.sButton}
					onClick={handleSyncProducts}
					disabled={!robotIsReady || robot.syncProducts.loading || true}
					endIcon={robot.syncProducts.loading && <CircularProgress size={20} />}>
					{t('CONTENT.CONFIGURATION.SYNC_PRODUCTS.SYNC')}
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
export default RobotConfigurationSyncProducts;

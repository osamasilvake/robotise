import { Assessment } from '@mui/icons-material';
import { Box, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Report from '../../../../../../../components/common/report/Report';
import {
	generalOperationsSelector,
	GeneralReportsGenerate
} from '../../../../../../../slices/business/general/GeneralOperations.slice';
import { robotTwinsSummarySelector } from '../../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { RobotParamsInterface } from '../../../../Robot.interface';
import { RobotPurchasesActionsSpeedDialTypeEnum } from './RobotPurchasesActions.enum';
import { RobotPurchasesActionsInterface } from './RobotPurchasesActions.interface';
import { purchaseActions } from './RobotPurchasesActions.map';
import { RobotPurchasesActionsStyle } from './RobotPurchasesActions.style';
import RobotPurchasesBilled from './RobotPurchasesBilled';
import RobotPurchasesDebug from './RobotPurchasesDebug';

const RobotPurchasesActions: FC<RobotPurchasesActionsInterface> = (props) => {
	const { billed, debug } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesActionsStyle();

	const generalOperations = useSelector(generalOperationsSelector);
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);

	const [purchasesReport, setPurchasesReport] = useState(false);
	const [productsReport, setProductsReport] = useState(false);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const cRobotId = params.robotId;
	const cSiteId = robotTwinsSummary.content?.dataById[cRobotId]?.siteId;

	/**
	 * handle speed dial actions
	 * @param operation
	 * @returns
	 */
	const handleActions = (operation: RobotPurchasesActionsSpeedDialTypeEnum) => () => {
		if (operation === RobotPurchasesActionsSpeedDialTypeEnum.PURCHASES_REPORT) {
			setPurchasesReport(true);
		} else if (operation === RobotPurchasesActionsSpeedDialTypeEnum.PRODUCTS_REPORT) {
			setProductsReport(true);
		}
	};

	return (
		<>
			{/* Filters */}
			<Paper elevation={0} square className={classes.sActions}>
				<Stack
					spacing={0.5}
					direction="row"
					alignItems="center"
					justifyContent="space-between">
					<Box>
						{/* Un-billed */}
						<RobotPurchasesBilled billed={billed} />

						{/* Debug */}
						<RobotPurchasesDebug debug={debug} />
					</Box>
				</Stack>
			</Paper>

			{/* Speed Dial */}
			<SpeedDial
				ariaLabel="speed-dial-purchases"
				className={classes.sSpeedDial}
				icon={<SpeedDialIcon icon={<Assessment />} className={classes.sSpeedDialIcon} />}>
				{purchaseActions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={t(action.name)}
						onClick={handleActions(action.operation)}
					/>
				))}
			</SpeedDial>

			{/* Dialog: Purchase Report */}
			<Report
				id="order-report-export"
				open={purchasesReport}
				setOpen={setPurchasesReport}
				filterId={cRobotId}
				filterIdType="robot"
				state={generalOperations.reports}
				GenerateReports={GeneralReportsGenerate}
			/>

			{/* Dialog: Purchase Products Report */}
			{cSiteId && (
				<Report
					id="product-export"
					open={productsReport}
					setOpen={setProductsReport}
					filterId={cSiteId}
					filterIdType="site"
					state={generalOperations.reports}
					GenerateReports={GeneralReportsGenerate}
				/>
			)}
		</>
	);
};
export default RobotPurchasesActions;

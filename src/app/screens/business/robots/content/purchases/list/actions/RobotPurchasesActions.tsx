import { Assessment } from '@mui/icons-material';
import { Box, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon, Stack } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Report from '../../../../../../../components/common/report/Report';
import {
	robotOperationsSelector,
	RobotReportsGenerate
} from '../../../../../../../slices/business/robots/RobotOperations.slice';
import {
	siteOperationsSelector,
	SiteReportsGenerate
} from '../../../../../../../slices/business/sites/SiteOperations.slice';
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

	const siteOperations = useSelector(siteOperationsSelector);
	const robotOperations = useSelector(robotOperationsSelector);

	const [purchasesReport, setPurchasesReport] = useState(false);
	const [productsReport, setProductsReport] = useState(false);

	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;
	const cRobotId = params.robotId;

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
				state={robotOperations.reports}
				GenerateReports={RobotReportsGenerate}
			/>

			{/* Dialog: Purchase Products Report */}
			<Report
				id="product-export"
				open={productsReport}
				setOpen={setProductsReport}
				filterId={cRobotId}
				state={siteOperations.reports}
				GenerateReports={SiteReportsGenerate}
			/>
		</>
	);
};
export default RobotPurchasesActions;

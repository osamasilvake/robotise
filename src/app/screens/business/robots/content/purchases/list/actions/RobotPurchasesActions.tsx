import { SettingsOutlined } from '@mui/icons-material';
import { Box, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Report from '../../../../../../../components/common/report/Report';
import {
	robotOperationsSelector,
	RobotReportsGenerate
} from '../../../../../../../slices/business/robots/RobotOperations.slice';
import { FloatStyle } from '../../../../../../../utilities/styles/Float.style';
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
	const floatStyle = FloatStyle();
	const classes = RobotPurchasesActionsStyle();

	const robotOperations = useSelector(robotOperationsSelector);

	const [purchasesReport, setPurchasesReport] = useState(false);

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
		}
	};

	return (
		<>
			{/* Filters */}
			<Paper elevation={2} square className={floatStyle.sFloat1}>
				<Box>
					{/* Billed */}
					<RobotPurchasesBilled billed={billed} />

					{/* Debug */}
					<RobotPurchasesDebug debug={debug} />
				</Box>
			</Paper>

			{/* Speed Dial */}
			<SpeedDial
				ariaLabel="speed-dial-purchases"
				className={classes.sSpeedDial}
				icon={
					<SpeedDialIcon icon={<SettingsOutlined />} className={classes.sSpeedDialIcon} />
				}>
				{purchaseActions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={t(action.name)}
						onClick={handleActions(action.operation)}
					/>
				))}
			</SpeedDial>

			{/* Dialog: Report */}
			<Report
				id="purchases"
				open={purchasesReport}
				setOpen={setPurchasesReport}
				filterId={cRobotId}
				state={robotOperations.reports}
				GenerateReports={RobotReportsGenerate}
			/>
		</>
	);
};
export default RobotPurchasesActions;

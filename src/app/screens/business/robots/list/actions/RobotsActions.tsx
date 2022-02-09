import { SettingsOutlined } from '@mui/icons-material';
import { Paper, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FloatStyle } from '../../../../../utilities/styles/Float.style';
import DialogCreateRobot from './DialogCreateRobot';
import { RobotsActionsSpeedDialTypeEnum } from './RobotsActions.enum';
import { robotsActions } from './RobotsActions.map';
import { RobotsActionsStyle } from './RobotsActions.style';
import RobotsHidden from './RobotsHidden';
import RobotsSimulation from './RobotsSimulation';

const RobotsActions: FC = () => {
	const { t } = useTranslation('ROBOTS');
	const floatStyle = FloatStyle();
	const classes = RobotsActionsStyle();

	const [createRobot, setCreateRobot] = useState(false);

	/**
	 * handle speed dial actions
	 * @param operation
	 * @returns
	 */
	const handleActions = (operation: RobotsActionsSpeedDialTypeEnum) => () => {
		if (operation === RobotsActionsSpeedDialTypeEnum.CREATE_ROBOT) {
			setCreateRobot(true);
		}
	};

	return (
		<>
			{/* Filters */}
			<Paper elevation={2} square className={floatStyle.sFloat1}>
				{/* Hidden */}
				<RobotsHidden />

				{/* Simulation */}
				<RobotsSimulation />
			</Paper>

			{/* Speed Dial */}
			<SpeedDial
				ariaLabel="speed-dial-robots"
				className={classes.sSpeedDial}
				icon={
					<SpeedDialIcon icon={<SettingsOutlined />} className={classes.sSpeedDialIcon} />
				}>
				{robotsActions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={t(action.name)}
						onClick={handleActions(action.operation)}
					/>
				))}
			</SpeedDial>

			{/* Dialog: Create Robot */}
			{createRobot && <DialogCreateRobot open={createRobot} setOpen={setCreateRobot} />}
		</>
	);
};
export default RobotsActions;

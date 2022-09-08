import { Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { GeneralAllOrdersActionsInterface } from './GeneralAllOrdersActions.interface';
import { GeneralAllOrdersActionsStyle } from './GeneralAllOrdersActions.style';
import GeneralAllOrdersIncludeAllOrders from './GeneralAllOrdersIncludeAllOrders';
import GeneralAllOrdersPeriod from './GeneralAllOrdersPeriod';
import GeneralAllOrdersSite from './GeneralAllOrdersSite';

const GeneralAllOrdersActions: FC<GeneralAllOrdersActionsInterface> = (props) => {
	const { siteId, currentPeriod, setCurrentPeriod, includeAllOrders } = props;
	const classes = GeneralAllOrdersActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Stack
					spacing={0.5}
					direction="row"
					alignItems="center"
					justifyContent="space-between">
					{/* Site */}
					<GeneralAllOrdersSite siteId={siteId} />

					{/* Period */}
					<GeneralAllOrdersPeriod
						currentPeriod={currentPeriod}
						setCurrentPeriod={setCurrentPeriod}
					/>
				</Stack>

				{/* Include All Orders */}
				<GeneralAllOrdersIncludeAllOrders includeAllOrders={includeAllOrders} />
			</Stack>
		</Paper>
	);
};
export default GeneralAllOrdersActions;

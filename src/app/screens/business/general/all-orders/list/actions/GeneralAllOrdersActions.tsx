import { Box, Paper, Stack } from '@mui/material';
import { FC } from 'react';

import { GeneralAllOrdersActionsInterface } from './GeneralAllOrdersActions.interface';
import { GeneralAllOrdersActionsStyle } from './GeneralAllOrdersActions.style';
import GeneralAllOrdersIncludeAllOrders from './GeneralAllOrdersIncludeAllOrders';
import GeneralAllOrdersSite from './GeneralAllOrdersSite';

const GeneralAllOrdersActions: FC<GeneralAllOrdersActionsInterface> = (props) => {
	const { siteId, includeAllOrders } = props;
	const classes = GeneralAllOrdersActionsStyle();

	return (
		<Paper elevation={0} square className={classes.sActions}>
			<Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between">
				<Box>
					{/* Site */}
					<GeneralAllOrdersSite siteId={siteId} />
				</Box>

				{/* Include All Orders */}
				<GeneralAllOrdersIncludeAllOrders includeAllOrders={includeAllOrders} />
			</Stack>
		</Paper>
	);
};
export default GeneralAllOrdersActions;

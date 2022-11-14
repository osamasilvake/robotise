import { Checkbox, FormControlLabel } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../../slices';
import {
	allOrdersSelector,
	AllOrderUpdateState
} from '../../../../../../slices/business/general/all-orders/AllOrders.slice';
import { SAOStateInterface } from '../../../../../../slices/business/general/all-orders/AllOrders.slice.interface';
import { GeneralAllOrdersIncludeAllOrdersInterface } from './GeneralAllOrdersActions.interface';

const GeneralAllOrdersIncludeAllOrders: FC<GeneralAllOrdersIncludeAllOrdersInterface> = (props) => {
	const { includeAllOrders } = props;
	const { t } = useTranslation('GENERAL');

	const dispatch = useDispatch<AppDispatch>();
	const allOrders = useSelector(allOrdersSelector);

	/**
	 * handle include all orders
	 */
	const handleIncludeAllOrders = () => {
		// dispatch: update state
		const state: SAOStateInterface = {
			...allOrders.content?.state,
			page: 0,
			includeAllOrders: !includeAllOrders
		};
		dispatch(AllOrderUpdateState(state));
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					color="primary"
					name="includeAllOrders"
					checked={includeAllOrders}
					onChange={handleIncludeAllOrders}
				/>
			}
			label={t<string>('COMMON.ORDERS.LIST.ACTIONS.FILTERS.INCLUDE_ALL_ORDERS')}
		/>
	);
};
export default GeneralAllOrdersIncludeAllOrders;

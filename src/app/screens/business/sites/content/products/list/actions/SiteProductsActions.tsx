import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/core';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogCreateEditProduct from '../table/DialogCreateEditProduct';
import { SiteProductCreateEditTypeEnum } from '../table/SiteProductsTable.enum';
import DialogProductsReport from './DialogProductsReport';
import { SiteProductsActionsSpeedDialTypeEnum } from './SiteProductsActions.enum';
import { ActionsList } from './SiteProductsActions.map';

const SiteProductsActions: FC = () => {
	const { t } = useTranslation('SITES');

	const [createProduct, setCreateProduct] = useState(false);
	const [productsReport, setProductsReport] = useState(false);

	/**
	 * handle speed dial actions
	 * @param operation
	 * @returns
	 */
	const handleActions = (operation: SiteProductsActionsSpeedDialTypeEnum) => () => {
		if (operation === SiteProductsActionsSpeedDialTypeEnum.CREATE_PRODUCT) {
			setCreateProduct(true);
		} else if (operation === SiteProductsActionsSpeedDialTypeEnum.PRODUCTS_REPORT) {
			setProductsReport(true);
		}
	};

	return (
		<>
			<SpeedDial
				ariaLabel="SpeedDial basic example"
				sx={{ position: 'absolute', bottom: 0, left: 0 }}
				icon={<SpeedDialIcon />}>
				{ActionsList.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={t(action.name)}
						onClick={handleActions(action.operation)}
					/>
				))}
			</SpeedDial>

			{/* Dialog: Create Product */}
			<DialogCreateEditProduct
				type={SiteProductCreateEditTypeEnum.CREATE}
				open={createProduct}
				setOpen={setCreateProduct}
			/>

			{/* Dialog: Products Report */}
			<DialogProductsReport open={productsReport} setOpen={setProductsReport} />
		</>
	);
};
export default SiteProductsActions;

import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/core';
import { SettingsOutlined } from '@material-ui/icons';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogCreateEditProduct from '../table/DialogCreateEditProduct';
import { SiteProductCreateEditTypeEnum } from '../table/SiteProductsTable.enum';
import DialogProductsReport from './DialogProductsReport';
import { SiteProductsActionsSpeedDialTypeEnum } from './SiteProductsActions.enum';
import { ActionsList } from './SiteProductsActions.map';
import { SiteProductsActionsStyle } from './SiteProductsActions.style';

const SiteProductsActions: FC = () => {
	const { t } = useTranslation('SITES');
	const classes = SiteProductsActionsStyle();

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
				ariaLabel="speed-dial-products"
				className={classes.sSpeedDial}
				icon={
					<SpeedDialIcon icon={<SettingsOutlined />} className={classes.sSpeedDialIcon} />
				}>
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

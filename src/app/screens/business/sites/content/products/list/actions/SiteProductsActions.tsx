import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/core';
import { SettingsOutlined } from '@material-ui/icons';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Report from '../../../../../../../components/common/report/Report';
import { ReportTypeEnum } from '../../../../../../../components/common/report/Report.enum';
import {
	SiteGenerateReports,
	siteSelector
} from '../../../../../../../slices/business/sites/Site.slice';
import { SiteParamsInterface } from '../../../../Site.interface';
import DialogCreateEditProduct from '../table/DialogCreateEditProduct';
import { SiteProductCreateEditTypeEnum } from '../table/SiteProductsTable.enum';
import { SiteProductsActionsSpeedDialTypeEnum } from './SiteProductsActions.enum';
import { productActions } from './SiteProductsActions.map';
import { SiteProductsActionsStyle } from './SiteProductsActions.style';

const SiteProductsActions: FC = () => {
	const { t } = useTranslation('SITES');
	const classes = SiteProductsActionsStyle();

	const site = useSelector(siteSelector);

	const [createProduct, setCreateProduct] = useState(false);
	const [productsReport, setProductsReport] = useState(false);

	const params: SiteParamsInterface = useParams();

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
				{productActions.map((action) => (
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

			{/* Dialog: Report */}
			<Report
				id={ReportTypeEnum.PRODUCTS}
				open={productsReport}
				setOpen={setProductsReport}
				filterId={params.siteId}
				state={site.reports}
				GenerateReports={SiteGenerateReports}
			/>
		</>
	);
};
export default SiteProductsActions;

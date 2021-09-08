import { Avatar, Box, Chip, TableCell } from '@material-ui/core';
import i18next from 'i18next';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import { SPCDataInterface } from '../../../../../../../slices/business/sites/products/Products.slice.interface';
import { sitesSelector } from '../../../../../../../slices/business/sites/Sites.slice';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import { SiteParamsInterface } from '../../../../Site.interface';
import DialogCreateEditProduct from './DialogCreateEditProduct';
import DialogDeleteProduct from './DialogDeleteProduct';
import {
	SiteProductCreateEditTypeEnum,
	SiteProductsTableColumnsTypeEnum
} from './SiteProductsTable.enum';
import {
	SiteProductsTableBodyCellInterface,
	SiteProductsTableColumnInterface
} from './SiteProductsTable.interface';
import { columns } from './SiteProductsTable.list';
import { SiteProductsTableStyle } from './SiteProductsTable.style';

const SiteProductsTableBodyCell: FC<SiteProductsTableBodyCellInterface> = (props) => {
	const { column, product } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteProductsTableStyle();

	const sites = useSelector(sitesSelector);

	const [openCreateEdit, setOpenCreateEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const params: SiteParamsInterface = useParams();
	const cSiteId = params.siteId;
	const currency = sites.content?.dataById[cSiteId]?.currency;

	/**
	 * open create/edit product dialog
	 * @param event
	 */
	const openCreateEditProductDialog = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();

		// set create/edit open
		setOpenCreateEdit(true);
	};

	/**
	 * open delete product dialog
	 * @param event
	 */
	const openDeleteProductDialog = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();

		// set delete open
		setOpenDelete(true);
	};

	/**
	 * set cell value
	 * @param product
	 * @param column
	 * @returns
	 */
	const setCellValue = (product: SPCDataInterface, column: SiteProductsTableColumnInterface) => {
		if (column.id === SiteProductsTableColumnsTypeEnum.ACTIONS) {
			const translation = 'CONTENT.PRODUCTS.LIST.TABLE.VALUES';
			return (
				<Box>
					<Chip
						size="small"
						label={t(`${translation}.EDIT`)}
						color="primary"
						variant="outlined"
						clickable
						onClick={openCreateEditProductDialog}
						className={classes.sEditProduct}
					/>
					<DialogCreateEditProduct
						product={product}
						type={SiteProductCreateEditTypeEnum.EDIT}
						open={openCreateEdit}
						setOpen={setOpenCreateEdit}
					/>

					<Chip
						style={{
							borderColor: AppConfigService.AppOptions.colors.c12,
							color: AppConfigService.AppOptions.colors.c12
						}}
						size="small"
						label={t(`${translation}.DELETE`)}
						variant="outlined"
						clickable
						onClick={openDeleteProductDialog}
					/>
					<DialogDeleteProduct
						product={product}
						open={openDelete}
						setOpen={setOpenDelete}
					/>
				</Box>
			);
		} else {
			const value = product[column.id];
			if (columns[6].id === column.id) {
				return momentFormat1(value);
			} else if (typeof value === 'number') {
				if (columns[2].id === column.id) {
					const defaultCurrency = AppConfigService.AppOptions.common.defaultCurrency;
					return `${currencyFormat(
						value,
						currency || defaultCurrency,
						i18next.language
					)}`;
				}
				return value;
			} else if (typeof value === 'string') {
				if (columns[0].id === column.id) {
					return <Avatar variant="square" src={value} alt={product.name} />;
				}
				return t(value) || AppConfigService.AppOptions.common.none;
			}
			return value || AppConfigService.AppOptions.common.none;
		}
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(product, column)}
		</TableCell>
	);
};
export default SiteProductsTableBodyCell;

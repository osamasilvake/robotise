import { DeleteOutline, Edit } from '@mui/icons-material';
import { Avatar, Box, IconButton, TableCell } from '@mui/material';
import clsx from 'clsx';
import i18next from 'i18next';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import { SPCDataInterface } from '../../../../../../../slices/business/sites/products/Products.slice.interface';
import { sitesSelector } from '../../../../../../../slices/business/sites/Sites.slice';
import { dateFormat1 } from '../../../../../../../utilities/methods/Date';
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
import { SiteProductsTableStyle } from './SiteProductsTable.style';

const SiteProductsTableBodyCell: FC<SiteProductsTableBodyCellInterface> = (props) => {
	const { column, product } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteProductsTableStyle();

	const sites = useSelector(sitesSelector);

	const [openCreateEdit, setOpenCreateEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;
	const cSiteId = params.siteId;
	const currency = sites.content?.dataById[cSiteId]?.currency;

	/**
	 * open create/edit product dialog
	 * @param event
	 */
	const openCreateEditProductDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// set create/edit open
		setOpenCreateEdit(true);
	};

	/**
	 * open delete product dialog
	 * @param event
	 */
	const openDeleteProductDialog = (event: MouseEvent<HTMLButtonElement>) => {
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
			return (
				<Box>
					<IconButton color="primary" onClick={openCreateEditProductDialog}>
						<Edit fontSize="small" />
					</IconButton>
					{openCreateEdit && (
						<DialogCreateEditProduct
							product={product}
							type={SiteProductCreateEditTypeEnum.EDIT}
							open={openCreateEdit}
							setOpen={setOpenCreateEdit}
						/>
					)}

					<IconButton color="error" onClick={openDeleteProductDialog}>
						<DeleteOutline fontSize="small" />
					</IconButton>
					{openDelete && (
						<DialogDeleteProduct
							product={product}
							open={openDelete}
							setOpen={setOpenDelete}
						/>
					)}
				</Box>
			);
		} else {
			const value = product[column.id];
			if (SiteProductsTableColumnsTypeEnum.UPDATED === column.id) {
				return dateFormat1(String(value));
			} else if (typeof value === 'number') {
				if (SiteProductsTableColumnsTypeEnum.PRICE === column.id) {
					return `${currencyFormat(value, currency, i18next.language)}`;
				}
				return value;
			} else if (typeof value === 'string') {
				if (SiteProductsTableColumnsTypeEnum.IMAGE === column.id) {
					return (
						<Avatar
							variant="square"
							src={value}
							alt={product.name}
							className={clsx({
								[classes.sAvatarBackground]: product.price === 1
							})}
						/>
					);
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

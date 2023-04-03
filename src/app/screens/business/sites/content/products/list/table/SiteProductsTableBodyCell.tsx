import { DeleteOutline, Description, Edit } from '@mui/icons-material';
import { Avatar, Box, IconButton, TableCell, Tooltip } from '@mui/material';
import i18next from 'i18next';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import { AppDispatch } from '../../../../../../../slices';
import { GeneralCopyToClipboard } from '../../../../../../../slices/business/general/GeneralOperations.slice';
import { SPCDataInterface } from '../../../../../../../slices/business/sites/products/Products.slice.interface';
import { sitesSelector } from '../../../../../../../slices/business/sites/Sites.slice';
import { dateFormat1 } from '../../../../../../../utilities/methods/Date';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import { strCapitalLetterAndCamelCaseToDash } from '../../../../../../../utilities/methods/String';
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

const SiteProductsTableBodyCell: FC<SiteProductsTableBodyCellInterface> = (props) => {
	const { column, product } = props;
	const { t } = useTranslation('SITES');

	const dispatch = useDispatch<AppDispatch>();
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
		} else if (column.id === SiteProductsTableColumnsTypeEnum.ID) {
			return (
				<Box onClick={(e) => dispatch(GeneralCopyToClipboard(product.id, e))}>
					<Tooltip title={product.id}>
						<Description color="action" fontSize="small" />
					</Tooltip>
				</Box>
			);
		} else {
			const value = product[column.id];
			if (SiteProductsTableColumnsTypeEnum.UPDATED === column.id) {
				return dateFormat1(String(value));
			} else if (typeof value === 'number') {
				if (SiteProductsTableColumnsTypeEnum.PRICE === column.id) {
					return `${currencyFormat(value, i18next.language, currency)}`;
				}
				return value;
			} else if (typeof value === 'string') {
				if (SiteProductsTableColumnsTypeEnum.IMAGE === column.id) {
					return <Avatar variant="square" src={value} alt={product.name} />;
				} else if (SiteProductsTableColumnsTypeEnum.CATEGORY === column.id) {
					return strCapitalLetterAndCamelCaseToDash(value);
				}
				return t(value) || AppConfigService.AppOptions.common.none;
			}
			return value || AppConfigService.AppOptions.common.none;
		}
	};

	return (
		<TableCell key={column.id} align={column.align} style={{ padding: column?.padding }}>
			<>{setCellValue(product, column)}</>
		</TableCell>
	);
};
export default SiteProductsTableBodyCell;

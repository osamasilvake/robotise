import { Avatar, Box, Chip, TableCell } from '@material-ui/core';
import i18next from 'i18next';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppConfigService } from '../../../../../../../services';
import { SPCDataInterface } from '../../../../../../../slices/products/Products.slice.interface';
import { sitesSelector } from '../../../../../../../slices/sites/Sites.slice';
import { momentFormat1 } from '../../../../../../../utilities/methods/Moment';
import { currencyFormat } from '../../../../../../../utilities/methods/Number';
import { SiteParamsInterface } from '../../../../Site.interface';
import DialogCreateEditProduct from './DialogCreateEditProduct';
import {
	SiteProductCreateEditTypeEnum,
	SiteProductsTableColumnsTypeEnum
} from './SiteProductsTable.enum';
import {
	SiteProductsTableBodyCellInterface,
	SiteProductsTableColumnInterface
} from './SiteProductsTable.interface';
import { columns } from './SiteProductsTable.list';
import { SiteProductsTableStyles } from './SiteProductsTable.style';

const SiteProductsTableBodyCell: FC<SiteProductsTableBodyCellInterface> = (props) => {
	const { column, product } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteProductsTableStyles();

	const sites = useSelector(sitesSelector);

	const [open, setOpen] = useState(false);

	const params: SiteParamsInterface = useParams();
	const currency = sites.content?.dataById[params.site]?.currency;
	const unknown = 'N/A';

	/**
	 * open create/edit product dialog
	 * @param product
	 * @returns
	 */
	const openCreateEditProductDialog = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();

		// set open
		setOpen(true);
	};

	/**
	 * set cell value
	 * @param site
	 * @param column
	 * @returns
	 */
	const setCellValue = (order: SPCDataInterface, column: SiteProductsTableColumnInterface) => {
		if (column.id === SiteProductsTableColumnsTypeEnum.ACTIONS) {
			return (
				<Box>
					<Chip
						size="small"
						label={t(`CONTENT.PRODUCTS.LIST.TABLE.VALUES.EDIT`)}
						color="primary"
						variant="outlined"
						clickable
						onClick={openCreateEditProductDialog}
						className={classes.sEditProduct}
					/>
					<DialogCreateEditProduct
						product={product}
						open={open}
						type={SiteProductCreateEditTypeEnum.EDIT}
						setOpen={setOpen}
					/>

					<Chip
						size="small"
						label={t(`CONTENT.PRODUCTS.LIST.TABLE.VALUES.DELETE`)}
						color="secondary"
						variant="outlined"
						clickable
					/>
				</Box>
			);
		} else {
			const value = order[column.id];
			if (typeof value === 'number') {
				if (columns[2].id === column.id) {
					const defaultCurrency = AppConfigService.AppOptions.common.defaultCurrency;
					return `${currencyFormat(
						value,
						currency || defaultCurrency,
						i18next.language
					)}`;
				}
				return value;
			} else if (columns[0].id === column.id) {
				return <Avatar variant="square" src={value} alt={order['name']} />;
			} else if (columns[5].id === column.id) {
				return momentFormat1(value);
			}
			return t(value) || unknown;
		}
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(product, column)}
		</TableCell>
	);
};
export default SiteProductsTableBodyCell;

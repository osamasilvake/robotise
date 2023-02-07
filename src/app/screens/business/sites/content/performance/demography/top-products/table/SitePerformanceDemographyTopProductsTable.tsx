import { HelpOutline } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip
} from '@mui/material';
import clsx from 'clsx';
import i18next from 'i18next';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppConfigService } from '../../../../../../../../services';
import { SPContentTopProductsBucketInterface } from '../../../../../../../../slices/business/sites/performance/Performance.slice.interface';
import { currencyFormat } from '../../../../../../../../utilities/methods/Number';
import { SitePerformanceDemographyTopProductsTableColumnsTypeEnum } from './SitePerformanceDemographyTopProductsTable.enum';
import {
	SitePerformanceDemographyTopProductsTableColumnInterface,
	SitePerformanceDemographyTopProductsTableInterface
} from './SitePerformanceDemographyTopProductsTable.interface';
import { columns } from './SitePerformanceDemographyTopProductsTable.list';
import { SitePerformanceDemographyTopProductsTableStyle } from './SitePerformanceDemographyTopProductsTable.style';

const SitePerformanceDemographyTopProductsTable: FC<
	SitePerformanceDemographyTopProductsTableInterface
> = (props) => {
	const { topProducts, currency } = props;
	const { t } = useTranslation('SITES');
	const classes = SitePerformanceDemographyTopProductsTableStyle();

	const translation = 'CONTENT.PERFORMANCE';
	const none = AppConfigService.AppOptions.common.none;

	/**
	 * set cell value
	 * @param topProduct
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		topProduct: SPContentTopProductsBucketInterface,
		column: SitePerformanceDemographyTopProductsTableColumnInterface
	) => {
		// return
		if (!topProduct) return none;

		const product = topProduct?.productData;
		if (!topProduct) return;

		const type = SitePerformanceDemographyTopProductsTableColumnsTypeEnum;
		const price = topProduct[type.REVENUE];
		const quantity = topProduct[type.QUANTITY];
		const deleted = !!product?.deleted;

		switch (column.id) {
			case SitePerformanceDemographyTopProductsTableColumnsTypeEnum.IMAGE:
				return (
					<Box>
						<Avatar
							variant="square"
							className={clsx(classes.sImage, {
								[classes.sImageBackground]: price === 1
							})}
							classes={{ img: deleted ? classes.sImageGrey : '' }}
							src={
								(product && product[column.id]) ||
								AppConfigService.AppImageURLs.logo.iconOff
							}
							alt={
								(product && product.name) || AppConfigService.AppImageURLs.logo.name
							}
						/>
						{deleted && (
							<Tooltip
								title={t(
									`${translation}.DEMOGRAPHY.TOP_PRODUCTS.TABLE.VALUES.DELETED`
								)}>
								<HelpOutline fontSize="small" className={classes.sLabel} />
							</Tooltip>
						)}
					</Box>
				);
			case SitePerformanceDemographyTopProductsTableColumnsTypeEnum.QUANTITY:
				return quantity;
			case SitePerformanceDemographyTopProductsTableColumnsTypeEnum.REVENUE:
				return product ? `${currencyFormat(price, i18next.language, currency)}` : none;
			default:
				return product ? product[column.id] || none : none;
		}
	};

	return (
		<TableContainer>
			<Table size="small">
				<TableHead>
					<TableRow>
						{columns.map(
							(column: SitePerformanceDemographyTopProductsTableColumnInterface) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{
										minWidth: column.minWidth,
										width: column.width
									}}>
									{t(column.label)}
								</TableCell>
							)
						)}
					</TableRow>
				</TableHead>

				<TableBody>
					{topProducts.map((product) => (
						<TableRow key={product.productId} className={classes.sTableRow}>
							{columns.map(
								(
									column: SitePerformanceDemographyTopProductsTableColumnInterface
								) => (
									<TableCell key={column.id} align={column.align}>
										{setCellValue(product, column)}
									</TableCell>
								)
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
export default SitePerformanceDemographyTopProductsTable;

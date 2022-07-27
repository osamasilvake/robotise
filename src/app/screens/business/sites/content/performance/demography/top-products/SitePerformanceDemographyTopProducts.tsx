import { InfoOutlined } from '@mui/icons-material';
import { Grid, Stack, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SitePerformanceDemographyStyle } from '../SitePerformanceDemography.style';
import { SitePerformanceDemographyTopProductsInterface } from './SitePerformanceDemographyTopProducts.interface';
import SitePerformanceDemographyTopProductsTable from './table/SitePerformanceDemographyTopProductsTable';

const SitePerformanceDemographyTopProducts: FC<SitePerformanceDemographyTopProductsInterface> = (
	props
) => {
	const { topProducts, currency } = props;
	const { t } = useTranslation('SITES');
	const classes = SitePerformanceDemographyStyle();

	const translation = 'CONTENT.PERFORMANCE';

	return (
		<Grid item xs={12} sm={12} md={6}>
			{/* Title */}
			<Stack
				spacing={0.5}
				direction="row"
				alignItems="center"
				className={classes.sTitleLabel}>
				{/* Label */}
				<Typography variant="h5">
					{t(`${translation}.DEMOGRAPHY.TOP_PRODUCTS.LABEL`)}
				</Typography>

				{/* Tooltip */}
				<Tooltip title={t(`${translation}.DEMOGRAPHY.TOP_PRODUCTS.TOOLTIP`)}>
					<InfoOutlined fontSize="small" />
				</Tooltip>
			</Stack>

			{/* Table */}
			<SitePerformanceDemographyTopProductsTable
				topProducts={topProducts}
				currency={currency}
			/>
		</Grid>
	);
};
export default SitePerformanceDemographyTopProducts;

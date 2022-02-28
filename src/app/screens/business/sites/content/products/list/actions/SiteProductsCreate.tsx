import { Add } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogCreateEditProduct from '../table/DialogCreateEditProduct';
import { SiteProductCreateEditTypeEnum } from '../table/SiteProductsTable.enum';

const SiteProductsCreate: FC = () => {
	const { t } = useTranslation('SITES');

	const [createProduct, setCreateProduct] = useState(false);

	const translation = 'CONTENT.PRODUCTS.LIST.ACTIONS.CREATE_EDIT.CREATE';

	return (
		<>
			<Chip
				size="small"
				icon={<Add />}
				label={t(`${translation}.LABEL`)}
				color="primary"
				variant="outlined"
				clickable
				onClick={() => setCreateProduct(true)}
			/>

			{/* Dialog: Create Product */}
			{createProduct && (
				<DialogCreateEditProduct
					type={SiteProductCreateEditTypeEnum.CREATE}
					open={createProduct}
					setOpen={setCreateProduct}
				/>
			)}
		</>
	);
};
export default SiteProductsCreate;

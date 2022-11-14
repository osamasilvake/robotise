import { Add } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogCreateOrder from './DialogCreateOrder';

const RobotOrdersCreate: FC = () => {
	const { t } = useTranslation('GENERAL');

	const [createOrder, setCreateOrder] = useState(false);

	const translation = 'COMMON.ORDERS.LIST.ACTIONS.CREATE';

	return (
		<>
			<Chip
				size="small"
				icon={<Add />}
				label={t(`${translation}.LABEL`)}
				color="primary"
				variant="outlined"
				clickable
				onClick={() => setCreateOrder(true)}
			/>

			{/* Dialog: Create Order */}
			{createOrder && <DialogCreateOrder open={createOrder} setOpen={setCreateOrder} />}
		</>
	);
};
export default RobotOrdersCreate;

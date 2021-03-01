import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Meta from '../../../frame/meta/Meta';

const OrderReports: FC = () => {
	const { t } = useTranslation('META');

	return (
		<>
			<Meta title={t('ORDER_REPORTS.TITLE')} description={t('ORDER_REPORTS.DESCRIPTION')} />
			<Box component="section" className="rc-order-reports">
				<Typography component="h1" variant="h4">
					Order Reports
				</Typography>
			</Box>
		</>
	);
};
export default OrderReports;

import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Meta from '../../../frame/meta/Meta';

const AlertConfig: FC = () => {
	const { t } = useTranslation('META');

	return (
		<>
			<Meta title={t('ALERT_CONFIG.TITLE')} description={t('ALERT_CONFIG.DESCRIPTION')} />
			<Box component="section" className="rc-alert-config">
				<Typography component="h1" variant="h4">
					Alert Config
				</Typography>
			</Box>
		</>
	);
};
export default AlertConfig;

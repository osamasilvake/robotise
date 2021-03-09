import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Meta from '../../../frame/meta/Meta';

const Sites: FC = () => {
	const { t } = useTranslation('META');

	return (
		<>
			<Meta title={t('SITES.TITLE')} description={t('SITES.DESCRIPTION')} />
			<Box component="section" className="rc-sites">
				<Typography component="h1" variant="h4">
					Sites
				</Typography>
			</Box>
		</>
	);
};
export default Sites;

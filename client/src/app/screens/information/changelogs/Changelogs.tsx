import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Meta from '../../../frame/meta/Meta';

const Changelogs: FC = () => {
	const { t } = useTranslation('META');

	return (
		<>
			<Meta title={t('CHANGELOGS.TITLE')} description={t('CHANGELOGS.DESCRIPTION')} />
			<Box component="section" className="rc-changelogs">
				<Typography component="h1" variant="h4">
					Changelogs
				</Typography>
			</Box>
		</>
	);
};
export default Changelogs;

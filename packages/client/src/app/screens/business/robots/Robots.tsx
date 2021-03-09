import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Meta from '../../../frame/meta/Meta';

const Robots: FC = () => {
	const { t } = useTranslation('META');

	return (
		<>
			<Meta title={t('ROBOTS.TITLE')} description={t('ROBOTS.DESCRIPTION')} />
			<Box component="section" className="rc-robots">
				<Typography component="h1" variant="h4">
					Robots
				</Typography>
			</Box>
		</>
	);
};
export default Robots;

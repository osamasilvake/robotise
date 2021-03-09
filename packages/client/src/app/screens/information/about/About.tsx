import { Box, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Meta from '../../../frame/meta/Meta';

const About: FC = () => {
	const { t } = useTranslation('META');

	return (
		<>
			<Meta title={t('ABOUT.TITLE')} description={t('ABOUT.DESCRIPTION')} />
			<Box component="section" className="rc-about">
				<Typography component="h1" variant="h4">
					About
				</Typography>
			</Box>
		</>
	);
};
export default About;

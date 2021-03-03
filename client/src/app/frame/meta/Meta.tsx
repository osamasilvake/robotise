import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { ConfigService } from '../../services';
import { MetaInterface } from './Meta.interface';

const Meta: FC<MetaInterface> = (props) => {
	const { t } = useTranslation('META');
	const { title, description } = props;

	return (
		<Helmet>
			<title>
				{title || ConfigService.envName} | {ConfigService.envAuthor}
			</title>
			<meta name="description" content={description || t('GENERAL.DESCRIPTION')} />
		</Helmet>
	);
};
export default Meta;

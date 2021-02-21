import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { ApiEnv } from '../../services';
import { MetaInterface } from './Meta.interface';

const Meta: FC<MetaInterface> = (props) => {
	const { title, description } = props;

	return (
		<Helmet>
			<title>
				{title || ApiEnv.name} | {ApiEnv.author}
			</title>
			<meta name="description" content={description} />
		</Helmet>
	);
};
export default Meta;

import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { ConfigService } from '../../services';
import { MetaInterface } from './Meta.interface';

const Meta: FC<MetaInterface> = (props) => {
	const { title, description } = props;

	return (
		<Helmet>
			<title>
				{title || ConfigService.envName} | {ConfigService.envAuthor}
			</title>
			<meta name="description" content={description} />
		</Helmet>
	);
};
export default Meta;

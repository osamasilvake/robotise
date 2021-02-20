import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { MetaInterface } from './Meta.interface';

const Meta: FC<MetaInterface> = (props) => {
	const { title, description } = props;
	const t = title || process.env.REACT_APP_NAME?.toUpperCase();
	const author = process.env.REACT_APP_AUTHOR;
	return (
		<Helmet>
			<title>
				{t} | {author}
			</title>
			<meta name="description" content={description} />
		</Helmet>
	);
};
export default Meta;

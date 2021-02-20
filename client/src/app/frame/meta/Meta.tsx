import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

const Meta: FC = (props) => {
	const { children } = props;
	return <Helmet>{children}</Helmet>;
};
export default Meta;

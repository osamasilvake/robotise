import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { AppConfigService } from '../../../services';
import { MetaInterface } from './Meta.interface';

const Meta: FC<MetaInterface> = (props) => {
	const { title, description } = props;

	return (
		<Helmet>
			<title>
				{title || AppConfigService.envAppName} | {AppConfigService.envCompanyName}
			</title>
			<meta name="description" content={description} />
		</Helmet>
	);
};
export default Meta;

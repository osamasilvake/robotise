import { Paper } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageHead from '../../../components/content/page-head/PageHead';
import { AppConfigService } from '../../../services';
import { emailSelector } from '../../../slices/business/general/emails/Email.slice';
import GeneralEmailDetail from './emails/detail/GeneralEmailDetail';
import { GenParamsInterface } from './Gen.interface';
import GenTabs from './Gen.tabs';

const Gen: FC = () => {
	const { t } = useTranslation('BREADCRUMB');

	const email = useSelector(emailSelector);

	const params = useParams() as GenParamsInterface;

	const dots = AppConfigService.AppOptions.common.dots;

	/**
	 * create breadcrumb labels
	 * @returns
	 */
	const breadcrumbLabels = () =>
		Object.keys(params).map((key) => {
			if (key === 'emailId') {
				return !email.loader ? t('EMAIL') : dots;
			}
			return '';
		});

	/**
	 * gen detail routes
	 * @returns
	 */
	const genDetailRoutes = () => {
		if (params.emailId) {
			return <GeneralEmailDetail />;
		}
		return <GenTabs />;
	};

	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead
				title="ROBOTS.ROBOT.TITLE"
				description="ROBOTS.ROBOT.DESCRIPTION"
				labels={breadcrumbLabels()}
			/>

			{/* Content */}
			{genDetailRoutes()}
		</Paper>
	);
};
export default Gen;

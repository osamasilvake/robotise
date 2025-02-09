import { Paper } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageHead from '../../../components/content/page-head/PageHead';
import ErrorBoundary from '../../../components/frame/error-boundary/ErrorBoundary';
import { AppConfigService } from '../../../services';
import { allOrderSelector } from '../../../slices/business/general/all-orders/AllOrder.slice';
import { emailSelector } from '../../../slices/business/general/emails/Email.slice';
import GeneralAllOrderDetail from './all-orders/detail/GeneralAllOrderDetail';
import GeneralEmailDetail from './emails/detail/GeneralEmailDetail';
import { GenParamsInterface } from './Gen.interface';
import GenTabs from './Gen.tabs';

const Gen: FC = () => {
	const { t } = useTranslation('BREADCRUMB');

	const email = useSelector(emailSelector);
	const allOrder = useSelector(allOrderSelector);

	const params = useParams<keyof GenParamsInterface>() as GenParamsInterface;

	const dots = AppConfigService.AppOptions.common.dots;

	/**
	 * create breadcrumb labels
	 * @returns
	 */
	const breadcrumbLabels = () =>
		Object.keys(params).map((key) => {
			if (key === 'emailId') {
				return !email.loader ? t('EMAIL') : dots;
			} else if (key === 'orderId') {
				return !allOrder.loader ? t('ORDER') : dots;
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
		} else if (params.orderId) {
			return <GeneralAllOrderDetail />;
		}
		return <GenTabs />;
	};

	return (
		<Paper elevation={12} component="section" square>
			{/* Page Head */}
			<PageHead
				title="GENERAL.GEN.TITLE"
				description="GENERAL.GEN.DESCRIPTION"
				labels={breadcrumbLabels()}
				disableGeneralTab={AppConfigService.AppRoutes.SCREENS.BUSINESS.GENERAL.MAIN}
			/>

			{/* Content */}
			<ErrorBoundary>{genDetailRoutes()}</ErrorBoundary>
		</Paper>
	);
};
export default Gen;

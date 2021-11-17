import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import {
	EmailFetch,
	emailSelector
} from '../../../../../slices/business/general/emails/Email.slice';
import { GenParamsInterface } from '../../Gen.interface';
import GeneralEmailContent from './GeneralEmailContent';

const GeneralEmailDetail: FC = () => {
	const dispatch = useDispatch();
	const email = useSelector(emailSelector);

	const params = useParams() as GenParamsInterface;

	useEffect(() => {
		// dispatch: fetch email
		dispatch(EmailFetch(params.emailId));
	}, [dispatch, params.emailId]);

	// loader
	if (email.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (email.errors) {
		return <PageError message={email.errors.text} />;
	}

	// null
	if (!email.content) {
		return null;
	}

	// empty
	if (!email.content.updatedAt) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return email ? <GeneralEmailContent email={email.content} /> : null;
};
export default GeneralEmailDetail;

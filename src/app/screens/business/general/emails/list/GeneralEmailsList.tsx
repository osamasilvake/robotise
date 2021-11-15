import { Box } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../services';
import {
	EmailsFetchList,
	emailsSelector
} from '../../../../../slices/business/general/emails/Emails.slice';
import { GeneralEmailsListPayloadInterface } from './GeneralEmailsList.interface';
import { GeneralEmailsListStyle } from './GeneralEmailsList.style';
import GeneralEmailsTable from './table/GeneralEmailsTable';

const GeneralEmailsList: FC = () => {
	const classes = GeneralEmailsListStyle();

	const dispatch = useDispatch();
	const emails = useSelector(emailsSelector);

	const page = emails.content?.state?.page || 0;
	const rowsPerPage =
		emails.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.general.emails.list.defaultPageSize;

	const pageRef = useRef({
		page: (emails.content?.meta?.page || 0) - 1,
		rowsPerPage
	});

	useEffect(() => {
		const payload: GeneralEmailsListPayloadInterface = {
			page,
			rowsPerPage
		};

		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch emails
			dispatch(EmailsFetchList(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = emails.content === null;

			const condition2 = pageRef.current.page !== -1; // page switch back and forth
			const condition3 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2) {
				if (condition3) {
					// dispatch: fetch emails
					dispatch(EmailsFetchList(payload));

					// update ref
					pageRef.current.page = page;
				}
			}
		}
	}, [dispatch, emails.content, page, rowsPerPage]);

	useEffect(() => {
		const executeServices = () => {
			if (emails.content) {
				// dispatch: fetch emails
				dispatch(
					EmailsFetchList(
						{
							page: 0,
							rowsPerPage
						},
						true
					)
				);
			}
		};

		// interval
		const intervalId = window.setInterval(
			executeServices,
			AppConfigService.AppOptions.screens.business.general.emails.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, emails.content, page, rowsPerPage]);

	// loader
	if (emails.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (emails.errors) {
		return <PageError message={emails.errors?.text} />;
	}

	// null
	if (!emails.content) {
		return null;
	}

	// empty
	if (!emails.content.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			<GeneralEmailsTable content={emails.content} page={page} rowsPerPage={rowsPerPage} />
		</Box>
	);
};
export default GeneralEmailsList;

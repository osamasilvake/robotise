import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import { LogsFetch, logsSelector } from '../../../../../../slices/business/robots/logs/Logs.slice';
import { RobotLogsListPayloadInterface } from './RobotLogsList.interface';

const RobotLogsList: FC = () => {
	const dispatch = useDispatch();
	const logs = useSelector(logsSelector);

	const page = logs.content?.state?.page || 0;
	const rowsPerPage =
		logs.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.robots.content.logs.list.defaultPageSize;

	const pageRef = useRef({
		page: (logs.content?.meta?.page || 0) - 1,
		rowsPerPage
	});

	useEffect(() => {
		const payload: RobotLogsListPayloadInterface = {
			page,
			rowsPerPage
		};

		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch robot commands logs
			dispatch(LogsFetch(payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition2 = logs.content === null;
			const condition4 = pageRef.current.page !== -1; // page switch back and forth
			const condition5 = page > pageRef.current.page; // detect next click

			if (condition2 || condition4) {
				if (condition5) {
					// dispatch: fetch robot commands logs
					dispatch(LogsFetch(payload));

					// update ref
					pageRef.current.page = page;
				}
			}
		}
	}, [dispatch, logs.content, page, rowsPerPage]);

	// loader
	if (logs.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (logs.errors) {
		return <PageError message={logs.errors?.text} />;
	}

	// null
	if (!logs.content) {
		return null;
	}

	// empty
	if (!logs.content.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return <>Hello World</>;
};
export default RobotLogsList;

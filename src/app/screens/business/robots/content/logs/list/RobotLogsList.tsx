import { Box } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loader from '../../../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../../../components/content/page-error/PageError';
import { AppConfigService } from '../../../../../../services';
import {
	logsSelector,
	RobotLogsFetch
} from '../../../../../../slices/business/robots/logs/Logs.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotLogsListPayloadInterface } from './RobotLogsList.interface';
import { RobotLogsListStyle } from './RobotLogsList.style';
import RobotLogsTable from './table/RobotLogsTable';

const RobotLogsList: FC = () => {
	const classes = RobotLogsListStyle();

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

	const params: RobotParamsInterface = useParams();
	const pRobotId = logs.content?.state?.pRobotId;
	const cRobotId = params.robotId;

	useEffect(() => {
		const payload: RobotLogsListPayloadInterface = {
			pRobotId: cRobotId,
			page,
			rowsPerPage
		};

		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch robot logs
			dispatch(RobotLogsFetch(cRobotId, payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = logs.content === null;
			const condition2 = !!(logs.content !== null && pRobotId && pRobotId !== cRobotId);

			const condition3 = pageRef.current.page !== -1; // page switch back and forth
			const condition4 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2 || condition3) {
				if (condition2 || condition4) {
					// dispatch: fetch robot logs
					dispatch(
						RobotLogsFetch(cRobotId, {
							...payload,
							page: condition2 ? 0 : page
						})
					);

					// update ref
					pageRef.current.page = condition2 ? 0 : page;
				}
			}
		}
	}, [dispatch, logs.content, cRobotId, pRobotId, page, rowsPerPage]);

	useEffect(() => {
		const executeServices = () => {
			if (logs.content) {
				// dispatch: fetch robot logs
				dispatch(
					RobotLogsFetch(
						cRobotId,
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
			AppConfigService.AppOptions.screens.business.robots.content.logs.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, logs.content, cRobotId, page, rowsPerPage]);

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

	return (
		<Box className={classes.sBox}>
			<RobotLogsTable content={logs.content} page={page} rowsPerPage={rowsPerPage} />
		</Box>
	);
};
export default RobotLogsList;

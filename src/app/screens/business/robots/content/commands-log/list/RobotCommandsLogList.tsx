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
	commandsLogSelector,
	RobotCommandsLogFetch
} from '../../../../../../slices/business/robots/commands-log/CommandsLog.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotCommandsLogListPayloadInterface } from './RobotCommandsLogList.interface';
import { RobotCommandsLogListStyle } from './RobotCommandsLogList.style';
import RobotCommandsLogTable from './table/RobotCommandsLogTable';

const RobotCommandsLogList: FC = () => {
	const classes = RobotCommandsLogListStyle();

	const dispatch = useDispatch();
	const commandsLog = useSelector(commandsLogSelector);

	const page = commandsLog.content?.state?.page || 0;
	const rowsPerPage =
		commandsLog.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.robots.content.commandsLog.list
			.defaultPageSize;

	const pageRef = useRef({
		page: (commandsLog.content?.meta?.page || 0) - 1,
		rowsPerPage
	});

	const params: RobotParamsInterface = useParams();
	const pRobotId = commandsLog.content?.state?.pRobotId;
	const cRobotId = params.robotId;

	useEffect(() => {
		const payload: RobotCommandsLogListPayloadInterface = {
			page,
			rowsPerPage
		};

		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch robot commands log
			dispatch(RobotCommandsLogFetch(cRobotId, payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = commandsLog.content === null;
			const condition2 = !!(
				commandsLog.content !== null &&
				pRobotId &&
				pRobotId !== cRobotId
			);

			const condition3 = pageRef.current.page !== -1; // page switch back and forth
			const condition4 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2 || condition3) {
				if (condition2 || condition4) {
					// dispatch: fetch robot commands log
					dispatch(
						RobotCommandsLogFetch(cRobotId, {
							...payload,
							page: condition2 ? 0 : page
						})
					);

					// update ref
					pageRef.current.page = condition2 ? 0 : page;
				}
			}
		}
	}, [dispatch, commandsLog.content, cRobotId, pRobotId, page, rowsPerPage]);

	useEffect(() => {
		const executeServices = () => {
			if (commandsLog.content) {
				// dispatch: fetch robot commands log
				dispatch(
					RobotCommandsLogFetch(
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
			AppConfigService.AppOptions.screens.business.robots.content.commandsLog.list.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, commandsLog.content, cRobotId, page, rowsPerPage]);

	// loader
	if (commandsLog.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (commandsLog.errors) {
		return <PageError message={commandsLog.errors?.text} />;
	}

	// null
	if (!commandsLog.content) {
		return null;
	}

	// empty
	if (!commandsLog.content.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			<RobotCommandsLogTable
				content={commandsLog.content}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
		</Box>
	);
};
export default RobotCommandsLogList;

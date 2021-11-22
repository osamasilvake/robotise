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
	ElevatorCallsFetchList,
	elevatorCallsSelector
} from '../../../../../../slices/business/robots/elevator-calls/ElevatorCalls.slice';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotElevatorCallsListPayloadInterface } from './RobotElevatorCallsList.interface';
import { RobotElevatorCallsListStyle } from './RobotElevatorCallsList.style';
import RobotElevatorCallsTable from './table/RobotElevatorCallsTable';

const RobotElevatorCallsList: FC = () => {
	const classes = RobotElevatorCallsListStyle();

	const dispatch = useDispatch();
	const elevatorCalls = useSelector(elevatorCallsSelector);

	const page = elevatorCalls.content?.state?.page || 0;
	const rowsPerPage =
		elevatorCalls.content?.state?.rowsPerPage ||
		AppConfigService.AppOptions.screens.business.robots.content.elevatorCalls.list
			.defaultPageSize;

	const pageRef = useRef({
		page: (elevatorCalls.content?.meta?.page || 0) - 1,
		rowsPerPage
	});

	const params = useParams() as RobotParamsInterface;
	const pRobotId = elevatorCalls.content?.state?.pRobotId;
	const cRobotId = params.robotId;

	useEffect(() => {
		const payload: RobotElevatorCallsListPayloadInterface = {
			page,
			rowsPerPage
		};

		if (pageRef.current.rowsPerPage !== rowsPerPage && page === 0) {
			// dispatch: fetch robot elevator calls
			dispatch(ElevatorCallsFetchList(cRobotId, payload));

			// update ref
			pageRef.current.page = page;
			pageRef.current.rowsPerPage = rowsPerPage;
		} else {
			const condition1 = elevatorCalls.content === null;
			const condition2 = !!(
				elevatorCalls.content !== null &&
				pRobotId &&
				pRobotId !== cRobotId
			);

			const condition3 = pageRef.current.page !== -1; // page switch back and forth
			const condition4 = page > pageRef.current.page; // detect next click

			if (condition1 || condition2 || condition3) {
				if (condition2 || condition4) {
					// dispatch: fetch robot elevator calls
					dispatch(
						ElevatorCallsFetchList(cRobotId, {
							...payload,
							page: condition2 ? 0 : page
						})
					);

					// update ref
					pageRef.current.page = condition2 ? 0 : page;
				}
			}
		}
	}, [dispatch, elevatorCalls.content, cRobotId, pRobotId, page, rowsPerPage]);

	useEffect(() => {
		const executeServices = () => {
			if (elevatorCalls.content) {
				// dispatch: fetch robot elevator calls
				dispatch(
					ElevatorCallsFetchList(
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
			AppConfigService.AppOptions.screens.business.robots.content.elevatorCalls.list
				.refreshTime
		);
		return () => window.clearInterval(intervalId);
	}, [dispatch, elevatorCalls.content, cRobotId, page, rowsPerPage]);

	// loader
	if (elevatorCalls.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (elevatorCalls.errors) {
		return <PageError message={elevatorCalls.errors?.text} />;
	}

	// null
	if (!elevatorCalls.content) {
		return null;
	}

	// empty
	if (!elevatorCalls.content.data.length) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			<RobotElevatorCallsTable
				content={elevatorCalls.content}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
		</Box>
	);
};
export default RobotElevatorCallsList;

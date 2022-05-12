import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../components/common/loader/Loader';
import { LoaderTypeEnum } from '../../../../components/common/loader/Loader.enum';
import PageEmpty from '../../../../components/content/page-empty/PageEmpty';
import PageError from '../../../../components/content/page-error/PageError';
import { AppDispatch } from '../../../../slices';
import {
	RobotPasswordFetch,
	robotPasswordSelector
} from '../../../../slices/setup/robot-password/RobotPassword.slice';
import { SetupRobotPasswordStyle } from './SetupRobotPassword.style';
import SetupRobotPasswordContent from './SetupRobotPasswordContent';

const SetupRobotPassword: FC = () => {
	const classes = SetupRobotPasswordStyle();

	const dispatch = useDispatch<AppDispatch>();
	const robotPassword = useSelector(robotPasswordSelector);

	useEffect(() => {
		// dispatch: fetch robot password
		dispatch(RobotPasswordFetch());
	}, [dispatch]);

	// loader
	if (robotPassword.loader) {
		return <Loader loader={LoaderTypeEnum.PAGE_LOADER} spinnerText="LOADING" />;
	}

	// error
	if (robotPassword.errors) {
		return <PageError message={robotPassword.errors.text} />;
	}

	// init
	if (!robotPassword.init) return null;

	// empty
	if (!robotPassword.content?.data?.attributes?.password) {
		return <PageEmpty message="EMPTY.MESSAGE" />;
	}

	return (
		<Box className={classes.sBox}>
			<SetupRobotPasswordContent />
		</Box>
	);
};
export default SetupRobotPassword;

import { Box } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../../../components/common/loader/Loader';
import PageError from '../../../../../components/content/page-error/PageError';
import {
	RobotTwinsFetchList,
	robotTwinsSelector
} from '../../../../../slices/robot-twins/RobotTwins.slice';

const RobotDetail: FC = () => {
	const dispatch = useDispatch();
	const { loading, content, errors } = useSelector(robotTwinsSelector);

	useEffect(() => {
		if (content === null) {
			// dispatch: fetch robot twins
			dispatch(RobotTwinsFetchList());
		}
	}, [content, dispatch]);

	// loading
	if (loading) {
		return <Loader spinner spinnerSmall spinnerText="LOADING" />;
	}

	// error
	if (errors && errors.text) {
		return <PageError message={errors.text} />;
	}

	return <Box>Hello World</Box>;
};
export default RobotDetail;

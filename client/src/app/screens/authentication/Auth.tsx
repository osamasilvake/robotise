import React, { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/loader/Loader';
import { authSelector, validateLogin } from '../../slices/auth/Auth.slice';
import Login from './login/Login';

const Auth: FC = (props) => {
	const dispatch = useDispatch();
	const { response, errors } = useSelector(authSelector);

	useEffect(() => {
		dispatch(validateLogin());
	}, [dispatch]);

	/**
	 * authentication state
	 * 0-init: loading
	 * 1-success: dashboard
	 * 2-error: login
	 */
	const authValidation = () => {
		if (response && response.uuid) {
			return props.children;
		} else if (errors && errors.status) {
			return <Login />;
		} else {
			return <Loader />;
		}
	};

	return <>{authValidation()}</>;
};
export default Auth;

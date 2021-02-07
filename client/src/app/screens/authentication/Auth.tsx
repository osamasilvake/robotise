import React, { useEffect, useState } from 'react';
import { FC } from 'react';

import Loader from '../../components/loader/Loader';
import Login from './login/Login';

const Auth: FC = (props) => {
	const [authState, setAuthState] = useState({
		status: 0,
		msg: 'init',
		err: null
	});

	useEffect(() => {
		onLoad();
	}, []);

	async function onLoad() {
		try {
			setTimeout(() => {
				setAuthState({
					status: 1,
					msg: 'success',
					err: null
				});
			}, 9000);

			// await Auth.currentSession();
		} catch (e) {
			setAuthState({
				status: 2,
				msg: 'failed',
				err: e
			});
		}
	}

	/**
	 * authentication state
	 * 0-init: loading
	 * 1-success: dashboard
	 * 2-error: login
	 */
	const view = () => {
		switch (authState.status) {
			case 0:
				return <Loader />;
			case 1:
				return props.children;
			default:
				return <Login />;
		}
	};

	return <>{view()}</>;
};
export default Auth;

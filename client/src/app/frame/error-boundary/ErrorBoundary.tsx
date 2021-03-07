import React, { Component, ErrorInfo } from 'react';

import { Props, State } from './ErrorBoundary.interface';

class ErrorBoundary extends Component<Props, State> {
	state: State = {
		hasError: false,
		error: null
	};

	/**
	 * update state so the next render will show the fallback UI.
	 * @param error
	 */
	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	/**
	 * log the error detail
	 * @param error
	 * @param errorInfo
	 */
	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <h1>Sorry.. there was an error</h1>;
		}
		return this.props.children;
	}
}
export default ErrorBoundary;

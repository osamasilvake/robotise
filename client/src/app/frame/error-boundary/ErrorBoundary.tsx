import { Box, Typography } from '@material-ui/core';
import React, { Component, ErrorInfo } from 'react';

import {
	ErrorBoundaryPropsInterface,
	ErrorBoundaryStateInterface
} from './ErrorBoundary.interface';

class ErrorBoundary extends Component<ErrorBoundaryPropsInterface, ErrorBoundaryStateInterface> {
	state: ErrorBoundaryStateInterface = {
		hasError: false,
		error: null
	};

	/**
	 * update state so the next render will show the fallback UI.
	 * @param error
	 */
	static getDerivedStateFromError(error: Error): ErrorBoundaryStateInterface {
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
			return (
				<Box>
					<Typography component="h1" variant="h4">
						Error Boundar caught an error for you!
					</Typography>
				</Box>
			);
		}
		return this.props.children;
	}
}
export default ErrorBoundary;

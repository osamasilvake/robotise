import { Box, Link, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import clsx from 'clsx';
import log from 'loglevel';
import { Component, ErrorInfo } from 'react';
import { withTranslation } from 'react-i18next';

import Error from '../../common/error/Error';
import { ErrorTypeEnum } from '../../common/error/Error.enum';
import {
	ErrorBoundaryPropsInterface,
	ErrorBoundaryStateInterface
} from './ErrorBoundary.interface';
import { ErrorBoundaryStyle } from './ErrorBoundary.style';

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
		log.error('Uncaught error:', error, errorInfo);
	}

	render() {
		const { hasError } = this.state;
		const { children, classes, t, error } = this.props;

		if (hasError) {
			return (
				<Box component="section">
					<Error error={error || ErrorTypeEnum.PAGE_ERROR}>
						<Typography
							variant={error ? 'h1' : 'h2'}
							className={clsx({
								[classes.sTitle]: error
							})}>
							{t('ERROR_BOUNDARY.TITLE')}
						</Typography>
						<Typography
							color="textSecondary"
							className={clsx({
								[classes.sDescription]: error
							})}>
							{t('ERROR_BOUNDARY.DESCRIPTION')}
						</Typography>
						<Link
							component="button"
							variant="body1"
							underline="hover"
							onClick={() => window.location.reload()}>
							{t('ERROR_BOUNDARY.LINK')}
						</Link>
					</Error>
				</Box>
			);
		}
		return children;
	}
}
export default withStyles(ErrorBoundaryStyle)(withTranslation('ERRORS')(ErrorBoundary));

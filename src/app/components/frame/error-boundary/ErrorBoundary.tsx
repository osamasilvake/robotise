import { Box, Link, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
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
		const { classes, t } = this.props;

		if (this.state.hasError) {
			return (
				<Box component="section">
					<Error error={ErrorTypeEnum.ERROR_BOUNDARY}>
						<Typography variant="h1" className={classes.sTitle}>
							{t('ERROR_BOUNDARY.TITLE')}
						</Typography>
						<Typography
							variant="body1"
							color="textSecondary"
							className={classes.sDescription}>
							{t('ERROR_BOUNDARY.DESCRIPTION')}
						</Typography>
						<Link
							component="button"
							underline="hover"
							onClick={() => window.location.reload()}
							className={classes.sLink}>
							{t('ERROR_BOUNDARY.LINK')}
						</Link>
					</Error>
				</Box>
			);
		}
		return this.props.children;
	}
}
export default withStyles(ErrorBoundaryStyle)(withTranslation('ERRORS')(ErrorBoundary));

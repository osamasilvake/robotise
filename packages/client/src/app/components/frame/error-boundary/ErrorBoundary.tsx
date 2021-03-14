import { Box, Link, Typography, withStyles } from '@material-ui/core';
import log from 'loglevel';
import { Component, ErrorInfo } from 'react';
import { withTranslation } from 'react-i18next';

import { AppConfigService } from '../../../services';
import Error from '../../common/error/Error';
import { ErrorTypeEnum } from '../../common/error/Error.enum';
import {
	ErrorBoundaryPropsInterface,
	ErrorBoundaryStateInterface
} from './ErrorBoundary.interface';
import { errorBoundaryStyles } from './ErrorBoundary.style';

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
							href={AppConfigService.AppRoutes.SCREENS.BUSINESS.DASHBOARD}
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
export default withStyles(errorBoundaryStyles)(withTranslation('ERRORS')(ErrorBoundary));

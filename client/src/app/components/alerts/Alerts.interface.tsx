import { AlertProps } from '@material-ui/lab';

export interface AlertsInterface extends AlertProps {
	handleClose?: () => void;
}

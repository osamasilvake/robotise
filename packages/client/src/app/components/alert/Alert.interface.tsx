import { AlertProps } from '@material-ui/lab';

export interface AlertInterface extends AlertProps {
	handleClose?: () => void;
}

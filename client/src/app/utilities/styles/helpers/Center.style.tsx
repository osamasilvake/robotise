import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
	vhCenter: {
		left: '50%',
		top: '50%',
		position: 'absolute',
		transform: 'translate(-50%, -50%)'
	}
}));

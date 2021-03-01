import { makeStyles } from '@material-ui/core/styles';

export const centerStyles = makeStyles(() => ({
	centerVH: {
		left: '50%',
		top: '50%',
		position: 'absolute',
		transform: 'translate(-50%, -50%)'
	}
}));

import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import React, { FC, forwardRef, ReactElement, Ref } from 'react';

// transition
const Transition = forwardRef(function Transition(
	props: TransitionProps & { children?: ReactElement<any, any> },
	ref: Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

// modal interface
interface ModalInterface {
	show: boolean;
	close: any;
	modalClass?: string;
}

const Modal: FC<ModalInterface> = (props) => {
	// props
	const { children, show, close, modalClass } = props;

	return (
		<Dialog
			className={modalClass}
			open={show}
			onClose={() => close(false)}
			keepMounted
			TransitionComponent={Transition}>
			{children}
		</Dialog>
	);
};
export default Modal;

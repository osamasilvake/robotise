import Dialog from '@material-ui/core/Dialog';
import React, { FC, ReactEventHandler } from 'react';

// modal interface
interface ModalInterface {
	show: boolean;
	close: ReactEventHandler;
	modalClass?: string;
}

const Modal: FC<ModalInterface> = (props) => {
	// props
	const { children, show, close, modalClass } = props;

	return (
		<Dialog className={modalClass} open={show} onClose={close} keepMounted>
			{children}
		</Dialog>
	);
};
export default Modal;

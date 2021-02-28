import { Dialog } from '@material-ui/core';
import React, { FC } from 'react';

import { ModalInterface } from './Modal.interface';

const Modal: FC<ModalInterface> = (props) => {
	const { children, show, close, modalClass } = props;

	return (
		<Dialog className={modalClass} open={show} onClose={close} keepMounted>
			{children}
		</Dialog>
	);
};
export default Modal;

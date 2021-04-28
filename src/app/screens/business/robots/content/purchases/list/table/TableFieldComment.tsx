import { Box, Chip, CircularProgress, TextField, Typography } from '@material-ui/core';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	PurchaseEditComment,
	purchasesSelector
} from '../../../../../../../slices/purchases/Purchases.slice';
import { TableFieldCommentInterface } from './RobotPurchasesTable.interface';
import { RobotPurchasesTableStyles } from './RobotPurchasesTable.style';

const TableFieldComment: FC<TableFieldCommentInterface> = (props) => {
	const { purchase, edit, setEdit } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesTableStyles();

	const dispatch = useDispatch();
	const purchases = useSelector(purchasesSelector);

	const [value, setValue] = useState(purchase.comment);

	/**
	 * handle propagation
	 * @param event
	 */
	const handlePropagation = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();
	};

	/**
	 * toggle comment field
	 */
	const toggleCommentField = () => {
		if (edit) {
			// dispatch: edit comment
			Promise.all([dispatch(PurchaseEditComment(purchase.id, value))]).then(() => {
				// set edit
				setEdit(false);
			});
		} else {
			// set edit
			setEdit(true);

			// set value
			setValue(purchase.comment);
		}
	};

	/**
	 * handle change
	 * @param event
	 */
	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		// set value
		setValue(value);
	};

	return (
		<Box onClick={handlePropagation}>
			{/* Input */}
			{edit && (
				<TextField
					variant="outlined"
					type="text"
					id="field-comment"
					name="comment"
					label={t('CONTENT.PURCHASES.LIST.VALUES.COMMENT.FIELD.LABEL')}
					placeholder={t('CONTENT.PURCHASES.LIST.VALUES.COMMENT.FIELD.PLACEHOLDER')}
					multiline
					rows={4}
					onChange={handleChangeInput}
					value={value}
					className={classes.sCommentTextField}
				/>
			)}

			{/* Cancel */}
			{edit && (
				<Chip
					size="small"
					label={t('CONTENT.PURCHASES.LIST.VALUES.COMMENT.CANCEL')}
					color="primary"
					variant="outlined"
					clickable={true}
					disabled={purchases.updating}
					onClick={() => setEdit(false)}
					className={classes.sCommentCancel}
				/>
			)}

			{/* Clear */}
			{edit && (
				<Chip
					size="small"
					label={t('CONTENT.PURCHASES.LIST.VALUES.COMMENT.CLEAR')}
					color="primary"
					variant="outlined"
					clickable={true}
					disabled={purchases.updating}
					onClick={() => setValue('')}
					className={classes.sCommentClear}
				/>
			)}

			{/* Edit/Save */}
			<Chip
				size="small"
				label={
					edit
						? t('CONTENT.PURCHASES.LIST.VALUES.COMMENT.SAVE')
						: t('CONTENT.PURCHASES.LIST.VALUES.COMMENT.EDIT')
				}
				color="primary"
				variant="outlined"
				clickable={true}
				icon={edit && purchases.updating ? <CircularProgress size={20} /> : undefined}
				disabled={purchases.updating}
				onClick={toggleCommentField}
			/>

			{/* Value */}
			{!edit && (
				<Typography variant="body2" className={classes.sCommentValue}>
					{purchase.comment}
				</Typography>
			)}
		</Box>
	);
};
export default TableFieldComment;

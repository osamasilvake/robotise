import { Box, Chip, CircularProgress, FormControl, TextField, Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	PurchaseCommentEdit,
	purchasesSelector,
	PurchaseUpdateState
} from '../../../../../../../slices/business/robots/purchases/Purchases.slice';
import { SPCStateInterface } from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { TableFieldCommentInterface } from './RobotPurchasesTable.interface';
import { RobotPurchasesTableStyle } from './RobotPurchasesTable.style';

const TableFieldComment: FC<TableFieldCommentInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesTableStyle();

	const dispatch = useDispatch();
	const purchases = useSelector(purchasesSelector);

	const [value, setValue] = useState(purchase.comment);

	const purchaseId = purchases.content?.state?.locked;
	const editMode = purchase.id === purchaseId;

	const common = 'CONTENT.PURCHASES.LIST.TABLE.VALUES';

	/**
	 * toggle edit mode
	 */
	const toggleEditMode = () => {
		if (editMode) {
			// dispatch: edit a comment field
			dispatch(PurchaseCommentEdit(purchase.id, value, () => closeEditMode()));
		} else {
			// dispatch: update state
			const state: SPCStateInterface = {
				...purchases.content?.state,
				locked: purchase.id
			};
			dispatch(PurchaseUpdateState(state));

			// set value
			setValue(purchase.comment);
		}
	};

	/**
	 * close edit mode
	 */
	const closeEditMode = () => {
		// dispatch: update state
		const state: SPCStateInterface = {
			...purchases.content?.state,
			locked: ''
		};
		dispatch(PurchaseUpdateState(state));
	};

	return (
		<Box onClick={(event) => event.stopPropagation()}>
			{/* Input */}
			{editMode && (
				<FormControl fullWidth>
					<TextField
						variant="outlined"
						type="text"
						id="field-comment"
						name="comment"
						label={t(`${common}.COMMENT.FIELD.LABEL`)}
						placeholder={t(`${common}.COMMENT.FIELD.PLACEHOLDER`)}
						onChange={(event) => setValue(event.target.value)}
						inputRef={(input) => input && input.focus()}
						onFocus={(e) =>
							e.currentTarget.setSelectionRange(
								e.currentTarget.value.length,
								e.currentTarget.value.length
							)
						}
						multiline
						rows={4}
						value={value}
						className={classes.sCommentTextField}
					/>
				</FormControl>
			)}

			<Box>
				{/* Cancel */}
				{editMode && (
					<Chip
						size="small"
						label={t(`${common}.COMMENT.CANCEL`)}
						color="primary"
						variant="outlined"
						clickable
						disabled={purchases.updating}
						onClick={closeEditMode}
						className={classes.sCommentCancel}
					/>
				)}

				{/* Clear */}
				{editMode && (
					<Chip
						size="small"
						label={t(`${common}.COMMENT.CLEAR`)}
						color="primary"
						variant="outlined"
						clickable
						disabled={purchases.updating}
						onClick={() => setValue('')}
						className={classes.sCommentClear}
					/>
				)}

				{/* Edit/Save */}
				<Chip
					size="small"
					label={editMode ? t(`${common}.COMMENT.SAVE`) : t(`${common}.COMMENT.EDIT`)}
					color="primary"
					variant="outlined"
					clickable
					icon={
						editMode && purchases.updating ? <CircularProgress size={20} /> : undefined
					}
					disabled={purchases.updating}
					onClick={toggleEditMode}
				/>

				{/* Value */}
				{!editMode && (
					<Typography variant="body2" className={classes.sCommentValue}>
						{purchase.comment}
					</Typography>
				)}
			</Box>
		</Box>
	);
};
export default TableFieldComment;

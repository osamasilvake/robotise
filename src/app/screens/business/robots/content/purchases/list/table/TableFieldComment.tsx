import { Box, Chip, CircularProgress, TextField, Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	PurchaseEditComment,
	purchasesSelector,
	PurchaseUpdateState
} from '../../../../../../../slices/purchases/Purchases.slice';
import { SPCState } from '../../../../../../../slices/purchases/Purchases.slice.interface';
import { TableFieldCommentInterface } from './RobotPurchasesTable.interface';
import { RobotPurchasesTableStyles } from './RobotPurchasesTable.style';

const TableFieldComment: FC<TableFieldCommentInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesTableStyles();

	const dispatch = useDispatch();
	const purchases = useSelector(purchasesSelector);

	const [value, setValue] = useState(purchase.comment);

	const purchaseId = purchases.content?.state?.locked;
	const editMode = purchase.id === purchaseId;

	/**
	 * toggle edit mode
	 */
	const toggleEditMode = () => {
		if (editMode) {
			// dispatch: edit comment
			Promise.all([dispatch(PurchaseEditComment(purchase.id, value))]).then(() => {
				// close edit mode
				closeEditMode();
			});
		} else {
			// dispatch: update state
			const payload: SPCState = {
				...purchases.content?.state,
				locked: purchase.id
			};
			dispatch(PurchaseUpdateState(payload));

			// set value
			setValue(purchase.comment);
		}
	};

	/**
	 * close edit mode
	 */
	const closeEditMode = () => {
		// dispatch: update state
		const payload: SPCState = {
			...purchases.content?.state,
			locked: ''
		};
		dispatch(PurchaseUpdateState(payload));
	};

	return (
		<Box onClick={(event) => event.stopPropagation()}>
			{/* Input */}
			{editMode && (
				<TextField
					variant="outlined"
					type="text"
					id="field-comment"
					name="comment"
					label={t('CONTENT.PURCHASES.LIST.VALUES.COMMENT.FIELD.LABEL')}
					placeholder={t('CONTENT.PURCHASES.LIST.VALUES.COMMENT.FIELD.PLACEHOLDER')}
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
			)}

			{/* Cancel */}
			{editMode && (
				<Chip
					size="small"
					label={t('CONTENT.PURCHASES.LIST.VALUES.COMMENT.CANCEL')}
					color="primary"
					variant="outlined"
					clickable={true}
					disabled={purchases.updating}
					onClick={closeEditMode}
					className={classes.sCommentCancel}
				/>
			)}

			{/* Clear */}
			{editMode && (
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
					editMode
						? t('CONTENT.PURCHASES.LIST.VALUES.COMMENT.SAVE')
						: t('CONTENT.PURCHASES.LIST.VALUES.COMMENT.EDIT')
				}
				color="primary"
				variant="outlined"
				clickable={true}
				icon={editMode && purchases.updating ? <CircularProgress size={20} /> : undefined}
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
	);
};
export default TableFieldComment;

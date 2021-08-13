import { Box, Chip, CircularProgress, FormControl, TextField, Typography } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
	PurchaseCommentEdit,
	purchasesSelector,
	PurchaseUpdateState
} from '../../../../../../../slices/business/robots/purchases/Purchases.slice';
import { SPCStateInterface } from '../../../../../../../slices/business/robots/purchases/Purchases.slice.interface';
import { useForm } from '../../../../../../../utilities/hooks/form/UseForm';
import {
	TableFieldCommentFormInterface,
	TableFieldCommentInterface
} from './RobotPurchasesTable.interface';
import { RobotPurchasesTableStyle } from './RobotPurchasesTable.style';

const TableFieldComment: FC<TableFieldCommentInterface> = (props) => {
	const { purchase } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesTableStyle();

	const dispatch = useDispatch();
	const purchases = useSelector(purchasesSelector);

	const purchaseId = purchases.content?.state?.locked;
	const editMode = purchase.id === purchaseId;

	const common = 'CONTENT.PURCHASES.LIST.TABLE.VALUES.COMMENT';
	const fieldComment = 'comment';

	const { handleChangeInput, handleSubmit, values } = useForm<TableFieldCommentFormInterface>(
		{
			comment: purchase.comment
		},
		() => ({ comment: '' }),
		async () => {
			if (editMode) {
				// dispatch: edit a comment field
				dispatch(PurchaseCommentEdit(purchase.id, values.comment, () => closeEditMode()));
			} else {
				// dispatch: update state
				const state: SPCStateInterface = {
					...purchases.content?.state,
					locked: purchase.id
				};
				dispatch(PurchaseUpdateState(state));

				// set value
				handleChangeInput({
					target: {
						name: fieldComment,
						value: purchase.comment
					}
				});
			}
		}
	);

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
						multiline
						variant="outlined"
						type="text"
						id={fieldComment}
						name={fieldComment}
						rows={4}
						value={values.comment}
						onChange={handleChangeInput}
						inputRef={(input) => input && input.focus()}
						onFocus={(e) =>
							e.currentTarget.setSelectionRange(
								e.currentTarget.value.length,
								e.currentTarget.value.length
							)
						}
						label={t(`${common}.FIELDS.LABEL`)}
						placeholder={t(`${common}.FIELDS.PLACEHOLDER`)}
						className={classes.sCommentTextField}
					/>
				</FormControl>
			)}

			<Box>
				{/* Cancel */}
				{editMode && (
					<Chip
						size="small"
						label={t(`${common}.CANCEL`)}
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
						label={t(`${common}.CLEAR`)}
						color="primary"
						variant="outlined"
						clickable
						disabled={purchases.updating}
						onClick={() =>
							handleChangeInput({
								target: {
									name: fieldComment,
									value: ''
								}
							})
						}
						className={classes.sCommentClear}
					/>
				)}

				{/* Edit/Save */}
				<Chip
					size="small"
					label={editMode ? t(`${common}.SAVE`) : t(`${common}.EDIT`)}
					color="primary"
					variant="outlined"
					clickable
					icon={
						editMode && purchases.updating ? <CircularProgress size={20} /> : undefined
					}
					disabled={purchases.updating}
					onClick={handleSubmit}
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

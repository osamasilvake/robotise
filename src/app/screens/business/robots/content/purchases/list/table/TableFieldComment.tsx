import { Edit } from '@mui/icons-material';
import { Box, Chip, CircularProgress, FormControl, IconButton, TextField } from '@mui/material';
import DOMPurify from 'dompurify';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ReadMore from '../../../../../../../components/common/read-more/ReadMore';
import { AppDispatch } from '../../../../../../../slices';
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

	const dispatch = useDispatch<AppDispatch>();
	const purchases = useSelector(purchasesSelector);

	const purchaseId = purchases.content?.state?.locked;
	const editMode = purchase.id === purchaseId;
	const translation = 'CONTENT.PURCHASES.LIST.TABLE.VALUES.COMMENT';
	const fieldComment = 'comment';

	const { handleChangeInput, handleSubmit, values } = useForm<TableFieldCommentFormInterface>(
		{
			comment: purchase.comment
		},
		() => ({ comment: '' }),
		async () => {
			if (editMode) {
				// sanitize text
				const comment = DOMPurify.sanitize(values.comment);

				// dispatch: edit a comment field
				dispatch(PurchaseCommentEdit(purchase.id, comment, () => closeEditMode()));
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
		<Box onClick={(e) => e.stopPropagation()}>
			{/* Input */}
			{editMode && (
				<FormControl fullWidth>
					<TextField
						multiline
						type="text"
						id={fieldComment}
						name={fieldComment}
						rows={4}
						label={t(`${translation}.FIELD.LABEL`)}
						placeholder={t(`${translation}.FIELD.PLACEHOLDER`)}
						value={values.comment}
						onChange={handleChangeInput}
						onFocus={(e) =>
							e.currentTarget.setSelectionRange(
								e.currentTarget.value.length,
								e.currentTarget.value.length
							)
						}
						inputRef={(input) => input && input.focus()}
						className={classes.sCommentTextField}
					/>
				</FormControl>
			)}

			<Box>
				{/* Cancel */}
				{editMode && (
					<Chip
						size="small"
						label={t(`${translation}.CANCEL`)}
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
						label={t(`${translation}.CLEAR`)}
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

				{/* Edit */}
				{!editMode && (
					<IconButton color="primary" onClick={handleSubmit}>
						<Edit fontSize="small" />
					</IconButton>
				)}

				{/* Save */}
				{editMode && (
					<Chip
						size="small"
						label={t(`${translation}.SAVE`)}
						color="primary"
						variant="outlined"
						clickable
						icon={purchases.updating ? <CircularProgress size={20} /> : undefined}
						disabled={purchases.updating}
						onClick={handleSubmit}
					/>
				)}

				{/* Value */}
				<Box className={classes.sCommentText}>
					{!editMode && <ReadMore text={purchase.comment} variant="body2" min={250} />}
				</Box>
			</Box>
		</Box>
	);
};
export default TableFieldComment;

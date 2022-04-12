import { DeleteOutline, Edit } from '@mui/icons-material';
import { Box, IconButton, TableCell } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import ReadMore from '../../../../../components/common/read-more/ReadMore';
import { AppConfigService } from '../../../../../services';
import { authSelector } from '../../../../../slices/authentication/Auth.slice';
import { SDLDataInterface } from '../../../../../slices/settings/deep-links/DeepLinks.interface';
import { dateFormat1 } from '../../../../../utilities/methods/Date';
import { AuthScopeTypeEnum } from '../../../../authentication/Auth.enum';
import { validateScope } from '../../../../authentication/Auth.scope';
import { DeepLinkCreateEditTypeEnum, DeepLinksTableColumnsTypeEnum } from './DeepLinksTable.enum';
import {
	DeepLinksTableBodyCellInterface,
	DeepLinksTableColumnInterface
} from './DeepLinksTable.interface';
import DialogCreateEditDeepLink from './DialogCreateEditDeepLink';
import DialogDeleteDeepLink from './DialogDeleteDeepLink';

const DeepLinksTableBodyCell: FC<DeepLinksTableBodyCellInterface> = (props) => {
	const { deepLink, column } = props;

	const auth = useSelector(authSelector);

	const [openCreateEdit, setOpenCreateEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	/**
	 * open create/edit deep link dialog
	 * @param event
	 */
	const openCreateEditDeepLinkDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// set create/edit open
		setOpenCreateEdit(true);
	};

	/**
	 * open delete deep link dialog
	 * @param event
	 */
	const openDeleteDeepLinkDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// set delete open
		setOpenDelete(true);
	};

	/**
	 * set cell value
	 * @param deepLink
	 * @param column
	 * @returns
	 */
	const setCellValue = (deepLink: SDLDataInterface, column: DeepLinksTableColumnInterface) => {
		if (column.id === DeepLinksTableColumnsTypeEnum.ACTIONS) {
			return (
				<Box>
					<IconButton
						color="primary"
						disabled={
							!validateScope(
								auth.user?.scope,
								AuthScopeTypeEnum.WRITE,
								AppConfigService.AppRoutes.SCREENS.SETTINGS.DEEP_LINKS
							)
						}
						onClick={openCreateEditDeepLinkDialog}>
						<Edit fontSize="small" />
					</IconButton>
					{openCreateEdit && (
						<DialogCreateEditDeepLink
							deepLink={deepLink}
							type={DeepLinkCreateEditTypeEnum.EDIT}
							open={openCreateEdit}
							setOpen={setOpenCreateEdit}
						/>
					)}

					<IconButton
						color="error"
						disabled={
							!validateScope(
								auth.user?.scope,
								AuthScopeTypeEnum.WRITE,
								AppConfigService.AppRoutes.SCREENS.SETTINGS.DEEP_LINKS
							)
						}
						onClick={openDeleteDeepLinkDialog}>
						<DeleteOutline fontSize="small" />
					</IconButton>
					{openDelete && (
						<DialogDeleteDeepLink
							deepLink={deepLink}
							open={openDelete}
							setOpen={setOpenDelete}
						/>
					)}
				</Box>
			);
		} else {
			const value = deepLink[column.id];
			if (DeepLinksTableColumnsTypeEnum.CREATED === column.id) {
				return dateFormat1(value);
			} else if (DeepLinksTableColumnsTypeEnum.DESCRIPTION === column.id) {
				return <ReadMore text={String(value)} variant="body2" />;
			}
			return value || AppConfigService.AppOptions.common.none;
		}
	};

	return (
		<TableCell key={column.id} align={column.align}>
			<>{setCellValue(deepLink, column)}</>
		</TableCell>
	);
};
export default DeepLinksTableBodyCell;

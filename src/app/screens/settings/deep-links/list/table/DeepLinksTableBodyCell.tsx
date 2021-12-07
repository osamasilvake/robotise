import { Box, Chip, TableCell } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import ReadMore from '../../../../../components/common/read-more/ReadMore';
import { AppConfigService } from '../../../../../services';
import { authSelector } from '../../../../../slices/authentication/Auth.slice';
import { SDLDataInterface } from '../../../../../slices/settings/deep-links/DeepLinks.interface';
import { momentFormat1 } from '../../../../../utilities/methods/Moment';
import { AuthScopeTypeEnum } from '../../../../authentication/Auth.enum';
import { validateScope } from '../../../../authentication/Auth.scope';
import { DeepLinkCreateEditTypeEnum, DeepLinksTableColumnsTypeEnum } from './DeepLinksTable.enum';
import {
	DeepLinksTableBodyCellInterface,
	DeepLinksTableColumnInterface
} from './DeepLinksTable.interface';
import { DeepLinksTableStyle } from './DeepLinksTable.style';
import DialogCreateEditDeepLink from './DialogCreateEditDeepLink';
import DialogDeleteDeepLink from './DialogDeleteDeepLink';

const DeepLinksTableBodyCell: FC<DeepLinksTableBodyCellInterface> = (props) => {
	const { deepLink, column } = props;
	const { t } = useTranslation('DEEP_LINKS');
	const classes = DeepLinksTableStyle();

	const auth = useSelector(authSelector);

	const [openCreateEdit, setOpenCreateEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	/**
	 * open create/edit deep link dialog
	 * @param event
	 */
	const openCreateEditDeepLinkDialog = (event: MouseEvent<HTMLDivElement>) => {
		// stop propagation
		event.stopPropagation();

		// set create/edit open
		setOpenCreateEdit(true);
	};

	/**
	 * open delete deep link dialog
	 * @param event
	 */
	const openDeleteDeepLinkDialog = (event: MouseEvent<HTMLDivElement>) => {
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
			const translation = 'LIST.TABLE.VALUES';
			return (
				<Box>
					<Chip
						size="small"
						label={t(`${translation}.EDIT`)}
						color="primary"
						variant="outlined"
						clickable
						disabled={
							!validateScope(
								auth.user?.scope,
								AuthScopeTypeEnum.WRITE,
								AppConfigService.AppRoutes.SCREENS.SETTINGS.DEEP_LINKS
							)
						}
						onClick={openCreateEditDeepLinkDialog}
						className={classes.sEditDeepLink}
					/>
					<DialogCreateEditDeepLink
						deepLink={deepLink}
						type={DeepLinkCreateEditTypeEnum.EDIT}
						open={openCreateEdit}
						setOpen={setOpenCreateEdit}
					/>

					<Chip
						style={{
							borderColor: AppConfigService.AppOptions.colors.c12,
							color: AppConfigService.AppOptions.colors.c12
						}}
						size="small"
						label={t(`${translation}.DELETE`)}
						variant="outlined"
						clickable
						disabled={
							!validateScope(
								auth.user?.scope,
								AuthScopeTypeEnum.WRITE,
								AppConfigService.AppRoutes.SCREENS.SETTINGS.DEEP_LINKS
							)
						}
						onClick={openDeleteDeepLinkDialog}
					/>
					<DialogDeleteDeepLink
						deepLink={deepLink}
						open={openDelete}
						setOpen={setOpenDelete}
					/>
				</Box>
			);
		} else {
			const value = deepLink[column.id];
			if (DeepLinksTableColumnsTypeEnum.CREATED === column.id) {
				return momentFormat1(value);
			} else if (DeepLinksTableColumnsTypeEnum.DESCRIPTION === column.id) {
				return <ReadMore text={String(value)} variant="body2" />;
			}
			return value || AppConfigService.AppOptions.common.none;
		}
	};

	return (
		<TableCell key={column.id} align={column.align}>
			{setCellValue(deepLink, column)}
		</TableCell>
	);
};
export default DeepLinksTableBodyCell;

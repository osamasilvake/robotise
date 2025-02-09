import { Check, Close, DeleteOutline, Edit } from '@mui/icons-material';
import { Box, IconButton, TableCell, Typography } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import { AppConfigService } from '../../../../../services';
import { authSelector } from '../../../../../slices/authentication/Auth.slice';
import { SMCDataInterface } from '../../../../../slices/settings/middleware-config/MiddlewareConfig.interface';
import { AuthScopeTypeEnum } from '../../../../authentication/Auth.enum';
import { validateScope } from '../../../../authentication/Auth.scope';
import middlewareConfigRoutes from '../../MiddlewareConfig.routes';
import DialogCreateEditMiddlewareConfig from './DialogCreateEditMiddlewareConfig';
import DialogDeleteMiddlewareConfig from './DialogDeleteMiddlewareConfig';
import {
	MiddlewareConfigCreateEditTypeEnum,
	MiddlewareConfigTableColumnsTypeEnum
} from './MiddlewareConfigTable.enum';
import {
	MiddlewareConfigTableBodyCellInterface,
	MiddlewareConfigTableColumnInterface
} from './MiddlewareConfigTable.interface';

const MiddlewareConfigTableBodyCell: FC<MiddlewareConfigTableBodyCellInterface> = (props) => {
	const { config, column } = props;

	const auth = useSelector(authSelector);

	const [openCreateEdit, setOpenCreateEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	/**
	 * open create/edit middleware config dialog
	 * @param event
	 */
	const openCreateEditMiddlewareConfigDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// set create/edit open
		setOpenCreateEdit(true);
	};

	/**
	 * open delete middleware config dialog
	 * @param event
	 */
	const openDeleteMiddlewareConfigDialog = (event: MouseEvent<HTMLButtonElement>) => {
		// stop propagation
		event.stopPropagation();

		// set delete open
		setOpenDelete(true);
	};

	/**
	 * set cell value
	 * @param middlewareConfig
	 * @param column
	 * @returns
	 */
	const setCellValue = (
		config: SMCDataInterface,
		column: MiddlewareConfigTableColumnInterface
	) => {
		if (column.id === MiddlewareConfigTableColumnsTypeEnum.ACTIONS) {
			return (
				<Box>
					<IconButton
						color="primary"
						disabled={
							!validateScope({
								authScopeType: AuthScopeTypeEnum.WRITE,
								authScope: auth.user?.scope,
								scope: middlewareConfigRoutes[0].scope,
								scopeName: middlewareConfigRoutes[0].scopeName,
								link: AppConfigService.AppRoutes.SCREENS.SETTINGS.MIDDLEWARE_CONFIG
							})
						}
						onClick={openCreateEditMiddlewareConfigDialog}>
						<Edit fontSize="small" />
					</IconButton>
					{openCreateEdit && (
						<DialogCreateEditMiddlewareConfig
							config={config}
							type={MiddlewareConfigCreateEditTypeEnum.EDIT}
							open={openCreateEdit}
							setOpen={setOpenCreateEdit}
						/>
					)}

					<IconButton
						color="error"
						disabled={
							!validateScope({
								authScopeType: AuthScopeTypeEnum.WRITE,
								authScope: auth.user?.scope,
								scope: middlewareConfigRoutes[0].scope,
								scopeName: middlewareConfigRoutes[0].scopeName,
								link: AppConfigService.AppRoutes.SCREENS.SETTINGS.MIDDLEWARE_CONFIG
							})
						}
						onClick={openDeleteMiddlewareConfigDialog}>
						<DeleteOutline fontSize="small" />
					</IconButton>
					{openDelete && (
						<DialogDeleteMiddlewareConfig
							config={config}
							open={openDelete}
							setOpen={setOpenDelete}
						/>
					)}
				</Box>
			);
		} else {
			const value = config[column.id];
			if (
				MiddlewareConfigTableColumnsTypeEnum.AUDIT === column.id ||
				MiddlewareConfigTableColumnsTypeEnum.DEBUG === column.id ||
				MiddlewareConfigTableColumnsTypeEnum.SAVE_HISTORY === column.id ||
				MiddlewareConfigTableColumnsTypeEnum.STOP_PROPAGATE === column.id
			) {
				return (
					<Box>
						{value ? (
							<Check color="secondary" fontSize="small" />
						) : (
							<Close color="error" fontSize="small" />
						)}
					</Box>
				);
			} else if (MiddlewareConfigTableColumnsTypeEnum.KEY === column.id) {
				const key = config.key;
				const prop = config.prop;
				return (
					<Box>
						<Typography variant="body2">
							<>Key: {key}</>
						</Typography>
						<Typography variant="body2">
							<>Prop: {prop}</>
						</Typography>
					</Box>
				);
			}
			return value || AppConfigService.AppOptions.common.none;
		}
	};

	return (
		<TableCell key={column.id} align={column.align}>
			<>{setCellValue(config, column)}</>
		</TableCell>
	);
};
export default MiddlewareConfigTableBodyCell;

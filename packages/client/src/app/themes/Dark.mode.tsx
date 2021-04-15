import { ThemeOptions } from '@material-ui/core';

import { AppConfigService } from '../services';
import { pxToRem } from '../utilities/methods/PixelsToRem';

/**
 * Dark mode
 * @param options
 */
const Dark = (options: ThemeOptions): ThemeOptions => {
	return {
		...options,
		palette: {
			...options.palette,
			mode: 'dark',
			background: {
				default: AppConfigService.AppOptions.colors.c1 // body
			},
			text: {
				primary: AppConfigService.AppOptions.colors.c7,
				secondary: AppConfigService.AppOptions.colors.c7a
			}
		},
		components: {
			...options.components,
			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundColor: AppConfigService.AppOptions.colors.c1
					},
					elevation11: {
						boxShadow: 'none',
						padding: `${pxToRem(15)} ${pxToRem(20)}`,
						transition: 'none'
					},
					elevation12: {
						boxShadow: 'none',
						padding: pxToRem(20),
						transition: 'none'
					}
				}
			},
			MuiAppBar: {
				styleOverrides: {
					root: {
						backgroundColor: AppConfigService.AppOptions.colors.c2,
						boxShadow: 'none'
					}
				}
			},
			MuiDrawer: {
				styleOverrides: {
					...options.components?.MuiDrawer?.styleOverrides,
					paper: {
						background: AppConfigService.AppOptions.colors.c2,
						boxShadow: 'none'
					}
				}
			},
			MuiPopover: {
				styleOverrides: {
					...options.components?.MuiPopover?.styleOverrides,
					paper: {
						...options.components?.MuiPopover?.styleOverrides?.paper,
						backgroundColor: AppConfigService.AppOptions.colors.c2
					}
				}
			},
			MuiTableCell: {
				styleOverrides: {
					root: {
						borderBottom: 'none'
					},
					head: {
						backgroundColor: AppConfigService.AppOptions.colors.c2
					},
					stickyHeader: {
						backgroundColor: AppConfigService.AppOptions.colors.c2
					}
				}
			},
			MuiTableRow: {
				styleOverrides: {
					root: {
						'&.MuiTableRow-hover:hover': {
							backgroundColor: AppConfigService.AppOptions.colors.c2,
							cursor: 'pointer'
						}
					}
				}
			},
			MuiTablePagination: {
				styleOverrides: {
					root: {
						backgroundColor: AppConfigService.AppOptions.colors.c2
					}
				}
			},
			MuiTabs: {
				styleOverrides: {
					...options.components?.MuiTabs?.styleOverrides,
					root: {
						backgroundColor: AppConfigService.AppOptions.colors.c2
					}
				}
			},
			MuiTab: {
				styleOverrides: {
					textColorPrimary: {
						'&.Mui-selected': {
							backgroundColor: AppConfigService.AppOptions.colors.c1,
							borderTop: `${pxToRem(1)} solid ${
								AppConfigService.AppOptions.colors.c9
							}`,
							color: AppConfigService.AppOptions.colors.c9
						}
					}
				}
			},
			MuiListSubheader: {
				styleOverrides: {
					root: {
						backgroundColor: AppConfigService.AppOptions.colors.c2
					}
				}
			},
			MuiCardContent: {
				styleOverrides: {
					...options.components?.MuiCardContent?.styleOverrides,
					root: {
						...options.components?.MuiCardContent?.styleOverrides?.root,
						backgroundColor: AppConfigService.AppOptions.colors.c2
					}
				}
			},
			MuiIconButton: {
				styleOverrides: {
					...options.components?.MuiIconButton?.styleOverrides,
					root: {
						...options.components?.MuiIconButton?.styleOverrides?.root,
						color: AppConfigService.AppOptions.colors.c7
					}
				}
			},
			MuiTooltip: {
				styleOverrides: {
					tooltip: {
						backgroundColor: AppConfigService.AppOptions.colors.c5,
						color: AppConfigService.AppOptions.colors.c8
					}
				}
			},
			MuiOutlinedInput: {
				styleOverrides: {
					...options.components?.MuiOutlinedInput?.styleOverrides,
					input: {
						...options.components?.MuiOutlinedInput?.styleOverrides?.input,
						'&:-webkit-autofill': {
							WebkitBoxShadow: `0 0 0 ${pxToRem(1000)} ${
								AppConfigService.AppOptions.colors.c1
							} inset`,
							'&::first-line': {
								fontSize: pxToRem(16),
								fontFamily: AppConfigService.AppOptions.styles.fontFamily.Roboto
							}
						}
					}
				}
			}
		}
	};
};
export default Dark;

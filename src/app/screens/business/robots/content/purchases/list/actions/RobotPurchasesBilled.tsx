import { Checkbox, FormControlLabel } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RobotPurchasesBilledInterface } from './RobotPurchasesActions.interface';
import { RobotPurchasesActionsStyles } from './RobotPurchasesActions.style';

const RobotPurchasesBilled: FC<RobotPurchasesBilledInterface> = (props) => {
	const { billed, setBilled, setPage } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotPurchasesActionsStyles();

	/**
	 * toggle active orders
	 */
	const toggleBilled = () => {
		// set active orders
		setBilled(!billed);

		// set page
		setPage(0);
	};

	return (
		<FormControlLabel
			className={classes.sBilled}
			control={
				<Checkbox color="primary" name="billed" checked={billed} onChange={toggleBilled} />
			}
			label={t('ROBOTS:CONTENT.PURCHASES.LIST.OPTIONS.BILLED.LABEL')}
		/>
	);
};
export default RobotPurchasesBilled;

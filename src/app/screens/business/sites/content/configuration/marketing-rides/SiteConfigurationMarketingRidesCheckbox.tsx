import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent, FC } from 'react';

import { SiteConfigurationMarketingRidesWeekdaysEnum } from './SiteConfigurationMarketingRides.enum';
import { SiteConfigurationMarketingRidesCheckboxInterface } from './SiteConfigurationMarketingRides.interface';

const SiteConfigurationMarketingRidesCheckbox: FC<
	SiteConfigurationMarketingRidesCheckboxInterface
> = (props) => {
	const { weekdays, handleChangeInputs } = props;

	const allWeekdays = Object.values(SiteConfigurationMarketingRidesWeekdaysEnum);

	/**
	 * on change weekday
	 * @param event
	 */
	const onChangeWeekday = (event: ChangeEvent<HTMLInputElement>) => {
		const { name } = event.target;
		const isExist = weekdays?.includes(name);
		const list = isExist ? weekdays.filter((w) => w !== name) : [...weekdays, name];

		// update list
		handleChangeInputs('weekdays', list);
	};

	return (
		<Box>
			{allWeekdays &&
				allWeekdays.map((weekday) => (
					<FormControlLabel
						key={weekday}
						control={
							<Checkbox
								color="primary"
								name={weekday}
								checked={weekdays.includes(weekday)}
								onChange={onChangeWeekday}
							/>
						}
						label={weekday}
					/>
				))}
		</Box>
	);
};
export default SiteConfigurationMarketingRidesCheckbox;

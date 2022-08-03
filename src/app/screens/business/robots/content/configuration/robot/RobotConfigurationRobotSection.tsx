import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC, Fragment, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { RCCDataElementValueInterface } from '../../../../../../slices/business/robots/configuration/robot-configuration/RobotConfiguration.slice.interface';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { RobotConfigurationRobotElementTypeEnum } from './RobotConfigurationRobot.enum';
import {
	RobotConfigurationRobotFieldsChangesInterface,
	RobotConfigurationRobotFormInterface,
	RobotConfigurationRobotRecursiveOutputInterface,
	RobotConfigurationRobotRenderElementsInterface,
	RobotConfigurationRobotSectionInterface
} from './RobotConfigurationRobot.interface';
import { RobotConfigurationRobotStyle } from './RobotConfigurationRobot.style';
import RobotConfigurationRobotSectionInput from './RobotConfigurationRobotSectionInput';

const RobotConfigurationRobotSection: FC<RobotConfigurationRobotSectionInterface> = (props) => {
	const { section } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotConfigurationRobotStyle();

	const translation = 'CONTENT.CONFIGURATION.ROBOT_CONFIGURATION';
	const sectionName = (section?.sectionName || '').toUpperCase();
	const elements = section?.elements?.value;

	const { handleChangeInput, handleBlur, handleSubmit, values } =
		useForm<RobotConfigurationRobotFormInterface>(
			{},
			() => ({}),
			async () => {
				if (!elements) return;

				// object to array of key/value pairs
				const list = Object.entries(values).map(([key, value]) => ({ key, value }));

				// prepare fields changes
				const changes = fieldsChanges(list);

				// generate recursive output
				const result = recursiveOutput(elements, changes);
				console.log(result);
			}
		);

	/**
	 * prepare fields changes
	 * @param values
	 * @returns
	 */
	const fieldsChanges = (values: RobotConfigurationRobotFieldsChangesInterface[]) =>
		values.reduce((m: any, o: any) => {
			const keys = o.key.replaceAll('-', '-value-').concat('-value').split('-');
			let cur = m;
			keys.forEach((key: string, i: number) => {
				if (i < keys.length - 1) {
					cur[key] = cur[key] || {};
					cur = cur[key];
				} else {
					cur[key] = o.value;
				}
			});
			return m;
		}, {});

	/**
	 * generate recursive output
	 * @param initial
	 * @param update
	 * @returns
	 */
	const recursiveOutput = (
		initial: RobotConfigurationRobotRecursiveOutputInterface,
		update: RobotConfigurationRobotRecursiveOutputInterface
	): RobotConfigurationRobotRecursiveOutputInterface => {
		const result: RobotConfigurationRobotRecursiveOutputInterface = {};
		for (const prop in initial) {
			if ({}.hasOwnProperty.call(initial, prop)) {
				result[prop] = initial[prop];
				if ({}.hasOwnProperty.call(update, prop)) {
					if (typeof initial[prop] === 'object' && typeof update[prop] === 'object') {
						const iObj = initial[prop] as {
							[key: string]: RCCDataElementValueInterface;
						};
						const uObj = update[prop] as {
							[key: string]: RCCDataElementValueInterface;
						};
						result[prop] = recursiveOutput(iObj, uObj) as {
							[key: string]: RCCDataElementValueInterface;
						};
					} else {
						result[prop] = update[prop];
					}
				}
			}
		}
		return result;
	};

	/**
	 * render recursive elements
	 * @param payload
	 * @returns
	 */
	const recursiveElements = (
		payload: RobotConfigurationRobotRenderElementsInterface
	): ReactElement | null => {
		const { parentKey, key, obj, index } = payload;
		const id = parentKey ? `${parentKey}-${key}` : key;

		switch (obj.type.toString()) {
			case RobotConfigurationRobotElementTypeEnum.OBJECT:
				return (
					<Box className={clsx({ [classes.sIntendBox]: index !== undefined })}>
						<Typography
							variant="body2"
							color="textSecondary"
							className={classes.sRecursiveTitle}>
							{key.toUpperCase()}
						</Typography>
						{Object.entries(obj?.value)?.map(([k, v], idx) => (
							<Fragment key={k}>
								{recursiveElements({
									parentKey: id, // keep parent keys
									key: k,
									obj: v,
									index: idx
								})}
							</Fragment>
						))}
					</Box>
				);
			case RobotConfigurationRobotElementTypeEnum.NUMBER:
			case RobotConfigurationRobotElementTypeEnum.STRING:
				return (
					<RobotConfigurationRobotSectionInput
						id={id}
						label={key}
						content={obj}
						value={String(values[id] || obj?.value || obj?.default)}
						handleChangeInput={handleChangeInput}
						handleBlur={handleBlur}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<Card square elevation={1}>
			<CardContent>
				<Typography variant="h6">{sectionName || t(`${translation}.TITLE`)}</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${translation}.EXCERPT`)}
				</Typography>

				<form onSubmit={handleSubmit}>
					{elements &&
						Object.entries(elements)?.map(([key, value]) => (
							<Fragment key={key}>{recursiveElements({ key, obj: value })}</Fragment>
						))}
					<Grid item xs={12} className={classes.sSubmit}>
						<Button variant="outlined" type="submit">
							{t(`${translation}.FORM.BUTTONS.UPDATE`)}
						</Button>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};
export default RobotConfigurationRobotSection;

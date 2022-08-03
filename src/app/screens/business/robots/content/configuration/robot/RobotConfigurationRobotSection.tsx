import { Add } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC, Fragment, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
	RCCDataElementInterface,
	RCCDataElementKeyValueInterface,
	RCCDataElementValueInterface
} from '../../../../../../slices/business/robots/configuration/robot-configuration/RobotConfiguration.slice.interface';
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

	const [elements, setElements] = useState<RCCDataElementValueInterface | undefined>(
		section?.elements?.value
	);

	const translation = 'CONTENT.CONFIGURATION.ROBOT_CONFIGURATION';
	const sectionName = (section?.sectionName || '').toUpperCase();

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
	 * @param newItems
	 * @returns
	 */
	const recursiveOutput = (
		initial: RobotConfigurationRobotRecursiveOutputInterface,
		update: RobotConfigurationRobotRecursiveOutputInterface,
		newItems?: RCCDataElementInterface[]
	): RobotConfigurationRobotRecursiveOutputInterface => {
		const result: RobotConfigurationRobotRecursiveOutputInterface = {};

		for (const prop in initial) {
			if ({}.hasOwnProperty.call(initial, prop)) {
				result[prop] = initial[prop];

				if ({}.hasOwnProperty.call(update, prop)) {
					// Array
					if (Array.isArray(initial[prop])) {
						const iObj = initial[prop] as RCCDataElementValueInterface;
						const uObj = update[prop] as RCCDataElementValueInterface;
						const out = recursiveOutput(iObj, uObj) as RCCDataElementValueInterface;
						result[prop] = newItems ? newItems : Object.values(out);
					}

					// Object
					else if (
						typeof initial[prop] === 'object' &&
						typeof update[prop] === 'object'
					) {
						const iObj = initial[prop] as RCCDataElementValueInterface;
						const uObj = update[prop] as RCCDataElementValueInterface;
						const out = recursiveOutput(
							iObj,
							uObj,
							newItems
						) as RCCDataElementValueInterface;
						result[prop] = out;
					}

					// value
					else {
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
		const { parentKey, key, list, index } = payload;
		const id = parentKey ? `${parentKey}-${key}` : key;

		switch (list.type.toString()) {
			case RobotConfigurationRobotElementTypeEnum.ARRAY:
				return (
					<Box>
						<Typography
							variant="body2"
							color="textSecondary"
							className={classes.sRecursiveTitle}>
							{key.toUpperCase()}
						</Typography>
						{Object.entries(list?.value)?.map(([k, v], idx) => (
							<Fragment key={k}>
								{recursiveElements({
									parentKey: id, // keep parent keys
									key: k,
									list: v,
									index: idx
								})}
							</Fragment>
						))}
						<Chip
							size="small"
							label={t(`${translation}.FORM.FIELD.ADD_MORE`)}
							color="primary"
							variant="outlined"
							icon={<Add />}
							className={classes.sIntendElement}
							onClick={() => onClickAddMore(id, list)}
						/>
					</Box>
				);
			case RobotConfigurationRobotElementTypeEnum.OBJECT:
				return (
					<Box className={clsx({ [classes.sIntendElement]: index !== undefined })}>
						<Typography
							variant="body2"
							color="textSecondary"
							className={classes.sRecursiveTitle}>
							{key.toUpperCase()}
						</Typography>
						{Object.entries(list?.value)?.map(([k, v], idx) => (
							<Fragment key={k}>
								{recursiveElements({
									parentKey: id, // keep parent keys
									key: k,
									list: v,
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
						content={list}
						value={String(values[id] || list?.value || list?.default)}
						handleChangeInput={handleChangeInput}
						handleBlur={handleBlur}
					/>
				);
			default:
				return null;
		}
	};

	/**
	 * add more
	 * @param parentKey
	 * @param items
	 */
	const onClickAddMore = (parentKey: string, items: RCCDataElementKeyValueInterface) => {
		// return
		if (!elements) return;

		// add item
		const values = items.value as RCCDataElementInterface[];
		const newList = [...values, values[values.length - 1]];

		// prepare fields changes
		const list = [{ key: parentKey, value: newList }];

		// prepare fields changes
		const changes = fieldsChanges(list);

		// generate recursive output
		const result = recursiveOutput(elements, changes, newList);

		// set elements
		setElements(result);
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
							<Fragment key={key}>{recursiveElements({ key, list: value })}</Fragment>
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

import { Add } from '@mui/icons-material';
import { Button, Card, CardContent, Chip, CircularProgress, Grid, Typography } from '@mui/material';
import clsx from 'clsx';
import { FC, Fragment, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../slices';
import {
	RobotConfigurationFetch,
	robotConfigurationSelector,
	RobotConfigurationUpdate
} from '../../../../../../slices/business/robots/configuration/robot-configuration/RobotConfiguration.slice';
import { RCCDataElementInterface } from '../../../../../../slices/business/robots/configuration/robot-configuration/RobotConfiguration.slice.interface';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import { strRemoveSymbols } from '../../../../../../utilities/methods/String';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotConfigurationRobotElementTypeEnum } from './RobotConfigurationRobot.enum';
import {
	RobotConfigurationRobotRenderElementsInterface,
	RobotConfigurationRobotSectionInterface
} from './RobotConfigurationRobot.interface';
import { RobotConfigurationRobotStyle } from './RobotConfigurationRobot.style';
import { RobotConfigurationRobotValidation } from './RobotConfigurationRobot.validation';
import RobotConfigurationRobotSectionBoolean from './RobotConfigurationRobotSectionBoolean';
import RobotConfigurationRobotSectionInput from './RobotConfigurationRobotSectionInput';

const RobotConfigurationRobotSection: FC<RobotConfigurationRobotSectionInterface> = (props) => {
	const { section } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotConfigurationRobotStyle();

	const dispatch = useDispatch<AppDispatch>();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robotConfiguration = useSelector(robotConfigurationSelector);

	const [elements, setElements] = useState<RCCDataElementInterface | undefined>(
		section?.elements?.value as RCCDataElementInterface
	);
	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const robotSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const sectionName = (section?.sectionName || '').toUpperCase();
	const translation = 'CONTENT.CONFIGURATION.ROBOT_CONFIGURATION';

	const { handleChangeInput, handleChangeCheckbox, handleBlur, handleSubmit, values, errors } =
		useForm<RCCDataElementInterface>({}, RobotConfigurationRobotValidation, async () => {
			if (!elements) return;
			if (!cRobotId) return;
			if (!section?.id) return;

			// object to array of key/value pairs
			const list = Object.entries(values).map(([key, value]) => ({ key, value }));

			// prepare fields changes
			const changes = fieldsChanges(list);

			// generate recursive output
			const result = recursiveOutput(elements, changes);

			// dispatch: update robot configuration
			dispatch(
				RobotConfigurationUpdate(
					cRobotId,
					section?.id,
					{
						request: {
							name: section.name,
							configType: section.configType,
							sectionName: section.sectionName,
							preset: section.preset,
							elements: { ...section?.elements, value: result }
						}
					},
					() => {
						// dispatch: fetch robot configuration
						dispatch(RobotConfigurationFetch(cRobotId, true));
					}
				)
			);
		});

	/**
	 * prepare fields changes
	 * @param values
	 * @returns
	 */
	const fieldsChanges = (values: RCCDataElementInterface[]) =>
		values.reduce((m, o) => {
			const key = o.key as string;
			const keys = key.replaceAll('-', '-value-').concat('-value').split('-');
			let cur = m as RCCDataElementInterface;
			keys.forEach((key: string, i: number) => {
				if (i < keys.length - 1) {
					cur[key] = cur[key] || {};
					cur = cur[key] as RCCDataElementInterface;
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
		initial: RCCDataElementInterface,
		update: RCCDataElementInterface,
		newItems?: RCCDataElementInterface[]
	): RCCDataElementInterface => {
		const result = { ...initial };

		for (const prop in initial) {
			if ({}.hasOwnProperty.call(initial, prop)) {
				result[prop] = initial[prop];

				if ({}.hasOwnProperty.call(update, prop)) {
					// Array
					if (Array.isArray(initial[prop])) {
						const iObj = initial[prop] as RCCDataElementInterface;
						const uObj = update[prop] as RCCDataElementInterface;
						const out = recursiveOutput(iObj, uObj);
						result[prop] = (
							newItems ? newItems : Object.values(out)
						) as RCCDataElementInterface[];
					}

					// Object
					else if (
						typeof initial[prop] === 'object' &&
						typeof update[prop] === 'object'
					) {
						const iObj = initial[prop] as RCCDataElementInterface;
						const uObj = update[prop] as RCCDataElementInterface;
						const out = recursiveOutput(iObj, uObj, newItems);
						result[prop] = out;
					}

					// value
					else {
						result[prop] =
							initial.type === RobotConfigurationRobotElementTypeEnum.NUMBER
								? +update[prop]
								: update[prop];
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
		const type = list.type.toString();

		switch (type) {
			case RobotConfigurationRobotElementTypeEnum.ARRAY:
				return (
					<Grid container spacing={2} className={classes.sIntentElement}>
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
							label={t(`${translation}.FORM.ADD_MORE`)}
							color="primary"
							variant="outlined"
							icon={<Add />}
							className={clsx(classes.sAddMore)}
							onClick={() => onClickAddMore(id, list)}
						/>
					</Grid>
				);
			case RobotConfigurationRobotElementTypeEnum.OBJECT:
				return (
					<Grid
						container
						className={clsx({ [classes.sIntentElement]: index !== undefined })}>
						<Typography
							variant="body2"
							color="textSecondary"
							className={classes.sRecursiveTitleInner}>
							{key.toUpperCase()}
						</Typography>
						<Grid container spacing={2} className={classes.sIntentElementInner}>
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
						</Grid>
					</Grid>
				);
			case RobotConfigurationRobotElementTypeEnum.NUMBER:
			case RobotConfigurationRobotElementTypeEnum.STRING:
			case RobotConfigurationRobotElementTypeEnum.MULTILINE_STRING:
				return (
					<Grid item xs={12} sm={6} md={6}>
						<RobotConfigurationRobotSectionInput
							multiline={
								type === RobotConfigurationRobotElementTypeEnum.MULTILINE_STRING
							}
							id={id}
							label={key}
							content={list}
							initValue={String(list?.value || list?.default)}
							value={String(values[id])}
							error={errors && errors[id] ? String(errors[id]) : ''}
							handleChangeInput={handleChangeInput}
							handleBlur={handleBlur}
						/>
					</Grid>
				);
			case RobotConfigurationRobotElementTypeEnum.BOOLEAN:
				return (
					<Grid item xs={12}>
						<RobotConfigurationRobotSectionBoolean
							id={id}
							label={key}
							content={list}
							initValue={!!(list?.value || list?.default)}
							value={!!values[id]}
							handleChangeCheckbox={handleChangeCheckbox}
						/>
					</Grid>
				);
			default:
				return null;
		}
	};

	/**
	 * empty item
	 * @param item
	 * @returns
	 */
	const emptyItem = (item: RCCDataElementInterface) => {
		const result = { ...item };
		for (const prop in item) {
			if ({}.hasOwnProperty.call(item, prop)) {
				result[prop] = item[prop];
				if (typeof item[prop] === 'object') {
					result[prop] = emptyItem(item[prop] as RCCDataElementInterface);
				} else {
					if (prop === 'default' || prop === 'value') {
						result[prop] = '';
					}
				}
			}
		}
		return result;
	};

	/**
	 * add more
	 * @param parentKey
	 * @param items
	 */
	const onClickAddMore = (parentKey: string, items: RCCDataElementInterface) => {
		// return
		if (!elements) return;

		// add item
		const values = items.value as RCCDataElementInterface[];
		const value = emptyItem(values[values.length - 1]);
		const newList = [...values, value];

		// prepare fields changes
		const list = [{ key: parentKey, value: newList }];

		// prepare fields changes
		const changes = fieldsChanges(list as RCCDataElementInterface[]);

		// generate recursive output
		const result = recursiveOutput(elements, changes, newList);

		// set elements
		setElements(result);
	};

	return (
		<Card square elevation={1}>
			<CardContent>
				{/* Title */}
				<Typography variant="h6">
					{strRemoveSymbols(sectionName) || t(`${translation}.TITLE`)}
				</Typography>
				<Typography variant="body2" color="textSecondary" className={classes.sExcerpt}>
					{t(`${translation}.EXCERPT`)}
				</Typography>

				{/* Elements */}
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{elements &&
							Object.entries(elements)?.map(([key, value]) => (
								<Fragment key={key}>
									{recursiveElements({
										key,
										list: value as RCCDataElementInterface
									})}
								</Fragment>
							))}
					</Grid>

					<Grid item xs={12} className={classes.sSubmit}>
						<Button
							variant="outlined"
							type="submit"
							disabled={robotConfiguration.updating || !robotSingle?.robotIsReady}
							endIcon={robotConfiguration.updating && <CircularProgress size={20} />}>
							{t(`${translation}.FORM.BUTTONS.UPDATE`)}
						</Button>
						{!robotSingle?.robotIsReady && (
							<Typography
								variant="body2"
								color="textSecondary"
								className={classes.sSubmitNote}>
								{t(`${translation}.FORM.NOTE`)}
							</Typography>
						)}
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
};
export default RobotConfigurationRobotSection;

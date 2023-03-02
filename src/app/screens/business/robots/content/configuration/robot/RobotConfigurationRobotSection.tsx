import { Add, DeleteOutline } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	CircularProgress,
	Grid,
	Stack,
	Typography
} from '@mui/material';
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
} from '../../../../../../slices/business/robots/configuration/robot/RobotConfiguration.slice';
import { RCCDataElementInterface } from '../../../../../../slices/business/robots/configuration/robot/RobotConfiguration.slice.interface';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import {
	strCapitalLetterAndCamelCaseToDash,
	strRemoveSymbols
} from '../../../../../../utilities/methods/String';
import { RobotParamsInterface } from '../../../Robot.interface';
import { RobotConfigurationRobotElementTypeEnum } from './RobotConfigurationRobot.enum';
import {
	RobotConfigurationRobotAddDeleteItemInterface,
	RobotConfigurationRobotRenderElementsInterface,
	RobotConfigurationRobotResultInterface,
	RobotConfigurationRobotSectionInterface
} from './RobotConfigurationRobot.interface';
import { RobotConfigurationRobotStyle } from './RobotConfigurationRobot.style';
import { RobotConfigurationRobotValidation } from './RobotConfigurationRobot.validation';
import RobotConfigurationRobotSectionBoolean from './RobotConfigurationRobotSectionBoolean';
import RobotConfigurationRobotSectionInput from './RobotConfigurationRobotSectionInput';
import RobotConfigurationRobotSectionSelect from './RobotConfigurationRobotSectionSelect';

const RobotConfigurationRobotSection: FC<RobotConfigurationRobotSectionInterface> = (props) => {
	const { section } = props;
	const { t } = useTranslation('ROBOTS');
	const classes = RobotConfigurationRobotStyle();

	const dispatch = useDispatch<AppDispatch>();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const robotConfiguration = useSelector(robotConfigurationSelector);

	const [elements, setElements] = useState<RCCDataElementInterface | RCCDataElementInterface[]>(
		section?.elements?.value as RCCDataElementInterface | RCCDataElementInterface[]
	);
	const params = useParams<keyof RobotParamsInterface>() as RobotParamsInterface;

	const cRobotId = params.robotId;
	const robotSingle = robotTwinsSummary.content?.dataById[cRobotId];
	const sectionName = (section?.sectionName || '').toUpperCase();
	const translation = 'CONTENT.CONFIGURATION.ROBOT';

	const {
		handleChangeSelect,
		handleChangeInput,
		handleChangeCheckbox,
		handleBlur,
		handleSubmit,
		values,
		errors
	} = useForm<RCCDataElementInterface>({}, RobotConfigurationRobotValidation, async () => {
		if (!elements) return;
		if (!cRobotId) return;
		if (!section?.id) return;

		// object to array of key/value pairs
		const list = Object.entries(values).map(([key, value]) => ({ key, value }));

		// prepare fields changes
		const changes = fieldsChanges(list);

		// generate recursive output
		const result = recursiveOutput({
			initial: elements as RCCDataElementInterface,
			update: changes,
			isArray: Array.isArray(elements)
		});

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
	 * @param payload
	 * @returns
	 */
	const recursiveOutput = (
		payload: RobotConfigurationRobotResultInterface
	): RCCDataElementInterface | RCCDataElementInterface[] => {
		const { initial, update, newItems, isArray } = payload;
		const result = { ...initial };

		for (const prop in initial) {
			if ({}.hasOwnProperty.call(initial, prop)) {
				result[prop] = initial[prop];

				if ({}.hasOwnProperty.call(update, prop)) {
					// Array
					if (Array.isArray(initial[prop])) {
						const iObj = initial[prop] as RCCDataElementInterface;
						const uObj = update[prop] as RCCDataElementInterface;
						const out = recursiveOutput({ initial: iObj, update: uObj });
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
						const out = recursiveOutput({
							initial: iObj,
							update: uObj,
							newItems
						});
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

		// prepare output
		const prepare = isArray ? (Object.values(result) as RCCDataElementInterface[]) : result;
		const output: RCCDataElementInterface | RCCDataElementInterface[] = prepare;

		return output;
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
					<Box className={classes.sBlock}>
						<Typography
							variant="body2"
							color="textSecondary"
							className={classes.sTitle}>
							{strCapitalLetterAndCamelCaseToDash(key)}
						</Typography>
						<Grid container spacing={0}>
							{Object.entries(list?.value)?.map(([k, v]) => (
								<Fragment key={k}>
									{recursiveElements({
										parentKey: id, // keep parent keys
										key: k,
										list: v
									})}
								</Fragment>
							))}
						</Grid>
						<Stack
							spacing={1}
							direction="row"
							alignItems="center"
							className={classes.sAction}>
							<Chip
								size="small"
								label={t(`${translation}.FORM.ADD_MORE`)}
								color="primary"
								variant="outlined"
								icon={<Add />}
								onClick={() => onClickAddDelete({ parentKey: id, items: list })}
							/>
							{(list.value as RCCDataElementInterface[])?.length > 1 && (
								<Chip
									size="small"
									label={t(`${translation}.FORM.DELETE`)}
									color="error"
									variant="outlined"
									icon={<DeleteOutline />}
									onClick={() =>
										onClickAddDelete({
											parentKey: id,
											items: list,
											isDelete: true
										})
									}
								/>
							)}
						</Stack>
					</Box>
				);
			case RobotConfigurationRobotElementTypeEnum.OBJECT:
				return (
					<Box className={classes.sBlock}>
						<Typography
							variant="body2"
							color="textSecondary"
							className={classes.sTitle}>
							{strCapitalLetterAndCamelCaseToDash(key)}
						</Typography>
						<Grid container spacing={0}>
							{Object.entries(list?.value)?.map(([k, v], i) => (
								<Fragment key={k}>
									{recursiveElements({
										parentKey: id, // keep parent keys
										key: k,
										list: v,
										index: i
									})}
								</Fragment>
							))}
						</Grid>
					</Box>
				);
			case RobotConfigurationRobotElementTypeEnum.SELECT:
				return (
					<Grid
						item
						xs={12}
						sm={6}
						md={6}
						sx={{
							pr: +(index || 0) % 2 === 0 ? 0.5 : 0,
							pl: +(index || 0) % 2 !== 0 ? 0.5 : 0
						}}>
						<RobotConfigurationRobotSectionSelect
							id={id}
							label={key}
							content={list}
							initValue={String(list?.value?.toString() || list?.default)}
							value={String(values[id])}
							handleChangeSelect={handleChangeSelect}
							choices={list?.choices as string[]}
						/>
					</Grid>
				);
			case RobotConfigurationRobotElementTypeEnum.NUMBER:
			case RobotConfigurationRobotElementTypeEnum.STRING:
			case RobotConfigurationRobotElementTypeEnum.MULTILINE_STRING:
				console.log(index);
				return (
					<Grid
						item
						xs={12}
						sm={6}
						md={6}
						sx={{
							pr: +(index || 0) % 2 === 0 ? 0.5 : 0,
							pl: +(index || 0) % 2 !== 0 ? 0.5 : 0
						}}>
						<RobotConfigurationRobotSectionInput
							multiline={
								type === RobotConfigurationRobotElementTypeEnum.MULTILINE_STRING
							}
							id={id}
							label={key}
							content={list}
							initValue={String(list?.value?.toString() || list?.default)}
							value={String(values[id])}
							error={errors && errors[id] ? String(errors[id]) : ''}
							handleChangeInput={handleChangeInput}
							handleBlur={handleBlur}
						/>
					</Grid>
				);
			case RobotConfigurationRobotElementTypeEnum.BOOLEAN:
				return (
					<Box className={classes.sBlock}>
						<RobotConfigurationRobotSectionBoolean
							id={id}
							label={key}
							content={list}
							initValue={!!list?.value}
							value={!!values[id]}
							handleChangeCheckbox={handleChangeCheckbox}
						/>
					</Box>
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
						result[prop] = item['default'];
					}
				}
			}
		}
		return result;
	};

	/**
	 * add/delete item
	 * @param payload
	 */
	const onClickAddDelete = (payload: RobotConfigurationRobotAddDeleteItemInterface) => {
		// return
		if (!elements) return;

		const { parentKey, items, isDelete, isRoot } = payload;
		const itemsObj = items as RCCDataElementInterface;
		const values = (isRoot ? elements : itemsObj.value) as RCCDataElementInterface[];
		const value = emptyItem(values[values.length - 1]);
		const newList = isDelete ? [...values.slice(0, -1)] : [...values, value];

		if (isRoot) {
			// set elements
			setElements(isDelete ? values.slice(0, -1) : [...values, value]);
		} else {
			// prepare fields changes
			const list = [{ key: parentKey || '', value: newList }];

			// prepare fields changes
			const changes = fieldsChanges(list);

			// generate recursive output
			const result = recursiveOutput({
				initial: elements as RCCDataElementInterface,
				update: changes,
				newItems: newList,
				isArray: Array.isArray(elements)
			}) as RCCDataElementInterface;

			// set elements
			setElements(result);
		}
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
					<Grid container spacing={0}>
						{/* Elements Root */}
						{elements &&
							Object.entries(elements)?.map(([key, value]) => (
								<Fragment key={key}>
									{recursiveElements({
										key,
										list: value as RCCDataElementInterface
									})}
								</Fragment>
							))}

						<Stack
							spacing={1}
							direction="row"
							alignItems="center"
							className={classes.sAction}>
							{/* Add */}
							{elements && Array.isArray(elements) && (
								<Chip
									size="small"
									label={t(`${translation}.FORM.ADD_MORE`)}
									color="primary"
									variant="outlined"
									icon={<Add />}
									onClick={() =>
										onClickAddDelete({
											items: elements,
											isRoot: true
										})
									}
								/>
							)}

							{/* Delete */}
							{elements && Array.isArray(elements) && (
								<Chip
									size="small"
									label={t(`${translation}.FORM.DELETE`)}
									color="error"
									variant="outlined"
									icon={<DeleteOutline />}
									onClick={() =>
										onClickAddDelete({
											items: elements,
											isDelete: true,
											isRoot: true
										})
									}
								/>
							)}
						</Stack>
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

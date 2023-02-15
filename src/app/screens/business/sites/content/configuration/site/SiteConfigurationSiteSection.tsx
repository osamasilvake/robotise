import { Add, DeleteOutline } from '@mui/icons-material';
import {
	Button,
	Card,
	CardContent,
	Chip,
	CircularProgress,
	Grid,
	Stack,
	Typography
} from '@mui/material';
import clsx from 'clsx';
import { FC, Fragment, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../../../../slices';
import { robotTwinsSummarySelector } from '../../../../../../slices/business/robots/RobotTwinsSummary.slice';
import {
	SiteConfigurationFetch,
	siteConfigurationSelector,
	SiteConfigurationUpdate
} from '../../../../../../slices/business/sites/configuration/site/SiteConfiguration.slice';
import { SCCDataElementInterface } from '../../../../../../slices/business/sites/configuration/site/SiteConfiguration.slice.interface';
import { useForm } from '../../../../../../utilities/hooks/form/UseForm';
import {
	strCapitalLetterAndCamelCaseToDash,
	strRemoveSymbols
} from '../../../../../../utilities/methods/String';
import { SiteParamsInterface } from '../../../Site.interface';
import DialogSiteConfigurationSyncRobot from './DialogSiteConfigurationSyncRobot';
import { SiteConfigurationSiteElementTypeEnum } from './SiteConfigurationSite.enum';
import {
	SiteConfigurationSiteAddDeleteItemInterface,
	SiteConfigurationSiteRenderElementsInterface,
	SiteConfigurationSiteResultInterface,
	SiteConfigurationSiteSectionInterface
} from './SiteConfigurationSite.interface';
import { SiteConfigurationSiteStyle } from './SiteConfigurationSite.style';
import { SiteConfigurationSiteValidation } from './SiteConfigurationSite.validation';
import SiteConfigurationSiteSectionBoolean from './SiteConfigurationSiteSectionBoolean';
import SiteConfigurationSiteSectionInput from './SiteConfigurationSiteSectionInput';
import SiteConfigurationSiteSectionSelect from './SiteConfigurationSiteSectionSelect';

const SiteConfigurationSiteSection: FC<SiteConfigurationSiteSectionInterface> = (props) => {
	const { section } = props;
	const { t } = useTranslation('SITES');
	const classes = SiteConfigurationSiteStyle();

	const dispatch = useDispatch<AppDispatch>();
	const robotTwinsSummary = useSelector(robotTwinsSummarySelector);
	const siteConfiguration = useSelector(siteConfigurationSelector);

	const [elements, setElements] = useState<SCCDataElementInterface | SCCDataElementInterface[]>(
		section?.elements?.value as SCCDataElementInterface | SCCDataElementInterface[]
	);
	const [open, setOpen] = useState<SCCDataElementInterface | SCCDataElementInterface[] | null>(
		null
	);
	const params = useParams<keyof SiteParamsInterface>() as SiteParamsInterface;

	const cSiteId = params.siteId;
	const sectionName = (section?.sectionName || '').toUpperCase();
	const robotsList = robotTwinsSummary?.content?.data?.filter((r) => r.siteId === cSiteId);
	const isRobotsEmpty = robotsList && robotsList.length === 0;
	const isOneRobot = robotsList && robotsList.length === 1;
	const isMoreRobots = robotsList && robotsList.length > 1;
	const translation = 'CONTENT.CONFIGURATION.SITE';

	const {
		handleChangeSelect,
		handleChangeInput,
		handleChangeCheckbox,
		handleBlur,
		handleSubmit,
		values,
		errors
	} = useForm<SCCDataElementInterface>({}, SiteConfigurationSiteValidation, async () => {
		if (!elements) return;
		if (!cSiteId) return;
		if (!section?.id) return;

		// object to array of key/value pairs
		const list = Object.entries(values).map(([key, value]) => ({ key, value }));

		// prepare fields changes
		const changes = fieldsChanges(list);

		// generate recursive output
		const result = recursiveOutput({
			initial: elements as SCCDataElementInterface,
			update: changes,
			isArray: Array.isArray(elements)
		});

		if (isOneRobot) {
			// dispatch: update site configuration
			dispatch(
				SiteConfigurationUpdate(
					cSiteId,
					section?.id,
					{
						request: {
							name: section.name,
							configType: section.configType,
							sectionName: section.sectionName,
							preset: section.preset,
							elements: { ...section?.elements, value: result },
							siteRobotsToSync: [robotsList[0].robotId]
						}
					},
					() => {
						// dispatch: fetch site configuration
						dispatch(SiteConfigurationFetch(cSiteId, true));
					}
				)
			);
		} else {
			setOpen(result);
		}
	});

	/**
	 * prepare fields changes
	 * @param values
	 * @returns
	 */
	const fieldsChanges = (values: SCCDataElementInterface[]) =>
		values.reduce((m, o) => {
			const key = o.key as string;
			const keys = key.replaceAll('-', '-value-').concat('-value').split('-');
			let cur = m as SCCDataElementInterface;
			keys.forEach((key: string, i: number) => {
				if (i < keys.length - 1) {
					cur[key] = cur[key] || {};
					cur = cur[key] as SCCDataElementInterface;
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
		payload: SiteConfigurationSiteResultInterface
	): SCCDataElementInterface | SCCDataElementInterface[] => {
		const { initial, update, newItems, isArray } = payload;
		const result = { ...initial };

		for (const prop in initial) {
			if ({}.hasOwnProperty.call(initial, prop)) {
				result[prop] = initial[prop];

				if ({}.hasOwnProperty.call(update, prop)) {
					// Array
					if (Array.isArray(initial[prop])) {
						const iObj = initial[prop] as SCCDataElementInterface;
						const uObj = update[prop] as SCCDataElementInterface;
						const out = recursiveOutput({ initial: iObj, update: uObj });
						result[prop] = (
							newItems ? newItems : Object.values(out)
						) as SCCDataElementInterface[];
					}

					// Object
					else if (
						typeof initial[prop] === 'object' &&
						typeof update[prop] === 'object'
					) {
						const iObj = initial[prop] as SCCDataElementInterface;
						const uObj = update[prop] as SCCDataElementInterface;
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
							initial.type === SiteConfigurationSiteElementTypeEnum.NUMBER
								? +update[prop]
								: update[prop];
					}
				}
			}
		}

		// prepare output
		const prepare = isArray ? (Object.values(result) as SCCDataElementInterface[]) : result;
		const output: SCCDataElementInterface | SCCDataElementInterface[] = prepare;

		return output;
	};

	/**
	 * render recursive elements
	 * @param payload
	 * @returns
	 */
	const recursiveElements = (
		payload: SiteConfigurationSiteRenderElementsInterface
	): ReactElement | null => {
		const { parentKey, key, list, index } = payload;
		const id = parentKey ? `${parentKey}-${key}` : key;
		const type = list.type.toString();

		switch (type) {
			case SiteConfigurationSiteElementTypeEnum.ARRAY:
				return (
					<Grid container spacing={2} className={classes.sIntentElement}>
						<Typography
							variant="body2"
							color="textSecondary"
							className={classes.sRecursiveTitle}>
							{strCapitalLetterAndCamelCaseToDash(key)}
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
						<Stack
							spacing={0.5}
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
							{(list.value as SCCDataElementInterface[])?.length > 1 && (
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
					</Grid>
				);
			case SiteConfigurationSiteElementTypeEnum.OBJECT:
				return (
					<Grid
						container
						className={clsx({ [classes.sIntentElement]: index !== undefined })}>
						<Typography
							variant="body2"
							color="textSecondary"
							className={classes.sRecursiveTitleInner}>
							{strCapitalLetterAndCamelCaseToDash(key)}
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
			case SiteConfigurationSiteElementTypeEnum.SELECT:
				return (
					<Grid item xs={12} sm={6} md={6}>
						<SiteConfigurationSiteSectionSelect
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
			case SiteConfigurationSiteElementTypeEnum.NUMBER:
			case SiteConfigurationSiteElementTypeEnum.STRING:
			case SiteConfigurationSiteElementTypeEnum.MULTILINE_STRING:
				return (
					<Grid item xs={12} sm={6} md={6}>
						<SiteConfigurationSiteSectionInput
							multiline={
								type === SiteConfigurationSiteElementTypeEnum.MULTILINE_STRING
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
			case SiteConfigurationSiteElementTypeEnum.BOOLEAN:
				return (
					<Grid item xs={12}>
						<SiteConfigurationSiteSectionBoolean
							id={id}
							label={key}
							content={list}
							initValue={!!list?.value}
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
	const emptyItem = (item: SCCDataElementInterface) => {
		const result = { ...item };
		for (const prop in item) {
			if ({}.hasOwnProperty.call(item, prop)) {
				result[prop] = item[prop];
				if (typeof item[prop] === 'object') {
					result[prop] = emptyItem(item[prop] as SCCDataElementInterface);
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
	const onClickAddDelete = (payload: SiteConfigurationSiteAddDeleteItemInterface) => {
		// return
		if (!elements) return;

		const { parentKey, items, isDelete, isRoot } = payload;
		const itemsObj = items as SCCDataElementInterface;
		const values = (isRoot ? elements : itemsObj.value) as SCCDataElementInterface[];
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
				initial: elements as SCCDataElementInterface,
				update: changes,
				newItems: newList,
				isArray: Array.isArray(elements)
			}) as SCCDataElementInterface;

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
					<Grid container spacing={2}>
						{/* Elements Root */}
						{elements &&
							Object.entries(elements)?.map(([key, value]) => (
								<Fragment key={key}>
									{recursiveElements({
										key,
										list: value as SCCDataElementInterface
									})}
								</Fragment>
							))}

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
					</Grid>

					<Grid item xs={12} className={classes.sSubmit}>
						<Button
							variant="outlined"
							type="submit"
							disabled={siteConfiguration.updating || !robotTwinsSummary?.content}
							endIcon={siteConfiguration.updating && <CircularProgress size={20} />}>
							{t(`${translation}.FORM.BUTTONS.UPDATE`)}
						</Button>
						{isRobotsEmpty && (
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

			{/* Choose Robot to Sync */}
			{!!open && isMoreRobots && (
				<DialogSiteConfigurationSyncRobot
					open={open}
					setOpen={setOpen}
					section={section}
					robotsList={robotsList}
					cSiteId={cSiteId}
				/>
			)}
		</Card>
	);
};
export default SiteConfigurationSiteSection;

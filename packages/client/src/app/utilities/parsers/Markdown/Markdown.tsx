import {
	Link,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	TypographyProps
} from '@material-ui/core';
import React, { FC } from 'react';

import { markdownStyles } from './Markdown.styles';

/**
 * heading
 * @param props
 */
const MarkdownHeading: FC<{ level: number }> = (props) => {
	const { level, children } = props;
	const markdownClasses = markdownStyles();

	let component: TypographyProps['variant'];
	let variant: TypographyProps['variant'];
	switch (level) {
		case 1:
			component = 'h1';
			variant = 'h5';
			break;
		case 2:
			component = 'h2';
			variant = 'h6';
			break;
		case 3:
			component = 'h3';
			variant = 'h6';
			break;
		case 4:
			component = 'h4';
			variant = 'h6';
			break;
		case 5:
			component = 'h5';
			variant = 'h6';
			break;
		default:
			component = 'h6';
			variant = 'h6';
			break;
	}
	return (
		<Typography
			className={markdownClasses.markdownHeader}
			gutterBottom
			component={component}
			variant={variant}>
			{children}
		</Typography>
	);
};

/**
 * paragraph
 * @param props
 */
const MarkdownParagraph: FC = (props) => {
	const { children } = props;

	return <Typography>{children}</Typography>;
};

/**
 * list item
 * @param props
 */
const MarkdownListItem: FC = (props) => {
	const markdownClasses = markdownStyles();

	return (
		<li className={markdownClasses.markdownListItem}>
			<Typography component="span">{props.children}</Typography>
		</li>
	);
};

/**
 * table
 * @param props
 */
const MarkdownTable: FC = (props) => {
	return (
		<Paper>
			<Table size="small" aria-label="a dense table">
				{props.children}
			</Table>
		</Paper>
	);
};

/**
 * table head
 * @param props
 */
const MarkdownTableHead: FC = (props) => {
	return <TableHead>{props.children}</TableHead>;
};

/**
 * table body
 * @param props
 */
const MarkdownTableBody: FC = (props) => {
	return <TableBody>{props.children}</TableBody>;
};

/**
 * table cell
 * @param props
 */
const MarkdownTableCell: FC = (props) => {
	return (
		<TableCell>
			<Typography>{props.children}</Typography>
		</TableCell>
	);
};

/**
 * table row
 * @param props
 */
const MarkdownTableRow: FC = (props) => {
	return <TableRow>{props.children}</TableRow>;
};

export const MarkdownRenderers = {
	heading: MarkdownHeading,
	paragraph: MarkdownParagraph,
	link: Link,
	listItem: MarkdownListItem,
	table: MarkdownTable,
	tableHead: MarkdownTableHead,
	tableBody: MarkdownTableBody,
	tableRow: MarkdownTableRow,
	tableCell: MarkdownTableCell
};

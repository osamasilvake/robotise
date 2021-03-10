import { Link, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import clsx from 'clsx';
import React, { FC } from 'react';

import { MarkdownHeadingInterface } from './Markdown.interface';
import { markdownStyles } from './Markdown.styles';

/**
 * heading
 * @param props
 */
const MarkdownHeading: FC<MarkdownHeadingInterface> = (props) => {
	const { level, children } = props;
	const markdownClasses = markdownStyles();

	let component: Variant;
	let variant: Variant;
	switch (level) {
		case 1:
			component = 'h1';
			variant = 'h4';
			break;
		case 2:
			component = 'h2';
			variant = 'h5';
			break;
		case 3:
		case 4:
		case 5:
			component = `h${level}` as const;
			variant = 'h6';
			break;
		default:
			component = 'h6';
			variant = 'h6';
			break;
	}
	return (
		<>
			<Typography
				component={component}
				variant={variant}
				className={clsx(
					markdownClasses.markdownHeading,
					`${markdownClasses.markdownHeading}${component}`
				)}>
				{children}
			</Typography>
		</>
	);
};

/**
 * paragraph
 * @param props
 */
const MarkdownParagraph: FC = (props) => {
	const { children } = props;
	const markdownClasses = markdownStyles();

	return (
		<Typography variant="body1" className={markdownClasses.MarkdownParagraph}>
			{children}
		</Typography>
	);
};

/**
 * list
 * @param props
 */
const MarkdownList: FC = (props) => {
	const markdownClasses = markdownStyles();
	return <ul className={markdownClasses.markdownList}>{props.children}</ul>;
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

export const MarkdownRenderers = {
	heading: MarkdownHeading,
	paragraph: MarkdownParagraph,
	link: Link,
	list: MarkdownList,
	listItem: MarkdownListItem
};

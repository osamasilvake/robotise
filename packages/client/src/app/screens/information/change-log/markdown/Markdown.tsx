import { Link, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import clsx from 'clsx';
import { FC } from 'react';

import { MarkdownHeadingInterface } from './Markdown.interface';
import { markdownStyles } from './Markdown.style';

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
			variant = 'h1';
			break;
		case 2:
			component = 'h2';
			variant = 'h6';
			break;
		case 3:
			component = 'h3';
			variant = 'body1';
			break;
		case 4:
			component = 'h4';
			variant = 'body1';
			break;
		case 5:
			component = 'h5';
			variant = 'body1';
			break;
		case 6:
		default:
			component = `h6`;
			variant = 'body1';
			break;
	}

	// classes conditions
	const condition1 = /[h][1]/g.test(component);
	const condition2 = /[h][2]/g.test(component);

	return children && children[0] && children[0].props.value !== 'Change Log' ? (
		<Typography
			component={component}
			variant={variant}
			className={clsx({
				[markdownClasses.sHeadingH1]: condition1,
				[markdownClasses.sHeadingH2]: condition2,
				[markdownClasses.sCommon]: !condition1 && !condition2
			})}>
			{children}
		</Typography>
	) : null;
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
	return <ul className={markdownClasses.sList}>{props.children}</ul>;
};

/**
 * list item
 * @param props
 */
const MarkdownListItem: FC = (props) => {
	const markdownClasses = markdownStyles();
	return (
		<li className={markdownClasses.sListItem}>
			<Typography variant="body1">{props.children}</Typography>
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

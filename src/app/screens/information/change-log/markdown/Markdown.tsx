import { Link, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import clsx from 'clsx';
import { FC } from 'react';

import { MarkdownHeadingInterface } from './Markdown.interface';
import { MarkdownStyles } from './Markdown.style';

/**
 * heading
 * @param props
 */
const MarkdownHeading: FC = (props) => {
	const { level, children } = props as MarkdownHeadingInterface;
	const classes = MarkdownStyles();

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
	const condition3 = /[h][3]/g.test(component);

	return children && children[0] !== 'Changelog' ? (
		<Typography
			component={component}
			variant={variant}
			className={clsx({
				[classes.sHeadingH1]: condition1,
				[classes.sHeadingH2]: condition2,
				[classes.sHeadingH3]: condition3,
				[classes.sCommon]: !condition1 && !condition2 && !condition3
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
	const classes = MarkdownStyles();

	return (
		<Typography variant="body1" className={classes.MarkdownParagraph}>
			{children}
		</Typography>
	);
};

/**
 * list
 * @param props
 */
const MarkdownList: FC = (props) => {
	const classes = MarkdownStyles();

	return (
		<Typography component="ul" className={classes.sList}>
			{props.children}
		</Typography>
	);
};

/**
 * list item
 * @param props
 */
const MarkdownListItem: FC = (props) => {
	const classes = MarkdownStyles();

	return (
		<Typography component="li" className={classes.sListItem}>
			<Typography variant="body1">{props.children}</Typography>
		</Typography>
	);
};

export const MarkdownRenderers = {
	h1: MarkdownHeading,
	h2: MarkdownHeading,
	h3: MarkdownHeading,
	h4: MarkdownHeading,
	h5: MarkdownHeading,
	h6: MarkdownHeading,
	p: MarkdownParagraph,
	a: Link,
	ul: MarkdownList,
	li: MarkdownListItem
};

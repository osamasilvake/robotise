export interface MarkdownHeadingInterface {
	level: number;
	children: MarkdownChildrenInterface[];
}

export interface MarkdownChildrenInterface {
	props: MarkdownChildrenPropsInterface;
}

export interface MarkdownChildrenPropsInterface {
	value: string;
}

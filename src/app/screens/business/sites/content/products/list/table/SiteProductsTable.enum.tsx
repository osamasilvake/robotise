export enum SiteProductsTableColumnsTypeEnum {
	ID = 'ID',
	IMAGE = 'image',
	NAME = 'name',
	CATEGORY = 'category',
	PRICE = 'price',
	LENGTH = 'length',
	SIZE = 'volume',
	WEIGHT = 'weight',
	UPDATED = 'updatedAt',
	ACTIONS = 'actions'
}

export enum SiteProductsTableSortTypeEnum {
	DATE,
	STRING,
	NUMBER
}

export enum SiteProductCreateEditTypeEnum {
	CREATE,
	EDIT
}

export enum SiteProductCreateEditLengthValidationTypeEnum {
	MIN = 29,
	MAX = 280
}

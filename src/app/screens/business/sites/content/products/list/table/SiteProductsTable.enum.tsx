export enum SiteProductsTableColumnsTypeEnum {
	IMAGE = 'image',
	NAME = 'name',
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

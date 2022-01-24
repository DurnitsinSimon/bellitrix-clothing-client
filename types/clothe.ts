export interface Clothe {
	_id: string;

	name: string;

	price: number;

	description: string;

	oneSize: boolean;

	soldOut?: boolean;

	src?: string;

	sizes?: string;
}

export interface CreateClothe {
	name: string;

	price: number;

	description: string;

	oneSize: boolean;

	sizes?: string;
}

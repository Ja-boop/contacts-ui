interface IContact {
	id: number;
	name: string;
	user_id: string;
	title: string;
	address: string;
	email: string;
	phone: string;
	image_path: string;
	created_at: Date;
	updated_at: Date;
}

export type { IContact };

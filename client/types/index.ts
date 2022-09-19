// interface matching the mongodb schema
export interface IDocument {
	id: string;
	createdAt: string;
	updatedAt: string;

	uid: string;
	name: string;
	description: string;
	originalname: string;
	mimetype: string;
	filename: string;
	path: string;
	size: number;
}

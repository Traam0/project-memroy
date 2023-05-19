declare interface User {
	_id: string;
	firstName: string;
	lastName: string;
	birthDate?: string;
	email: string;
	password: string;
	engram_id: string;
	createdAt: string;
	updatedAt: string;
	image: string;
	__v: string;
}

declare interface SessionObject {
	id: string;
	email: string;
}

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
	__v: number;
}

declare interface DashBoard {
	engram: Engram;
	fragmetsCount: number;
	latestFragments: [Fragment, Fragment, Fragment];
	gallery: {
		images: Exhibit[];
		tags: string[];
		categories: string[];
	};
}

declare interface Engram {
	_id: string;
	description: string;
	public: boolean;
	secret?: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

declare interface Exhibit {
	_id: string;
	engram_id: string;
	title?: string;
	description?: string;
	category: string;
	tags: string[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}

declare interface Fragment {}

declare interface SessionObject {
	id: string;
	email: string;
}

export type { SessionObject, User, DashBoard, Exhibit, Fragment, Engram };

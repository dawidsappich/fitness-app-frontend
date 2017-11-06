export interface User {
	id?: string;
	email: string,
	password: string
}

export interface Member {
	id: string,
	email: string,
	isAuthenticated: boolean
}
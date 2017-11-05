import { User } from "./user";

export interface Response {
	success: boolean,
	message: any,
	token?: string,
	user?: User
}
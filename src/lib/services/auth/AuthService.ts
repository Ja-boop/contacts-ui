import RequestService from '../RequestService';
import type { IUser } from './interfaces/IUser';

class AuthService {
	private requestService: RequestService;
	private serverUrl: string;
	constructor() {
		this.requestService = new RequestService();
		this.serverUrl = `${import.meta.env.VITE_SERVER_URL}`;
	}

	public async login(formData: FormData) {
		await this.requestService.get(`${this.serverUrl}/sanctum/csrf-cookie`);
		return await this.requestService.post(`${this.serverUrl}/api/login`, formData);
	}

	public async logout() {
		return await this.requestService.post(`${this.serverUrl}/api/logout`);
	}

	public async getUser(): Promise<IUser> {
		const response = await this.requestService.get(`${this.serverUrl}/api/user`);
		return response.data;
	}
}

export default AuthService;

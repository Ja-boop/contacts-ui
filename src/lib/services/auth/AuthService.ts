import RequestService from '../RequestService';

class AuthService {
	private requestService: RequestService;
	private serverUrl: string;
	constructor(
		private _fetch: typeof fetch,
		_token?: string
	) {
		this.requestService = new RequestService(this._fetch, _token || '');
		this.serverUrl = `${import.meta.env.VITE_SERVER_URL}`;
	}

	public async initCSRFToken() {
		return await this._fetch(`${this.serverUrl}/sanctum/csrf-cookie`, {
			credentials: 'include'
		});
	}

	public async login(formData: FormData) {
		const parsedFormData = JSON.stringify(Object.fromEntries(formData));
		return await this.requestService.post(`${this.serverUrl}/api/login`, parsedFormData, {
			'Content-Type': 'application/json'
		});
	}

	public async logout() {
		return await this.requestService.post(`${this.serverUrl}/api/logout`, undefined, {
			'Content-Type': 'application/json'
		});
	}

	public async getUser() {
		return this.requestService.get(`${this.serverUrl}/api/user`);
	}
}

export default AuthService;

import RequestService from '../RequestService';
import type { IContact } from './interfaces/IContact';

class ContactService {
	private serverUrl: string;
	private requestService: RequestService;
	public static imageUrl = `${import.meta.env.VITE_SERVER_URL}/storage`;
	constructor(
		private _fetch: typeof fetch,
		_token?: string
	) {
		this.requestService = new RequestService(this._fetch, _token || '');
		this.serverUrl = `${import.meta.env.VITE_SERVER_URL}/api/contact`;
	}

	public async getAllByUser(): Promise<IContact[]> {
		const response = await this.requestService.get(`${this.serverUrl}`);
		return response.json();
	}

	public async getBy(id: string): Promise<IContact> {
		const response = await this.requestService.get(`${this.serverUrl}/${id}`);
		return response.json();
	}

	public async create(body: FormData): Promise<IContact> {
		const response = await this.requestService.post(`${this.serverUrl}`, body);
		return response.json();
	}

	public async update(id: string, body: FormData): Promise<IContact> {
		body.append('_method', 'PUT');
		const response = await this.requestService.post(`${this.serverUrl}/${id}`, body);
		return response.json();
	}
}

export default ContactService;

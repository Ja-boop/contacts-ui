import type { IContact } from './interfaces/IContact';

class ContactService {
	private serverUrl: string;
	public static imageUrl = `${import.meta.env.VITE_SERVER_URL}/storage`;
	constructor(private serverFetch: typeof fetch) {
		this.serverUrl = `${import.meta.env.VITE_SERVER_URL}/api/contact`;
	}

	public async getAllByUser(): Promise<IContact[]> {
		const response = await this.serverFetch(`${this.serverUrl}`);
		return response.json();
	}

	public async getBy(id: string): Promise<IContact> {
		const response = await this.serverFetch(`${this.serverUrl}/${id}`);
		return response.json();
	}

	public async create(body: FormData, cookie: string): Promise<IContact> {
		const response = await this.serverFetch(`${this.serverUrl}`, {
			method: 'POST',
			headers: {
				'X-XSRF-TOKEN': cookie,
				Accept: 'application/json'
			},
			body
		});

		return response.json();
	}

	public async update(id: string, body: FormData, cookie: string): Promise<IContact> {
		body.append('_method', 'PUT');

		const response = await this.serverFetch(`${this.serverUrl}/${id}`, {
			method: 'POST',
			headers: {
				'X-XSRF-TOKEN': cookie,
				Accept: 'application/json'
			},
			body
		});

		return response.json();
	}
}

export default ContactService;

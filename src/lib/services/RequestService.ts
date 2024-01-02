type Methods = 'GET' | 'POST';

class RequestService {
	constructor(
		private _fetch: typeof fetch,
		private _token: string
	) {}

	private async request(method: Methods, url: string, headers?: HeadersInit, body?: BodyInit) {
		return this._fetch(url, {
			method,
			credentials: 'include',
			headers: {
				...headers,
				Accept: 'application/json',
				'X-XSRF-TOKEN': this._token
			},
			body
		});
	}

	public async get(url: string) {
		return await this.request('GET', url);
	}

	public post(url: string, body?: BodyInit, headers?: HeadersInit) {
		return this.request('POST', url, headers, body);
	}
}

export default RequestService;

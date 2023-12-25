import axios from 'axios';

type Methods = 'get' | 'post';

class RequestService {
	constructor() {
		axios.defaults.withCredentials = true;
		axios.defaults.withXSRFToken = true;
	}

	private async request(method: Methods, url: string, data?: object) {
		return axios[method](url, data, {
			headers: {
				'content-type': 'application/json',
				Accept: 'application/json'
			}
		});
	}

	public async get(url: string) {
		return this.request('get', url);
	}

	public post(url: string, data?: object) {
		return this.request('post', url, data);
	}
}

export default RequestService;

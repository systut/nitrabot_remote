import axiosBase from 'axios';

const apiUrl = '/api';

const axios = axiosBase.create({
	// This is development host
	baseURL: "http://localhost:5000",
});

axios.defaults.headers = {
	'Cache-Control': 'no-cache',
	Pragma: 'no-cache',
	Expires: '0',
};

const ApiService = {
	async get(resource) {
		try {
			return await axios.get(`${apiUrl}/${resource}`);
		} catch (err) {
			throw new Error(`ApiService: ${err}`);
		}
	},

	async post(resource, body) {
		try {
			return await axios.post(`${apiUrl}/${resource}`, body);
		} catch (err) {
			throw new Error(`ApiService: ${err}`);
		}
	},

	async put(resource, body) {
		try {
			return await axios.put(`${apiUrl}/${resource}`, body);
		} catch (err) {
			throw new Error(`ApiService: ${err}`);
		}
	},

	async delete(resource) {
		try {
			return await axios.delete(`${apiUrl}/${resource}`);
		} catch (err) {
			throw new Error(`ApiService: ${err}`);
		}
	},
};

export default ApiService;

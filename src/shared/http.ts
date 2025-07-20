import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'

export default createAlova({
	requestAdapter: adapterFetch(),
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	responded: response => {
		return response.json()
	}
})
import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const SummonersApiClient = {
  async listAllSummoners(accessToken) {
    const apiUrl = apiBaseUrl + "/admin/summoners";
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    const summoners = response.data
    return summoners
  },
}

export default SummonersApiClient

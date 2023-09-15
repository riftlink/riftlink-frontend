import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const RankingApiClient = {
  async getRanking(accessToken) {
    const apiUrl = apiBaseUrl + "/ranking";
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    const ranking = response.data
    return ranking
  },
}

export default RankingApiClient

import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const UsersApiClient = {
  async fetchCurrentUser(accessToken) {
    const apiUrl = apiBaseUrl + "/User";
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    const userData = response.data;
    return userData
  },

  async saveCurrentUser(accessToken, user) {
    const apiUrl = apiBaseUrl + "/User";
    const body = {
      summonerName: user.summonerName,
      aboutMe: user.aboutMe
    }
    await axios.post(apiUrl, body, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },
}

export default UsersApiClient

import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const TeamsApiClient = {
  async fetchActiveTeams(page, pageSize) {
    const apiUrl = apiBaseUrl + "/teams"
    const response = await axios.get(apiUrl, {
      params: {
        page, pageSize
      }
    })
    const teams = response.data
    return teams
  },

  async fetchAllTeams(accessToken) {
    const apiUrl = apiBaseUrl + "/admin/teams";
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    const teams = response.data
    return teams
  },

  async fetchTeam(teamId) {
    const apiUrl = apiBaseUrl + "/teams";
    const response = await axios.get(apiUrl + '/' + teamId)
    const team = response.data
    return team
  },

  async createTeam(accessToken, team) {
    const apiUrl = apiBaseUrl + "/admin/teams"
    const body = {
      teamName: team.teamName,
      logoUrl: team.logoUrl,
      aboutUs: team.aboutUs || '',
      applyContact: team.applyContact || '',
      websiteLink: team.websiteLink || '',
      linktreeHandle: team.linktreeHandle || '',
      discordInvite: team.discordInvite || '',
      twitterHandle: team.twitterHandle || '',
      active: team.active
    }
    await axios.post(apiUrl, body, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },

  async saveTeam(accessToken, teamId, team) {
    const apiUrl = apiBaseUrl + "/admin/teams";
    const body = {
      teamName: team.teamName,
      logoUrl: team.logoUrl,
      aboutUs: team.aboutUs || '',
      applyContact: team.applyContact || '',
      websiteLink: team.websiteLink || '',
      linktreeHandle: team.linktreeHandle || '',
      discordInvite: team.discordInvite || '',
      twitterHandle: team.twitterHandle || '',
      active: team.active
    }
    await axios.post(apiUrl + '/' + teamId, body, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },

  async deleteTeam(accessToken, teamId) {
    const resourceUrl = apiBaseUrl + "/admin/teams/" + teamId;
    await axios.delete(resourceUrl, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },
}

export default TeamsApiClient

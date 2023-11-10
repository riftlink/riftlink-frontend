import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const OffersApiClient = {
  async fetchActiveOffers(page, pageSize) {
    const apiUrl = apiBaseUrl + "/offers"
    const response = await axios.get(apiUrl, {
      params: {
        page, pageSize
      }
    })
    const offers = response.data
    return offers
  },

  async fetchAllOffers(accessToken) {
    const apiUrl = apiBaseUrl + "/admin/offers";
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    const offers = response.data
    return offers
  },

  async fetchOffer(offerId) {
    const apiUrl = apiBaseUrl + "/offers";
    const response = await axios.get(apiUrl + '/' + offerId)
    const offer = response.data
    return offer
  },

  async createOffer(accessToken, offer) {
    const apiUrl = apiBaseUrl + "/admin/offers"
    const body = {
      teamName: offer.teamName,
      logoUrl: offer.logoUrl,
      aboutUs: offer.aboutUs || '',
      applyContact: offer.applyContact || '',
      websiteLink: offer.websiteLink || '',
      linktreeHandle: offer.linktreeHandle || '',
      discordInvite: offer.discordInvite || '',
      twitterHandle: offer.twitterHandle || '',
      active: offer.active
    }
    await axios.post(apiUrl, body, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },

  async saveOffer(accessToken, offerId, offer) {
    const apiUrl = apiBaseUrl + "/admin/offers";
    const body = {
      teamName: offer.teamName,
      logoUrl: offer.logoUrl,
      aboutUs: offer.aboutUs || '',
      applyContact: offer.applyContact || '',
      websiteLink: offer.websiteLink || '',
      linktreeHandle: offer.linktreeHandle || '',
      discordInvite: offer.discordInvite || '',
      twitterHandle: offer.twitterHandle || '',
      active: offer.active
    }
    await axios.post(apiUrl + '/' + offerId, body, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },

  async deleteOffer(accessToken, offerId) {
    const resourceUrl = apiBaseUrl + "/admin/offers/" + offerId;
    await axios.delete(resourceUrl, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
  },
}

export default OffersApiClient

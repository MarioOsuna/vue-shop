/* eslint-disable */
export default class JwtService {
    // Will be used by this service for making API calls
    axiosIns = null

    // For Refreshing Token
    isAlreadyFetchingAccessToken = false

    // For Refreshing Token
    subscribers = []

    constructor(axiosIns) {
        this.axiosIns = axiosIns

        // Request Interceptor
        this.axiosIns.interceptors.request.use(
            config => {
                // Get token from localStorage
                const accessToken = this.getToken()

                // If token is present add it to request's Authorization Header
                if (accessToken) {
                    // eslint-disable-next-line no-param-reassign
                    config.headers.Authorization = `JWT ${accessToken}`
                }
                return config
            },
            error => Promise.reject(error),
        )

        // Add request/response interceptor
        this.axiosIns.interceptors.response.use(
            response => response,
            error => {
                // const { config, response: { status } } = error
                const { config, response } = error
                const originalRequest = config

                // if (status === 401) {
                if (response && response.status === 401) {
                    if (!this.isAlreadyFetchingAccessToken) {
                        this.isAlreadyFetchingAccessToken = true
                        this.refreshToken().then(r => {
                            this.isAlreadyFetchingAccessToken = false

                            // Update accessToken in localStorage
                            this.setToken(r.data.data.refreshToken.token)

                            this.onAccessTokenFetched(r.data.data.refreshToken.token)
                        })
                    }
                    const retryOriginalRequest = new Promise(resolve => {
                        this.addSubscriber(accessToken => {
                            // Make sure to assign accessToken according to your response.
                            // Check: https://pixinvent.ticksy.com/ticket/2413870
                            // Change Authorization header
                            originalRequest.headers.Authorization = `JWT ${accessToken}`
                            resolve(this.axiosIns(originalRequest))
                        })
                    })
                    return retryOriginalRequest
                }
                return Promise.reject(error)
            },
        )
    }

    onAccessTokenFetched(accessToken) {
        this.subscribers = this.subscribers.filter(callback => callback(accessToken))
    }

    addSubscriber(callback) {
        this.subscribers.push(callback)
    }

    getToken = () => localStorage.getItem('token')

    setToken = value => localStorage.setItem('token', value)

    // localStorage.setItem('username', username)
    login(username, password) {

        return this.axiosIns.post('', {
            query: `
        mutation{
          tokenAuth(username: "adrian", password: "Rotary123*") {
            token
            payload
            refreshExpiresIn
            user{
              id
              firstName
              username
              lastName
              email
              isSuperuser
              groups {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              profile {
                profileVendor {
                  edges {
                    node {
                      id
                      vendorName
                    }
                  }
                }
                client {
                  id
                  clientId
                  name
                  displayName
                  bucketType
                  isShop
                  isBuy
                  isInteractivity
                  isFavorite
                  isSecondScreenInteractivity
                  isPushInteractivity
                  isBlockInteractivity
                  isVirtualUser
                  isClose
                  isDownload
                  isParentalControl
                  isAds
                  isLinkCategories
                  webUrl
                  currency
                }
              }
            }
          }
        }
        `,
        })
    }

    register(...args) {
        return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
    }

    refreshToken() {
        return this.axiosIns.post('', {
            query: `
        mutation{
          refreshToken(token: "${this.getToken()}") {
            token
            payload
            refreshExpiresIn
          }
        }
      `,
        })
    }
}
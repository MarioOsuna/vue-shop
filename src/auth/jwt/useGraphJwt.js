import JwtService from '@/auth/jwt/graphJwtService'
import axios from '@/libs/axios'

function useGraphJwt(axiosIns) {
  const jwt = new JwtService(axiosIns)
  return {
    jwt,
  }
}

const { jwt } = useGraphJwt(axios)

export default jwt

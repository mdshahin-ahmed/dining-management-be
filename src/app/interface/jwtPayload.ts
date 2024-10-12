interface JwtPayloadInterface {
  _id: string
  role: string
  email: string
  iat: number
  exp: number
}

export default JwtPayloadInterface

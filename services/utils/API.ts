const BASE_URL_PROD = 'http://127.0.0.1:7001'
const BASE_URL_DEV = 'http://127.0.0.1:7001'

const env = process.env['NODE_ENV']

const BASE_URL = env === 'development' ? BASE_URL_DEV : BASE_URL_PROD

export const GET_USER_LOGIN = BASE_URL + '/user/login'
export const GET_USER_INFO = BASE_URL + '/user/info'

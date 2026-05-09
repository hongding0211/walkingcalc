const DEFAULT_LOCAL_API = 'http://localhost:3500'

const BASE_URL_PROD =
  process.env.EXPO_PUBLIC_WALKCALC_API_BASE_URL || 'https://hong97.ltd/api'
const BASE_URL_DEV =
  process.env.EXPO_PUBLIC_WALKCALC_API_BASE_URL || DEFAULT_LOCAL_API

const env = process.env['NODE_ENV']

const BASE_URL = env === 'development' ? BASE_URL_DEV : BASE_URL_PROD

export const GET_USER_LOGIN = BASE_URL + '/auth/login'
export const POST_USER_REGISTER = BASE_URL + '/auth/register'
export const GET_USER_INFO = BASE_URL + '/auth/info'
export const GET_USER_SEARCH = BASE_URL + '/walkcalc/users/search'
export const GET_USER_MY_DEBT = BASE_URL + '/walkcalc/groups/my'
export const POST_USER_META = BASE_URL + '/auth/profile'
export const POST_GROUP_CREATE = BASE_URL + '/walkcalc/groups'
export const POST_GROUP_JOIN = BASE_URL + '/walkcalc/groups/join'
export const GET_GROUP_MY = BASE_URL + '/walkcalc/groups/my'
export const GET_GROUP = BASE_URL + '/walkcalc/groups/:code'
export const POST_GROUP_ARCHIVE = BASE_URL + '/walkcalc/groups/:code/archive'
export const POST_GROUP_UNARCHIVE =
  BASE_URL + '/walkcalc/groups/:code/unarchive'
export const GET_RECORD_GROUP = BASE_URL + '/walkcalc/records/group/:code'
export const GET_RECORD_BY_ID = BASE_URL + '/walkcalc/records/:recordId'
export const POST_RECORD = BASE_URL + '/walkcalc/records'
export const POST_RECORD_UPDATE = BASE_URL + '/walkcalc/records/update'
export const POST_RECORD_DROP = BASE_URL + '/walkcalc/records/drop'
export const DELETE_GROUP = BASE_URL + '/walkcalc/groups/:code'
export const POST_GROUP_INVITE = BASE_URL + '/walkcalc/groups/:code/invite'
export const POST_GROUP_ADD_TEMP_USER =
  BASE_URL + '/walkcalc/groups/:code/temp-users'
export const POST_GROUP_CHANGE_NAME = BASE_URL + '/walkcalc/groups/:code/name'

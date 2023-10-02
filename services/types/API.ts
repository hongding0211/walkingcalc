const BASE_URL_PROD = 'https://hong97.ltd/walkcalc/api'
const BASE_URL_DEV = 'https://hong97.ltd/walkcalc/api'

const env = process.env['NODE_ENV']

const BASE_URL = env === 'development' ? BASE_URL_DEV : BASE_URL_PROD

export const GET_USER_LOGIN = BASE_URL + '/user/login'
export const GET_USER_INFO = BASE_URL + '/user/info'
export const GET_USER_SEARCH = BASE_URL + '/user/search'
export const GET_USER_MY_DEBT = BASE_URL + '/user/myDebt'
export const POST_USER_META = BASE_URL + '/user/meta'
export const POST_GROUP_CREATE = BASE_URL + '/group/create'
export const POST_GROUP_JOIN = BASE_URL + '/group/join'
export const GET_GROUP_MY = BASE_URL + '/group/my'
export const GET_GROUP = BASE_URL + '/group'
export const POST_GROUP_ARCHIVE = BASE_URL + '/group/archive'
export const POST_GROUP_UNARCHIVE = BASE_URL + '/group/unarchive'
export const GET_RECORD_GROUP = BASE_URL + '/record/group'
export const GET_RECORD_BY_ID = BASE_URL + '/record'
export const POST_RECORD = BASE_URL + '/record'
export const POST_RECORD_UPDATE = BASE_URL + '/record/update'
export const POST_RECORD_DROP = BASE_URL + '/record/drop'
export const DELETE_GROUP = BASE_URL + '/group'
export const POST_GROUP_INVITE = BASE_URL + '/group/invite'
export const POST_GROUP_ADD_TEMP_USER = BASE_URL + '/group/addTempUser'
export const POST_GROUP_CHANGE_NAME = BASE_URL + '/group/changeName'

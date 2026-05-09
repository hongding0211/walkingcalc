import { moneyMinorToLegacyNumber, toMoneyMinor } from '../../utils/moeny'
import {
  DELETE_GROUP,
  GET_GROUP,
  GET_GROUP_MY,
  GET_RECORD_BY_ID,
  GET_RECORD_GROUP,
  GET_USER_INFO,
  GET_USER_LOGIN,
  GET_USER_MY_DEBT,
  GET_USER_SEARCH,
  POST_GROUP_ADD_TEMP_USER,
  POST_GROUP_ARCHIVE,
  POST_GROUP_CHANGE_NAME,
  POST_GROUP_CREATE,
  POST_GROUP_INVITE,
  POST_GROUP_JOIN,
  POST_GROUP_UNARCHIVE,
  POST_RECORD,
  POST_RECORD_DROP,
  POST_RECORD_RESOLVE_DEBTS,
  POST_RECORD_UPDATE,
  POST_USER_META,
  POST_USER_REGISTER,
} from '../types/API'

type RequestArg = {
  params?: Record<string, any>
  body?: Record<string, any>
}

type PreparedRequest = {
  url: string
  body?: Record<string, any>
}

const compact = (value?: Record<string, any>) => {
  return Object.entries(value || {}).reduce<Record<string, any>>(
    (acc, [key, item]) => {
      if (item !== undefined && item !== null && item !== '') {
        acc[key] = item
      }
      return acc
    },
    {}
  )
}

const withQuery = (url: string, params?: Record<string, any>) => {
  const queryString = Object.entries(compact(params))
    .map(([key, value]) => {
      const requestKey = key === 'size' ? 'pageSize' : key
      return `${encodeURIComponent(requestKey)}=${encodeURIComponent(
        String(value)
      )}`
    })
    .join('&')
  return queryString ? `${url}?${queryString}` : url
}

const groupCodeFrom = (arg?: RequestArg) =>
  arg?.body?.id || arg?.body?.groupId || arg?.params?.id

export const prepareRequest = (
  url: string,
  arg?: RequestArg
): PreparedRequest => {
  if (url === GET_GROUP) {
    return { url: url.replace(':code', arg?.params?.id || '') }
  }
  if (url === GET_RECORD_GROUP) {
    const { id, ...params } = arg?.params || {}
    return { url: withQuery(url.replace(':code', id || ''), params) }
  }
  if (url === GET_RECORD_BY_ID) {
    return { url: url.replace(':recordId', arg?.params?.id || '') }
  }
  if (url === POST_GROUP_JOIN) {
    return { url, body: { code: groupCodeFrom(arg) } }
  }
  if (url === DELETE_GROUP) {
    return {
      url: url.replace(':code', arg?.params?.id || groupCodeFrom(arg) || ''),
    }
  }
  if (url === POST_GROUP_ARCHIVE) {
    return { url: url.replace(':code', groupCodeFrom(arg) || '') }
  }
  if (url === POST_GROUP_UNARCHIVE) {
    return { url: url.replace(':code', groupCodeFrom(arg) || '') }
  }
  if (url === POST_GROUP_INVITE) {
    return {
      url: url.replace(':code', groupCodeFrom(arg) || ''),
      body: { userIds: arg?.body?.members || [] },
    }
  }
  if (url === POST_GROUP_ADD_TEMP_USER) {
    return {
      url: url.replace(':code', groupCodeFrom(arg) || ''),
      body: { name: arg?.body?.name },
    }
  }
  if (url === POST_GROUP_CHANGE_NAME) {
    return {
      url: url.replace(':code', groupCodeFrom(arg) || ''),
      body: { name: arg?.body?.name },
    }
  }
  if (url === POST_RECORD || url === POST_RECORD_UPDATE) {
    const { groupId, ...body } = arg?.body || {}
    return { url, body: { ...body, groupCode: groupId } }
  }
  if (url === POST_RECORD_RESOLVE_DEBTS) {
    const { groupId, ...body } = arg?.body || {}
    return { url, body: { ...body, groupCode: groupId } }
  }
  if (url === POST_RECORD_DROP) {
    const { groupId, ...body } = arg?.body || {}
    return { url, body: { ...body, groupCode: groupId } }
  }
  if (url === POST_USER_META) {
    return { url, body: { metadata: arg?.body || {} } }
  }
  if (
    url === GET_GROUP_MY ||
    url === GET_USER_MY_DEBT ||
    url === GET_USER_SEARCH
  ) {
    return { url: withQuery(url, arg?.params) }
  }
  return { url: withQuery(url, arg?.params), body: arg?.body }
}

const profileToLegacyUser = (user: any) => ({
  uuid: user?.userId || user?.uuid,
  name: user?.profile?.name || user?.name || user?.userId || '',
  avatar: user?.profile?.avatar || user?.avatar || '',
})

const exactAmount = (exact: any, legacy: any) => toMoneyMinor(exact ?? legacy)

const groupToLegacy = (group: any) => ({
  id: group?.code,
  name: group?.name,
  createdAt: group?.createdAt,
  modifiedAt: group?.modifiedAt,
  isOwner: group?.isOwner,
  tempUsers: (group?.tempUsers || []).map((tempUser: any) => {
    const debtMinor = exactAmount(tempUser?.debtMinor, tempUser?.debt)
    const costMinor = exactAmount(tempUser?.costMinor, tempUser?.cost)
    return {
      ...tempUser,
      debt: moneyMinorToLegacyNumber(debtMinor),
      cost: moneyMinorToLegacyNumber(costMinor),
      debtMinor,
      costMinor,
    }
  }),
  archivedUsers: group?.archivedUserIds || [],
  membersInfo: (group?.members || []).map((member: any) => {
    const debtMinor = exactAmount(member?.debtMinor, member?.debt)
    const costMinor = exactAmount(member?.costMinor, member?.cost)
    return {
      uuid: member?.userId,
      name: member?.profile?.name || member?.userId || '',
      avatar: member?.profile?.avatar || '',
      debt: moneyMinorToLegacyNumber(debtMinor),
      cost: moneyMinorToLegacyNumber(costMinor),
      debtMinor,
      costMinor,
    }
  }),
})

const recordToLegacy = (record: any) => {
  const paidMinor = exactAmount(record?.paidMinor, record?.paid)
  return {
    ...record,
    paid: moneyMinorToLegacyNumber(paidMinor),
    paidMinor,
  }
}

const mapDataForUrl = (url: string, data: any) => {
  if (url === GET_USER_LOGIN) {
    return {
      token: data?.accessToken,
      uid: data?.user?.userId,
    }
  }
  if (url === POST_USER_REGISTER || url === GET_USER_INFO) {
    return profileToLegacyUser(data)
  }
  if (url === GET_USER_SEARCH) {
    return (data || []).map(profileToLegacyUser)
  }
  if (url === GET_RECORD_GROUP) {
    return (data || []).map(recordToLegacy)
  }
  if (url === GET_RECORD_BY_ID) {
    return Array.isArray(data) ? data.map(recordToLegacy) : recordToLegacy(data)
  }
  if (url === GET_GROUP || url === GET_GROUP_MY || url === GET_USER_MY_DEBT) {
    if (Array.isArray(data)) {
      return data.map(groupToLegacy)
    }
    return groupToLegacy(data)
  }
  if (
    url === POST_GROUP_CREATE ||
    url === POST_GROUP_JOIN ||
    url === DELETE_GROUP
  ) {
    return { groupId: data?.code }
  }
  if (url === POST_GROUP_ARCHIVE || url === POST_GROUP_UNARCHIVE) {
    return { id: data?.code }
  }
  if (url === POST_GROUP_INVITE) {
    return { id: data?.code, members: data?.userIds || [] }
  }
  if (url === POST_GROUP_ADD_TEMP_USER) {
    return { id: data?.uuid, name: data?.name }
  }
  if (url === POST_GROUP_CHANGE_NAME) {
    return { id: data?.code, name: data?.name }
  }
  if (url === POST_RECORD || url === POST_RECORD_UPDATE) {
    return { ...recordToLegacy(data), groupId: data?.groupCode }
  }
  if (url === POST_RECORD_RESOLVE_DEBTS) {
    return (data || []).map((record: any) => ({
      ...recordToLegacy(record),
      groupId: record?.groupCode,
    }))
  }
  if (url === POST_RECORD_DROP) {
    return { groupId: data?.groupCode, recordId: data?.recordId }
  }
  return data
}

export const normalizeResponse = (url: string, raw: any) => {
  const isSuccess =
    typeof raw?.isSuccess === 'boolean' ? raw.isSuccess : !!raw?.success
  const sourceData =
    raw?.data && Array.isArray(raw.data.data) ? raw.data.data : raw?.data

  return {
    success: isSuccess,
    data: mapDataForUrl(url, sourceData),
    pagination:
      raw?.data && typeof raw.data.total === 'number'
        ? {
            page: raw.data.page,
            size: raw.data.pageSize,
            total: raw.data.total,
          }
        : raw?.pagination,
    msg: raw?.message || raw?.msg,
  }
}

// ======================================
//                 Types
// ======================================
type Method = 'GET' | 'POST' | 'DELETE'

// ======================================
//               Interface
// ======================================
interface IRequest<T extends Record<string, string> | undefined, P extends Record<string, any> | undefined> {
  params?: { token?: string; page?: string; size?: string } & {
    [K in keyof T]: T[K]
  }
  body?: P
}

interface IResponse<T extends Record<string, any> | Record<string, any>[] | undefined> {
  success: boolean
  data?: T
  pagination?: {
    page: number
    size: number
    total: number
  }
  msg?: string
}

interface IApi {
  request: IRequest<any, any> | undefined
  response: IResponse<any>
}

// ======================================
//                User
// ======================================
export interface IGetUserLogin extends IApi {
  request: IRequest<
    {
      type: string
      ticket: string
    },
    undefined
  >
  response: IResponse<{
    token: string
    uid?: string
  }>
}

export interface IGetUserInfo extends IApi {
  request: IRequest<
    {
      pushToken?: string
    },
    undefined
  >
  response: IResponse<{
    uuid: string
    name: string
    avatar: string
  }>
}

export interface IPostUserInfos extends IApi {
  request: IRequest<
    undefined,
    {
      uuids: string[]
    }
  >
  response: IResponse<
    {
      uuid: string
      name: string
      avatar: string
    }[]
  >
}

export interface IGetUserMyDebt extends IApi {
  request: IRequest<undefined, undefined>
  response: IResponse<{
    debt: number
  }>
}

export interface IGetUserSearch extends IApi {
  request: IRequest<
    {
      name: string
    },
    undefined
  >
  response: IResponse<
    {
      uuid: string
      name: string
      avatar: string
    }[]
  >
}

export interface IPostGroupCreate extends IApi {
  request: IRequest<
    undefined,
    {
      name: string
    }
  >
  response: IResponse<{
    groupId: string
  }>
}

export interface IPostGroupJoin extends IApi {
  request: IRequest<
    undefined,
    {
      id: string
    }
  >
  response: IResponse<{
    groupId: string
  }>
}

export interface IGetGroupMy extends IApi {
  request: IRequest<undefined, undefined>
  response: IResponse<
    {
      tempUsers: {
        uuid: string
        name: string
        debt: number
      }[]
      id: string
      name: string
      createdAt: number
      modifiedAt: number
      membersInfo: {
        uuid: string
        name: string
        avatar: string
        debt: number
      }[]
      archivedUsers: string[]
    }[]
  >
}

export interface IGetGroup extends IApi {
  request: IRequest<
    {
      id: string
    },
    undefined
  >
  response: IResponse<{
    tempUsers: {
      uuid: string
      name: string
      debt: number
    }[]
    id: string
    name: string
    createdAt: number
    modifiedAt: number
    membersInfo: {
      uuid: string
      name: string
      avatar: string
      debt: number
    }[]
  }>
}

export interface IGetRecordGroup extends IApi {
  request: IRequest<
    {
      id: string
    },
    undefined
  >
  response: IResponse<
    {
      who: string
      paid: number
      forWhom: string[]
      type: string
      text: string
      long: string
      lat: string
      recordId: string
      createdAt: number
      modifiedAt: number
    }[]
  >
}

export interface IPostRecord extends IApi {
  request: IRequest<
    undefined,
    {
      groupId: string
      who: string
      paid: number
      forWhom: string[]
      type: string
      text: string
      long: string
      lat: string
      isDebtResolve?: boolean
    }
  >
  response: IResponse<{
    groupId: string
    paid: number
    forWhom: string[]
    type: string
    text: string
    long: string
    lat: string
    recordId: string
    createdAt: number
    modifiedAt: number
  }>
}

export interface IPostRecordDrop extends IApi {
  request: IRequest<
    undefined,
    {
      groupId: string
      recordId: string
    }
  >
  response: IResponse<{
    groupId: string
    recordId: string
  }>
}

export interface IDeleteGroup extends IApi {
  request: IRequest<
    {
      id: string
    },
    undefined
  >
  response: IResponse<{
    groupId: string
  }>
}

export interface IPostGroupInvite extends IApi {
  request: IRequest<
    undefined,
    {
      id: string
      members: string[]
    }
  >
  response: IResponse<{
    id: string
    members: string[]
  }>
}
export interface IPostGroupAddTempUser extends IApi {
  request: IRequest<
    undefined,
    {
      id: string
      name: string
    }
  >
  response: IResponse<{
    id: string
    name: string
  }>
}

export interface IPostGroupArchive extends IApi {
  request: IRequest<
    undefined,
    {
      id: string
    }
  >
  response: IResponse<{
    id: string
  }>
}

export interface IPostGroupUnarchive extends IApi {
  request: IRequest<
    undefined,
    {
      id: string
    }
  >
  response: IResponse<{
    id: string
  }>
}

export interface IPostGroupChangeName extends IApi {
  request: IRequest<
    undefined,
    {
      id: string
      name: string
    }
  >
  response: IResponse<{
    id: string
    name: string
  }>
}

export type UserMeta = {
  pushToken?: string
  language?: string
  applicationInfo?: any
  deviceInfo?: any
  lastOpened?: number
}

export interface IPostUserMeta extends IApi {
  request: IRequest<undefined, UserMeta>
  response: IResponse<UserMeta>
}

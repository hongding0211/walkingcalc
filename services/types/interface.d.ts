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
  request: IRequest<undefined, undefined>
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

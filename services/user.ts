import { IGetUserInfo, IGetUserLogin, IGetUserSearch } from './types/interface'
import { GET_USER_INFO, GET_USER_LOGIN, GET_USER_SEARCH } from './utils/API'
import useFetch from './utils/useFetch'

export function useLogin(params?: IGetUserLogin['request'], shouldFetch = true) {
  return useFetch<IGetUserLogin>('GET', GET_USER_LOGIN, params, shouldFetch)
}

export function useUserInfo(params?: IGetUserInfo['request'], shouldFetch = true) {
  return useFetch<IGetUserInfo>('GET', GET_USER_INFO, params, shouldFetch)
}

export function useUserSearch(params?: IGetUserSearch['request']) {
  return useFetch<IGetUserSearch>('GET', GET_USER_SEARCH, params)
}

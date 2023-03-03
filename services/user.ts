import useFetch from './hooks/useFetch'
import { GET_USER_INFO, GET_USER_LOGIN, GET_USER_MY_DEBT, GET_USER_SEARCH } from './types/API'
import { IGetUserInfo, IGetUserLogin, IGetUserMyDebt, IGetUserSearch } from './types/interface'

export function useLogin(params?: IGetUserLogin['request'], shouldFetch = true) {
  return useFetch<IGetUserLogin>('GET', GET_USER_LOGIN, params, shouldFetch)
}

export function useUserInfo(params?: IGetUserInfo['request'], shouldFetch = true) {
  return useFetch<IGetUserInfo>('GET', GET_USER_INFO, params, shouldFetch)
}

export function useUserSearch(params?: IGetUserSearch['request']) {
  return useFetch<IGetUserSearch>('GET', GET_USER_SEARCH, params)
}

export function useUserDebt() {
  return useFetch<IGetUserMyDebt>('GET', GET_USER_MY_DEBT)
}

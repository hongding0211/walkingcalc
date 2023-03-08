import useFetch from './hooks/useFetch'
import useMutation from './hooks/useMutation'
import { GET_USER_INFO, GET_USER_LOGIN, GET_USER_MY_DEBT, GET_USER_SEARCH } from './types/API'
import { IGetUserInfo, IGetUserLogin, IGetUserMyDebt, IGetUserSearch } from './types/interface'

export function useLogin(params?: IGetUserLogin['request'], shouldFetch = true) {
  return useMutation<IGetUserLogin>('GET', GET_USER_LOGIN)
}

export function useUserInfo() {
  return useMutation<IGetUserInfo>('GET', GET_USER_INFO)
}

export function useUserSearch(params?: IGetUserSearch['request']) {
  return useMutation<IGetUserSearch>('GET', GET_USER_SEARCH)
}

export function useUserDebt() {
  return useFetch<IGetUserMyDebt>('GET', GET_USER_MY_DEBT)
}

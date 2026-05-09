import { useMemo } from 'react'

import { useAppSelector } from '../app/store'
import { addMoneyMinor, moneyMinorToLegacyNumber } from '../utils/moeny'
import useFetch from './hooks/useFetch'
import useMutation from './hooks/useMutation'
import {
  GET_GROUP_MY,
  GET_USER_INFO,
  GET_USER_LOGIN,
  GET_USER_SEARCH,
  POST_USER_META,
  POST_USER_REGISTER,
} from './types/API'
import {
  IGetGroupMy,
  IGetUserInfo,
  IGetUserLogin,
  IGetUserMyDebt,
  IGetUserSearch,
  IPostUserMeta,
  IPostUserRegister,
} from './types/interface'

export function useLogin(
  params?: IGetUserLogin['request'],
  shouldFetch = true
) {
  return useMutation<IGetUserLogin>('POST', GET_USER_LOGIN)
}

export function useRegister() {
  return useMutation<IPostUserRegister>('POST', POST_USER_REGISTER)
}

export function useUserInfo() {
  return useMutation<IGetUserInfo>('GET', GET_USER_INFO)
}

export function useUserSearch(params?: IGetUserSearch['request']) {
  return useMutation<IGetUserSearch>('GET', GET_USER_SEARCH)
}

export function useUserDebt() {
  const userInfo = useAppSelector(state => state.user.data)
  const result = useFetch<IGetGroupMy>('GET', GET_GROUP_MY, {
    params: {
      size: 100 + '',
    },
  })

  const data = useMemo<IGetUserMyDebt['response'] | undefined>(() => {
    if (!result.data) {
      return undefined
    }
    const debtMinor =
      result.data.data?.reduce((sum, group) => {
        const currentMember = group.membersInfo.find(
          member => member.uuid === userInfo?.uuid
        )
        return addMoneyMinor(sum, currentMember?.debtMinor || '0')
      }, '0') || '0'
    return {
      success: result.data.success,
      data: {
        debt: moneyMinorToLegacyNumber(debtMinor),
        debtMinor,
      },
      msg: result.data.msg,
    }
  }, [result.data, userInfo])

  return {
    ...result,
    data,
  }
}

export function usePostUserMeta() {
  return useMutation<IPostUserMeta>('PATCH', POST_USER_META)
}

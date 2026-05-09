import { useDispatch } from 'react-redux'
import useSWRMutation from 'swr/mutation'

import { useAppSelector } from '../../app/store'
import { setToken } from '../../feature/user/userSlice'
import { IApi, Method } from '../types/interface'
import { requestWithAuth } from './authRequest'

function useMutator<T extends IApi>(
  method: Method
): (url: string, extra?: { arg?: T['request'] }) => Promise<T['response']> {
  const token = useAppSelector(state => state.user.token)
  const dispatch = useDispatch()
  return async (url, extra) => {
    const { arg } = extra || {}
    return requestWithAuth<T>(method, url, arg, token, nextToken =>
      dispatch(
        setToken({
          token: nextToken,
        })
      )
    )
  }
}

export default function useMutation<T extends IApi>(
  method: Method,
  url: string
) {
  const fetcher = useMutator<T>(method)
  return useSWRMutation(url, fetcher)
}

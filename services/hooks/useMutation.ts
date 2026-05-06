import { useDispatch } from 'react-redux'
import useSWRMutation from 'swr/mutation'

import { useAppSelector } from '../../app/store'
import { setToken } from '../../feature/user/userSlice'
import { IApi, Method } from '../types/interface'
import { normalizeResponse, prepareRequest } from './walkcalcApi'

function useMutator<T extends IApi>(
  method: Method
): (url: string, extra?: { arg?: T['request'] }) => Promise<T['response']> {
  const token = useAppSelector(state => state.user.token)
  const dispatch = useDispatch()
  return async (url, extra) => {
    const { arg } = extra || {}
    const request = prepareRequest(url, arg)
    const fetchConfig: Record<string, any> = {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
    if (request.body && method !== 'GET') {
      fetchConfig.body = JSON.stringify(request.body)
    }
    const r = await fetch(request.url, fetchConfig)
    if (r.status === 401 || r.status === 403) {
      dispatch(
        setToken({
          token: undefined,
        })
      )
    }
    return normalizeResponse(url, await r.json())
  }
}

export default function useMutation<T extends IApi>(
  method: Method,
  url: string
) {
  const fetcher = useMutator<T>(method)
  return useSWRMutation(url, fetcher)
}

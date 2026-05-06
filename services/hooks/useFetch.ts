import { useDispatch } from 'react-redux'
import useSWR from 'swr'

import { useAppSelector } from '../../app/store'
import { setToken } from '../../feature/user/userSlice'
import { IApi, Method } from '../types/interface'
import { normalizeResponse, prepareRequest } from './walkcalcApi'

function useFetcher<T extends IApi>(
  method: Method,
  url: string,
  params: T['request']
): (url: string) => Promise<T['response']> {
  const token = useAppSelector(state => state.user.token)
  const dispatch = useDispatch()
  return async url => {
    const request = prepareRequest(url, params)
    const fetchConfig: Record<string, any> = {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8;',
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

export default function useFetch<T extends IApi>(
  method: Method,
  url: string,
  params?: T['request'],
  shouldFetch = true
) {
  const fetcher = useFetcher<T>(method, url, params)
  return useSWR(shouldFetch ? url : null, fetcher)
}

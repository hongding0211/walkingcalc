import { useDispatch } from 'react-redux'
import useSWR from 'swr'

import { useAppSelector } from '../../app/store'
import { setToken } from '../../feature/user/userSlice'
import { IApi, Method } from '../types/interface'

function useFetcher<T extends IApi>(
  method: Method,
  url: string,
  params: T['request']
): (url: string) => Promise<T['response']> {
  // construct url
  const token = useAppSelector(state => state.user.token)
  const query: string[] = []
  Object.entries({
    ...params?.params,
    token,
  }).forEach(([k, v]) => {
    query.push(`${k}=${v}`)
  })
  const queryStr = query.join('&')
  const requestUrl = `${url}?${queryStr}`
  // construct fetcher
  const fetchConfig: Record<string, any> = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8;',
    },
  }
  if (params?.body && method === 'POST') {
    fetchConfig.body = JSON.stringify(params.body)
  }
  const dispatch = useDispatch()
  return async () => {
    const r = await fetch(requestUrl, fetchConfig)
    if (r.status === 401 || r.status === 403) {
      dispatch(
        setToken({
          token: undefined,
        })
      )
    }
    return r.json()
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

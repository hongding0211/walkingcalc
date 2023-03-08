import { useDispatch } from 'react-redux'
import useSWRMutation from 'swr/mutation'

import { useAppSelector } from '../../app/store'
import { setToken } from '../../feature/user/userSlice'
import { IApi, Method } from '../types/interface'

function useMutator<T extends IApi>(
  method: Method
): (url: string, extra?: { arg?: T['request'] }) => Promise<T['response']> {
  const token = useAppSelector(state => state.user.token)
  const dispatch = useDispatch()
  return async (url, extra) => {
    const { arg } = extra || {}
    // construct url
    const query: string[] = []
    Object.entries({
      ...arg?.params,
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
        'Content-Type': 'application/json',
      },
    }
    if (arg?.body && method === 'POST') {
      fetchConfig.body = JSON.stringify(arg.body)
    }
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

export default function useMutation<T extends IApi>(method: Method, url: string) {
  const fetcher = useMutator<T>(method)
  return useSWRMutation(url, fetcher)
}

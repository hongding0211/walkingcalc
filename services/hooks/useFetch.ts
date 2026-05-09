import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../app/store'
import { setToken } from '../../feature/user/userSlice'
import { IApi, Method } from '../types/interface'
import { requestWithAuth } from './authRequest'

function useFetcher<T extends IApi>(
  method: Method,
  url: string,
  params: T['request']
): (url: string) => Promise<T['response']> {
  const token = useAppSelector(state => state.user.token)
  const dispatch = useDispatch()
  const paramsKey = JSON.stringify(params || null)
  return useCallback(
    async url =>
      requestWithAuth<T>(method, url, params, token, nextToken =>
        dispatch(
          setToken({
            token: nextToken,
          })
        )
      ),
    [method, paramsKey, token, dispatch]
  )
}

export default function useFetch<T extends IApi>(
  method: Method,
  url: string,
  params?: T['request'],
  shouldFetch = true
) {
  const [data, setData] = useState<T['response'] | undefined>()
  const [error, setError] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const fetcher = useFetcher<T>(method, url, params)
  const key = useMemo(
    () => JSON.stringify([url, params || null]),
    [url, params]
  )

  const mutate = useCallback(
    async (...args: [T['response']?]) => {
      if (args.length > 0) {
        const [nextData] = args
        setData(nextData)
        return nextData
      }
      setIsLoading(true)
      setError(undefined)
      try {
        const result = await fetcher(url)
        setData(result)
        return result
      } catch (e) {
        setError(e)
        throw e
      } finally {
        setIsLoading(false)
      }
    },
    [fetcher, url]
  )

  useEffect(() => {
    if (!shouldFetch) {
      return
    }
    let ignore = false
    setIsLoading(true)
    setError(undefined)
    fetcher(url)
      .then(result => {
        if (!ignore) {
          setData(result)
        }
      })
      .catch(e => {
        if (!ignore) {
          setError(e)
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false)
        }
      })
    return () => {
      ignore = true
    }
  }, [fetcher, key, shouldFetch, url])

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

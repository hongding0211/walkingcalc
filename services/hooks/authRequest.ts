import { POST_USER_REFRESH } from '../types/API'
import { IApi, Method } from '../types/interface'
import { normalizeResponse, prepareRequest } from './walkcalcApi'

type TokenUpdater = (token?: string) => void

const isUnauthorized = (response: Response) =>
  response.status === 401 || response.status === 403

const readJson = async (response: Response) => {
  try {
    return await response.json()
  } catch {
    return undefined
  }
}

const buildFetchConfig = (
  method: Method,
  body: Record<string, any> | undefined,
  token?: string
) => {
  const fetchConfig: Record<string, any> = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }

  if (body && method !== 'GET') {
    fetchConfig.body = JSON.stringify(body)
  }

  return fetchConfig
}

export const refreshAccessToken = async () => {
  const response = await fetch(
    POST_USER_REFRESH,
    buildFetchConfig('POST', undefined)
  )

  if (!response.ok) {
    return undefined
  }

  const result = normalizeResponse(POST_USER_REFRESH, await readJson(response))
  return result.success ? result.data?.token : undefined
}

export async function requestWithAuth<T extends IApi>(
  method: Method,
  url: string,
  arg: T['request'] | undefined,
  token: string | undefined,
  onTokenChange: TokenUpdater
): Promise<T['response']> {
  const execute = (nextToken?: string) => {
    const request = prepareRequest(url, arg)
    return fetch(request.url, buildFetchConfig(method, request.body, nextToken))
  }

  let response = await execute(token)

  if (isUnauthorized(response)) {
    if (token) {
      const refreshedToken = await refreshAccessToken()

      if (refreshedToken) {
        onTokenChange(refreshedToken)
        response = await execute(refreshedToken)

        if (!isUnauthorized(response)) {
          return normalizeResponse(url, await readJson(response))
        }
      }
    }

    onTokenChange(undefined)
  }

  return normalizeResponse(url, await readJson(response))
}

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')

const env = process.env['NODE_ENV']

export const HONG97_WEB_BASE_URL = trimTrailingSlash(
  process.env.EXPO_PUBLIC_HONG97_WEB_BASE_URL ||
    (env === 'development' ? 'http://localhost:3000' : 'https://hong97.ltd')
)

export const SSO_LOGIN_URL = `${HONG97_WEB_BASE_URL}/sso/login`
export const SSO_URL = SSO_LOGIN_URL
export const SSO_MY = `${HONG97_WEB_BASE_URL}/sso/profile`
export const SSO_REDIRECT_URL = `${HONG97_WEB_BASE_URL}/auth/callback`

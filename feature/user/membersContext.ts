import { createContext } from 'react'

interface IMember {
  uuid?: string
  name: string
  avatar?: string
}

interface IMembersContext extends Map<[IMember['uuid']], IMember> {}

export const MembersContext = createContext<IMembersContext>(new Map())

export const useMembersContext = (data?: {
  membersInfo: IMember[]
  tempUsers: IMember[]
}): IMembersContext => {
  const map = new Map()
  if (!data) {
    return map
  }
  const { membersInfo, tempUsers } = data
  membersInfo.forEach(m => {
    map.set(m.uuid, m)
  })
  tempUsers.forEach(u => {
    map.set(u.uuid, u)
  })
  return map
}

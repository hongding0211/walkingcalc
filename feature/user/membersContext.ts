import { createContext } from 'react'

interface IMember {
  uuid?: string
  name: string
  avatar?: string
}

interface IMembersContext extends Map<[IMember['uuid']], IMember> {}

export const MembersContext = createContext<IMembersContext>(new Map())

export const useMembersContext = (memberData: IMember[]): IMembersContext => {
  const map = new Map()
  memberData.forEach(m => {
    map.set(m.uuid, m)
  })
  return map
}

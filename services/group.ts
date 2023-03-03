import useMutation from './hooks/useMutation'
import { POST_GROUP_CREATE, POST_GROUP_JOIN } from './types/API'
import { IPostGroupCreate, IPostGroupJoin } from './types/interface'

export function useGroupCreate() {
  return useMutation<IPostGroupCreate>('POST', POST_GROUP_CREATE)
}

export function useGroupJoin() {
  return useMutation<IPostGroupJoin>('POST', POST_GROUP_JOIN)
}

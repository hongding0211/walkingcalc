import useFetch from './hooks/useFetch'
import useMutation from './hooks/useMutation'
import { GET_GROUP, GET_GROUP_MY, POST_GROUP_CREATE, POST_GROUP_JOIN } from './types/API'
import { IGetGroup, IGetGroupMy, IPostGroupCreate, IPostGroupJoin } from './types/interface'

export function useGroupCreate() {
  return useMutation<IPostGroupCreate>('POST', POST_GROUP_CREATE)
}

export function useGroupJoin() {
  return useMutation<IPostGroupJoin>('POST', POST_GROUP_JOIN)
}

export function useGroupMy() {
  return useFetch<IGetGroupMy>('GET', GET_GROUP_MY)
}

export function useGroup(id: string) {
  return useFetch<IGetGroup>('GET', GET_GROUP, {
    params: {
      id,
    },
  })
}

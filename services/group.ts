import useFetch from './hooks/useFetch'
import useMutation from './hooks/useMutation'
import {
  DELETE_GROUP,
  GET_GROUP,
  GET_GROUP_MY,
  POST_GROUP_ADD_TEMP_USER,
  POST_GROUP_ARCHIVE,
  POST_GROUP_CREATE,
  POST_GROUP_INVITE,
  POST_GROUP_JOIN,
  POST_GROUP_UNARCHIVE,
} from './types/API'
import {
  IDeleteGroup,
  IGetGroup,
  IGetGroupMy,
  IPostGroupAddTempUser,
  IPostGroupArchive,
  IPostGroupCreate,
  IPostGroupInvite,
  IPostGroupJoin,
  IPostGroupUnarchive,
} from './types/interface'

export function useGroupCreate() {
  return useMutation<IPostGroupCreate>('POST', POST_GROUP_CREATE)
}

export function useGroupJoin() {
  return useMutation<IPostGroupJoin>('POST', POST_GROUP_JOIN)
}

export function useGroupMy() {
  return useFetch<IGetGroupMy>('GET', GET_GROUP_MY, {
    // TODO 未来扩展成动态拉取
    params: {
      size: 1000 + '',
    },
  })
}

export function useGroup(id: string) {
  return useFetch<IGetGroup>('GET', GET_GROUP, {
    params: {
      id,
    },
  })
}

export function useDeleteGroup() {
  return useMutation<IDeleteGroup>('DELETE', DELETE_GROUP)
}

export function useGroupInvite() {
  return useMutation<IPostGroupInvite>('POST', POST_GROUP_INVITE)
}

export function useAddTempUser() {
  return useMutation<IPostGroupAddTempUser>('POST', POST_GROUP_ADD_TEMP_USER)
}

export function useArchiveGroup() {
  return useMutation<IPostGroupArchive>('POST', POST_GROUP_ARCHIVE)
}

export function useUnarchiveGroup() {
  return useMutation<IPostGroupUnarchive>('POST', POST_GROUP_UNARCHIVE)
}

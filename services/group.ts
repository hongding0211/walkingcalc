import useMutation from './hooks/useMutation'
import { POST_GROUP_CREATE } from './types/API'
import { IPostGroupCreate } from './types/interface'

export function useGroupCreate() {
  return useMutation<IPostGroupCreate>('POST', POST_GROUP_CREATE)
}

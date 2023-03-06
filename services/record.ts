import useFetch from './hooks/useFetch'
import useMutation from './hooks/useMutation'
import { GET_RECORD_GROUP, POST_RECORD, POST_RECORD_DROP } from './types/API'
import { IGetRecordGroup, IPostRecord, IPostRecordDrop } from './types/interface'

export function useRecordGroup(id: string, page: number) {
  return useFetch<IGetRecordGroup>('GET', GET_RECORD_GROUP, {
    params: {
      id,
      page: page + '',
    },
  })
}

export function useAddRecord() {
  return useMutation<IPostRecord>('POST', POST_RECORD)
}

export function useDropRecord() {
  return useMutation<IPostRecordDrop>('POST', POST_RECORD_DROP)
}

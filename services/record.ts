import useFetch from './hooks/useFetch'
import useMutation from './hooks/useMutation'
import { GET_RECORD_GROUP, POST_RECORD } from './types/API'
import { IGetRecordGroup, IPostRecord } from './types/interface'

export function useRecordGroup(id: string) {
  return useFetch<IGetRecordGroup>('GET', GET_RECORD_GROUP, {
    params: {
      id,
    },
  })
}

export function useAddRecord() {
  return useMutation<IPostRecord>('POST', POST_RECORD)
}

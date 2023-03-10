import useMutation from './hooks/useMutation'
import { GET_RECORD_GROUP, POST_RECORD, POST_RECORD_DROP } from './types/API'
import { IGetRecordGroup, IPostRecord, IPostRecordDrop } from './types/interface'

export function useRecordGroup() {
  return useMutation<IGetRecordGroup>('GET', GET_RECORD_GROUP)
}

export function useAddRecord() {
  return useMutation<IPostRecord>('POST', POST_RECORD)
}

export function useDropRecord() {
  return useMutation<IPostRecordDrop>('POST', POST_RECORD_DROP)
}

import useMutation from './hooks/useMutation'
import {
  GET_RECORD_BY_ID,
  GET_RECORD_GROUP,
  POST_RECORD,
  POST_RECORD_DROP,
  POST_RECORD_UPDATE,
} from './types/API'
import {
  IGetRecordById,
  IGetRecordGroup,
  IPostRecord,
  IPostRecordDrop,
  IPostRecordUpdate,
} from './types/interface'

export function useRecordGroup() {
  return useMutation<IGetRecordGroup>('GET', GET_RECORD_GROUP)
}

export function useRecordById() {
  return useMutation<IGetRecordById>('GET', GET_RECORD_BY_ID)
}

export function useAddRecord() {
  return useMutation<IPostRecord>('POST', POST_RECORD)
}

export function useEditRecord() {
  return useMutation<IPostRecordUpdate>('POST', POST_RECORD_UPDATE)
}

export function useDropRecord() {
  return useMutation<IPostRecordDrop>('POST', POST_RECORD_DROP)
}

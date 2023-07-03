import { cloneDeep } from 'lodash'

interface IUser {
  name?: string
  uuid?: string
  avatar?: string
  debt: number
}

export type IResolvedDebt = {
  from: IUser
  to: IUser
  amount: number
}

export function resolveDebt(u: IUser[]): IResolvedDebt[] {
  const res: IResolvedDebt[] = []

  const users = cloneDeep(u)

  const receivers = users.filter(u => u.debt >= 0).sort((x, y) => y.debt - x.debt)
  const payers = users
    .filter(u => u.debt < 0)
    .sort((x, y) => x.debt - y.debt)
    .map(e => ({ ...e, debt: -e.debt }))

  // check if resolvable
  if (
    Math.abs(
      receivers.map(e => e.debt).reduce((pre, cur) => pre + cur, 0) -
        payers.map(e => e.debt).reduce((pre, cur) => pre + cur, 0)
    ) > 1e-1
  ) {
    return []
  }

  for (const receiver of receivers) {
    while (Math.abs(receiver.debt) > 1e-10) {
      for (const payer of payers) {
        if (Math.abs(payer.debt) < 1e-10) {
          continue
        }
        if (receiver.debt >= payer.debt) {
          res.push({
            from: payer,
            to: receiver,
            amount: payer.debt,
          })
          receiver.debt -= payer.debt
          payer.debt = 0
        } else {
          res.push({
            from: payer,
            to: receiver,
            amount: receiver.debt,
          })
          payer.debt -= receiver.debt
          receiver.debt = 0
          break
        }
      }
    }
  }

  return res
}

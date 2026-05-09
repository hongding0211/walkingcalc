import { cloneDeep } from 'lodash'

import {
  MoneyMinor,
  compareMoneyMinor,
  fromMoneyMinorBigInt,
  isZeroMoneyMinor,
  negateMoneyMinor,
  toMoneyMinor,
  toMoneyMinorBigInt,
} from './moeny'

interface IUser {
  name?: string
  uuid?: string
  avatar?: string
  debt: number | MoneyMinor
  debtMinor?: MoneyMinor
}

type IResolvedDebtUser = Omit<IUser, 'debt'> & {
  debt: MoneyMinor
  debtMinor: MoneyMinor
}

export type IResolvedDebt = {
  from: IResolvedDebtUser
  to: IResolvedDebtUser
  amount: MoneyMinor
  amountMinor: MoneyMinor
}

export function resolveDebt(u: IUser[]): IResolvedDebt[] {
  const res: IResolvedDebt[] = []

  const users = cloneDeep(u).map(user => {
    const debtMinor = toMoneyMinor(user.debtMinor || user.debt)
    return {
      ...user,
      debt: debtMinor,
      debtMinor,
    }
  })

  const receivers = users
    .filter(u => compareMoneyMinor(u.debtMinor, '0') >= 0)
    .sort((x, y) => compareMoneyMinor(y.debtMinor, x.debtMinor))
  const payers = users
    .filter(u => compareMoneyMinor(u.debtMinor, '0') < 0)
    .sort((x, y) => compareMoneyMinor(x.debtMinor, y.debtMinor))
    .map(e => ({
      ...e,
      debt: negateMoneyMinor(e.debtMinor),
      debtMinor: negateMoneyMinor(e.debtMinor),
    }))

  const receiverTotal = receivers.reduce(
    (sum, user) => sum + toMoneyMinorBigInt(user.debtMinor),
    0n
  )
  const payerTotal = payers.reduce(
    (sum, user) => sum + toMoneyMinorBigInt(user.debtMinor),
    0n
  )
  if (receiverTotal !== payerTotal) {
    return []
  }

  for (const receiver of receivers) {
    while (!isZeroMoneyMinor(receiver.debtMinor)) {
      for (const payer of payers) {
        if (isZeroMoneyMinor(payer.debtMinor)) {
          continue
        }

        if (compareMoneyMinor(receiver.debtMinor, payer.debtMinor) >= 0) {
          res.push({
            from: payer,
            to: receiver,
            amount: payer.debtMinor,
            amountMinor: payer.debtMinor,
          })
          receiver.debtMinor = fromMoneyMinorBigInt(
            toMoneyMinorBigInt(receiver.debtMinor) -
              toMoneyMinorBigInt(payer.debtMinor)
          )
          receiver.debt = receiver.debtMinor
          payer.debtMinor = '0'
          payer.debt = '0'
        } else {
          res.push({
            from: payer,
            to: receiver,
            amount: receiver.debtMinor,
            amountMinor: receiver.debtMinor,
          })
          payer.debtMinor = fromMoneyMinorBigInt(
            toMoneyMinorBigInt(payer.debtMinor) -
              toMoneyMinorBigInt(receiver.debtMinor)
          )
          payer.debt = payer.debtMinor
          receiver.debtMinor = '0'
          receiver.debt = '0'
          break
        }
      }
    }
  }

  return res
}

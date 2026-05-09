export type MoneyMinor = string

const MONEY_MINOR_PATTERN = /^-?(0|[1-9]\d*)$/
const DISPLAY_MONEY_PATTERN = /^-?(?:0|[1-9]\d*)(?:\.\d{1,2})?$/
const MAX_ABS_MINOR = BigInt('999999999999999999')

export function assertMoneyMinor(value: unknown): MoneyMinor {
  if (typeof value !== 'string' || !MONEY_MINOR_PATTERN.test(value)) {
    throw new Error('Invalid money amount')
  }
  const minor = BigInt(value)
  if (absMoneyMinor(minor) > MAX_ABS_MINOR) {
    throw new Error('Money amount out of range')
  }
  return minor.toString()
}

export function parseDisplayMoneyToMinor(value: string): MoneyMinor {
  const trimmed = value.trim()
  if (!DISPLAY_MONEY_PATTERN.test(trimmed)) {
    throw new Error('Invalid money amount')
  }

  const negative = trimmed.startsWith('-')
  const unsigned = negative ? trimmed.slice(1) : trimmed
  const [integerPart, fractionPart = ''] = unsigned.split('.')
  const minor =
    BigInt(integerPart) * 100n + BigInt(fractionPart.padEnd(2, '0') || '0')
  const signedMinor = negative ? -minor : minor

  if (absMoneyMinor(signedMinor) > MAX_ABS_MINOR) {
    throw new Error('Money amount out of range')
  }

  return signedMinor.toString()
}

export function legacyNumberToMoneyMinor(value: unknown): MoneyMinor {
  if (
    typeof value !== 'number' ||
    !Number.isFinite(value) ||
    !Number.isInteger(value) ||
    !Number.isSafeInteger(value)
  ) {
    return '0'
  }
  return assertMoneyMinor(String(value))
}

export function moneyMinorToLegacyNumber(value: unknown): number {
  try {
    const minor = BigInt(assertMoneyMinor(value))
    if (
      minor > BigInt(Number.MAX_SAFE_INTEGER) ||
      minor < BigInt(Number.MIN_SAFE_INTEGER)
    ) {
      return minor > 0n ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER
    }
    return Number(minor)
  } catch {
    return 0
  }
}

export function toMoneyMinorBigInt(value: MoneyMinor): bigint {
  return BigInt(assertMoneyMinor(value))
}

export function fromMoneyMinorBigInt(value: bigint): MoneyMinor {
  return assertMoneyMinor(value.toString())
}

export function addMoneyMinor(left: MoneyMinor, right: MoneyMinor): MoneyMinor {
  return fromMoneyMinorBigInt(
    toMoneyMinorBigInt(left) + toMoneyMinorBigInt(right)
  )
}

export function negateMoneyMinor(value: MoneyMinor): MoneyMinor {
  return fromMoneyMinorBigInt(-toMoneyMinorBigInt(value))
}

export function compareMoneyMinor(left: MoneyMinor, right: MoneyMinor): number {
  const leftValue = toMoneyMinorBigInt(left)
  const rightValue = toMoneyMinorBigInt(right)
  if (leftValue === rightValue) {
    return 0
  }
  return leftValue > rightValue ? 1 : -1
}

export function isZeroMoneyMinor(value: MoneyMinor): boolean {
  return toMoneyMinorBigInt(value) === 0n
}

export function isNegativeMoney(
  value: number | MoneyMinor | undefined | null
): boolean {
  return toMoneyMinorBigInt(toMoneyMinor(value)) < 0n
}

export function splitMoneyMinor(
  amount: MoneyMinor,
  participantCount: number
): MoneyMinor[] {
  if (!Number.isInteger(participantCount) || participantCount < 1) {
    throw new Error('Participant count must be positive')
  }

  const total = toMoneyMinorBigInt(amount)
  const count = BigInt(participantCount)
  const base = total / count
  const remainder = total % count
  const sign = remainder < 0n ? -1n : 1n
  const extraCount = Number(remainder < 0n ? -remainder : remainder)

  return Array.from({ length: participantCount }, (_, index) =>
    fromMoneyMinorBigInt(base + (index < extraCount ? sign : 0n))
  )
}

export function firstSplitMoneyMinor(
  amount: number | MoneyMinor | undefined | null,
  participantCount: number
): MoneyMinor {
  if (!Number.isInteger(participantCount) || participantCount < 1) {
    return '0'
  }
  return splitMoneyMinor(toMoneyMinor(amount), participantCount)[0] || '0'
}

export function numberToString(value: number | MoneyMinor | undefined | null) {
  return formatMoneyMinor(toMoneyMinor(value))
}

export function stringToNumber(str: string) {
  return moneyMinorToLegacyNumber(parseDisplayMoneyToMinor(str))
}

export function toMoneyMinor(value: number | MoneyMinor | undefined | null) {
  if (typeof value === 'string') {
    return assertMoneyMinor(value)
  }
  return legacyNumberToMoneyMinor(value || 0)
}

export function formatMoneyMinor(value: MoneyMinor): string {
  const minor = toMoneyMinorBigInt(value)
  if (minor === 0n) {
    return '0'
  }

  const negative = minor < 0n
  const abs = negative ? -minor : minor
  const integerPart = abs / 100n
  const fractionPart = (abs % 100n).toString().padStart(2, '0')
  const displayFraction =
    fractionPart === '00' ? '0' : fractionPart.replace(/0$/, '')

  return `${negative ? '-' : ''}${integerPart.toString()}.${displayFraction}`
}

function absMoneyMinor(value: bigint): bigint {
  return value < 0n ? -value : value
}

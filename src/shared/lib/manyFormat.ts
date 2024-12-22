export function manyFormat(sum: number | undefined) {
    return new Intl.NumberFormat('ru-RU').format(sum ?? 0)
}
export function getTodayIso(): string {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export function formatDate(isoDate: string): string {
    const [year, month, day] = isoDate.slice(0, 10).split('-')
    if (!year || !month || !day) return isoDate
    return `${day}/${month}/${year}`
}

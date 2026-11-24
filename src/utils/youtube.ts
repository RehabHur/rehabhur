
export function getYoutubeId(url: string): string | null {
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([^&?/]+)/)
    return match?.[1] ?? null
}

export function getEmbedUrl(url: string): string {
    const id = getYoutubeId(url)
    return id ? `https://www.youtube.com/embed/${id}` : url
}

export function getThumbnailUrl(url: string): string {
    const id = getYoutubeId(url)
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : ''
}
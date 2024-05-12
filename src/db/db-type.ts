export type BlogDBType = {
    id: string
    name: string
    description: string
    websiteUrl: string
}

export type PostDBType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string | undefined
}
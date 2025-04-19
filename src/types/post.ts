export type PostByType = {
    name: string,
    email: string,
    id: string,
}
export type Comments = {
    id: string,
    conten: string,
    likes: number,
    created_at: string,
    commented_by: PostByType
}
export type PostType = {
    id: string,
    title: string,
    detail: string,
    likes: number,
    created_at: string,
    updated_at: null,
    posted_by: PostByType,
    image: string | null,
    comments: Comments[]
}
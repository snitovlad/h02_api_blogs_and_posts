import { db } from "../../db/db"
import { PostDBType } from "../../db/db-type"
import { createId } from "../../helper/helper"
import { CreatePostModel } from "../../models/posts-models/CreatePostModel"
import { PostViewModel } from "../../models/posts-models/PostViewModel"
import { UpdatePostModel } from "../../models/posts-models/UpdatePostModel"

export const postsRepository = {

    async findAllPosts(): Promise<PostViewModel[]> {
        return db.posts
    },

    async findPost(id: string): Promise<PostViewModel | undefined> {
        return db.posts.find(p => p.id === id)
    },

    async createPost(input: CreatePostModel): Promise<PostViewModel | { error?: string }> {
        const blogName = db.blogs.find(b => b.id === input.blogId)?.name
        const newPost = {
            id: createId(),
            ...input,
            blogName: blogName
        }
        try {
            db.posts = [...db.posts, newPost]
        } catch (e: any) {
            // log
            return { error: e.message }
        }
        return this.mapToOutput(newPost)
    },

    async deletePost(id: string): Promise<boolean> {
        const foundPost = await this.findPost(id)
        if (foundPost) {
            db.posts = db.posts.filter(p => p.id !== id)
            return true
        } else return false
    },

    async updatePost(id: string, input: UpdatePostModel): Promise<boolean | { error?: string }> {
        let foundPost = await this.findPost(id)
        if (foundPost) {
            foundPost = { ...foundPost, ...input }
            const index = db.posts.findIndex(obj => obj.id === id);

            try {
                db.posts[index] = { ...db.posts[index], ...foundPost }
            } catch (e: any) {

                return { error: e.message }
            }

            return true
        } else {
            return false
        }
    },

    mapToOutput(post: PostDBType): PostViewModel {
        return {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName
        }
    }
}

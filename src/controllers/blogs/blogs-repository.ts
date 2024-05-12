import { db } from "../../db/db";
import { createId } from "../../helper/helper";
import { BlogViewModel } from "../../models/blogs-models/BlogViewModel";
import { CreateBlogModel } from "../../models/blogs-models/CreateBlogModel";
import { UpdateBlogModel } from "../../models/blogs-models/UpdateBlogModel";

export const blogsRepository = {

    async findAllBlogs(): Promise<BlogViewModel[]> {
        return db.blogs
    },

    async findBlog(id: string): Promise<BlogViewModel | undefined> {
        return db.blogs.find(b => b.id === id)
    },

    async createdBlog(input: CreateBlogModel): Promise<BlogViewModel | { error?: string }> {
        const newBlog = {
            id: createId(),
            ...input,
        }
        try {
            db.blogs = [...db.blogs, newBlog]
        } catch (e: any) {
            // log
            return { error: e.message }
        }
        return newBlog
    },

    async deleteBlog(id: string): Promise<boolean> {
        const foundBlog = await this.findBlog(id)
        //const foundBlog = db.blogs.find(b => b.id === id)
        if (foundBlog) {
            db.blogs = db.blogs.filter(b => b.id !== id)
            return true
        } else return false
    },

    async updateBlog(id: string, input: UpdateBlogModel): Promise<boolean | { error?: string }> {
        let foundBlog = await this.findBlog(id)
        //let foundBlog = db.blogs.find(b => b.id === id)
        if (foundBlog) {
            foundBlog = { ...foundBlog, ...input }
            const index = db.blogs.findIndex(obj => obj.id === id);

            try {
                db.blogs[index] = { ...db.blogs[index], ...foundBlog }
            } catch (e: any) {
                // log
                return { error: e.message }
            }

            return true
        } else {
            return false
        }
    },
}
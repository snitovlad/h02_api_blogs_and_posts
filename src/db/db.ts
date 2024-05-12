import { blog1 } from './../../__tests__/datasets';
import { BlogDBType, PostDBType } from './db-type'

export type DBType = { blogs: BlogDBType[], posts: PostDBType[] }

export const db: DBType = {
    blogs: [
        {
            id: "string",
            name: "string",
            description: "string",
            websiteUrl: "https://DYRWHwiC8mf9V8quyGQZG-3DEaI6VWaZkmtQa-P9hTGEcUW7l6wXgi-BgnRIOlCHtohmpWIaz1FS2DbpkxBriOXMQnnF"
        }
    ],
    posts: [
        {
            id: "string",
            title: "string",
            shortDescription: "string",
            content: "string",
            blogId: "string",
            blogName: "string"
        }
    ]
}

//функция, которая будет менять базу данных - это такая оптимизация
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.blogs = []
        //db.posts = []
        // db.some = []
        return
    }
    db.blogs = dataset.blogs || db.blogs
}

export const setPostsDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        db.posts = []
        return
    }
    db.posts = dataset.posts || db.posts
}


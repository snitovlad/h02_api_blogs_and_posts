import { DBType } from '../src/db/db'
import { BlogDBType, PostDBType } from '../src/db/db-type'
import { createId } from '../src/helper/helper'

//наборы данных для тестов:

export const blog1: BlogDBType = {
    id: createId(),
    name: 'name' + Date.now() + Math.random(),
    description: 'description' + Date.now() + Math.random(),
    websiteUrl: "https://DYRWHwiC8mf9V8quyGQZG-3DEaI6VWaZkmtQa.com"
}
export const post1: PostDBType = {
    id: createId(),
    title: 'titleTest',
    shortDescription: 'shortDescription' + Date.now() + Math.random(),
    content: 'content' + Date.now() + Math.random(),
    blogId: blog1.id,
    blogName: blog1.name
}


// ...

export const dataset1: DBType = {
    blogs: [blog1],
    posts: [post1]
}

// export const dataset2: DBType = {
//     blogs: [blog1],
//     posts: [post1]
// }


// ...
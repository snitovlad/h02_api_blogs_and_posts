import { Request, Response } from 'express'
import { CreateBlogModel } from '../../models/blogs-models/CreateBlogModel'
import { ErrorsViewModel } from '../../models/errors-models/ErrorsViewModel'
import { websiteUrlRegex } from '../../helper/helper'
import { BlogViewModel } from '../../models/blogs-models/BlogViewModel'
import { RequestWithBody } from '../../models/requestTypes'
import { blogsRepository } from './blogs-repository'


// const inputValidation = (blog: CreateBlogModel) => {
//     const errors: ErrorsViewModel = {
//         errorsMessages: []
//     }
//     if (!blog.name || blog.name.length > 15 || typeof blog.name !== "string" || !blog.name.trim()) {
//         errors.errorsMessages.push(
//             {
//                 message: "Error!! Invalid name",
//                 field: 'name'
//             }
//         )
//     }
//     if (!blog.description || blog.description.length > 500 || typeof blog.description !== "string" || !blog.description.trim()) {
//         errors.errorsMessages.push(
//             {
//                 message: 'Error!! Invalid description',
//                 field: 'description'
//             }
//         )
//     }
//     if (!blog.websiteUrl || blog.websiteUrl.length > 100 || typeof blog.websiteUrl !== "string"
//         || !blog.websiteUrl.trim() || !websiteUrlRegex.test(blog.websiteUrl)) {
//         errors.errorsMessages.push(
//             {
//                 message: 'Error!! Invalid websiteUrl',
//                 field: 'websiteUrl'
//             }
//         )
//     }
//     return errors
// }


export const createBlogController = async (
    req: RequestWithBody<CreateBlogModel>,
    res: Response<BlogViewModel | ErrorsViewModel | { error?: string }>) => {

    // const errors = inputValidation(req.body)
    // if (errors.errorsMessages.length) {
    //     res
    //         .status(400)
    //         .json(errors)
    //     return
    // }
    const newBlog = await blogsRepository.createdBlog(req.body)

    res
        .status(201)
        .json(newBlog)
}

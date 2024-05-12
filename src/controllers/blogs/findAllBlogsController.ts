import { Request, Response } from 'express'
import { BlogViewModel } from '../../models/blogs-models/BlogViewModel'
import { blogsRepository } from './blogs-repository'


export const findAllBlogsController = async (req: Request, res: Response<BlogViewModel[]>) => {
    const allBlogs = await blogsRepository.findAllBlogs()
    res
        .status(200)
        .json(allBlogs)
}
import { Request, Response } from 'express'
import { PostViewModel } from '../../models/posts-models/PostViewModel'
import { postsRepository } from './posts-repository'

//контроллер для эндпоинта:

export const findAllPostsController = async (req: Request, res: Response<PostViewModel[]>) => {
    const allPosts = await postsRepository.findAllPosts()
    res
        .status(200)
        .json(allPosts)
}
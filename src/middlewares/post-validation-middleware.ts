import { body } from "express-validator";
import { blogsRepository } from "../controllers/blogs/blogs-repository";

export const inputTitlePostValidator = () => body('title')
    .exists().withMessage('Error!! Field is not exist')
    .isString().withMessage('Error!! Field should be string')
    .trim().notEmpty().withMessage('Error!! Field shouldn\'t be empty')
    .isLength({ min: 1, max: 30 }).withMessage('Error!! Invalid field length')

export const inputShortDescriptionPostValidator = () => body('shortDescription')
    .exists().withMessage('Error!! Field is not exist')
    .isString().withMessage('Error!! Field should be string')
    .trim().notEmpty().withMessage('Error!! Field shouldn\'t be empty')
    .isLength({ min: 1, max: 100 }).withMessage('Error!! Invalid field length')

export const inputContentPostValidator = () => body('content')
    .exists().withMessage('Error!! Field is not exist')
    .isString().withMessage('Error!! Field should be string')
    .trim().notEmpty().withMessage('Error!! Field shouldn\'t be empty')
    .isLength({ min: 1, max: 1000 }).withMessage('Error!! Invalid field length')

export const inputBlogIdPostValidator = () => body('blogId')
    .exists().withMessage('Error!! Field is not exist')
    .isString().withMessage('Error!! Field should be string')
    .trim().notEmpty().withMessage('Error!! Field shouldn\'t be empty')
    .isLength({ min: 1, max: 100 }).withMessage('Error!! Invalid field length')
    .custom(async (blogId, { req }) => {                  //есть ли для поста блог с таким id
        const blog = await blogsRepository.findBlog(blogId)
        if (!blog) { throw new Error('BlogId for this post not found') }
        // return x === y
    }).withMessage('Error!! BlogId for this post not found')


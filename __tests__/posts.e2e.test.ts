import { req } from './test-helpers'
import { ADMIN_AUTH, SETTINGS } from '../src/settings'
import { db, setDB, setPostsDB } from '../src/db/db'
import { dataset1 } from './datasets'
import { CreatePostModel } from '../src/models/posts-models/CreatePostModel'
import { UpdatePostModel } from '../src/models/posts-models/UpdatePostModel'

//простой тест:

describe('/posts', () => {
    beforeAll(async () => {
        // await req.delete('/testing/all-data')
    })

    //авторизация
    const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')

    it('should return 200 and empty array', async () => {
        setPostsDB()
        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200)
        //console.log(res.body)
        expect(res.body.length).toBe(0)
    })

    it('should get not empty array', async () => {
        setDB(dataset1)
        setPostsDB(dataset1)
        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200)
        //console.log(res.body)
        expect(res.body.length).toBe(1)
        expect(res.body[0]).toEqual(dataset1.posts[0])
    })

    it('should return 404 for not exiting post', async () => {
        setDB(dataset1)
        setPostsDB(dataset1)

        const res = await req
            .get(SETTINGS.PATH.BLOGS + '/-100') //нет такого id
            .expect(404) // проверка на ошибку
    })

    //создание нового поста
    it('should create post', async () => {
        setDB(dataset1)
        setPostsDB()
        const newPost: CreatePostModel = {
            title: 'titleNew',
            shortDescription: 'shortDescription' + Date.now() + Math.random(),
            content: 'content' + Date.now() + Math.random(),
            blogId: dataset1.blogs[0].id,
        }
        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set({ 'authorization': 'Basic ' + codedAuth }) //авторизация
            .send(newPost) // отправка данных
            .expect(201)

        expect(res.body.title).toBe(newPost.title)
        expect(res.body.shortDescription).toBe(newPost.shortDescription)
        expect(res.body.content).toEqual(newPost.content)
        expect(res.body.blogId).toEqual(dataset1.blogs[0].id)
        expect(res.body.blogName).toEqual(dataset1.blogs[0].name)
    })

    it('shouldn\'t create post with incorrect blogId', async () => {
        setDB(dataset1)
        setPostsDB()
        const newPost: CreatePostModel = {
            title: 'title1',
            shortDescription: 'shortDescription1',
            content: 'content1',
            blogId: 'dataset1.blogs[0].id', //incorrect input content
        }
        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set({ 'authorization': 'Basic ' + codedAuth })
            .send(newPost) // отправка данных
            .expect(400)

        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, [])
    })

    it('shouldn\'t create post with incorrect input name', async () => {
        setDB(dataset1)
        setPostsDB()
        const newPost: CreatePostModel = {
            title: '     ', //incorrect input name
            shortDescription: 'shortDescription' + Date.now() + Math.random(),
            content: 'content' + Date.now() + Math.random(),
            blogId: dataset1.blogs[0].id,
        }
        const res = await req
            .post(SETTINGS.PATH.POSTS)
            .set({ 'authorization': 'Basic ' + codedAuth })
            .send(newPost) // отправка данных
            .expect(400)

        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, [])
    })

    //не должен обновить с некорректными входными данными 
    it(`shouldn't update post with incorrect input data`, async () => {
        setDB(dataset1)
        setPostsDB(dataset1)
        const updatePost: UpdatePostModel = {
            title: 'title1',
            shortDescription: '   ', //incorrect input shortDescription
            content: 'content' + Date.now() + Math.random(),
            blogId: dataset1.blogs[0].id,
        }

        await req
            .put(SETTINGS.PATH.POSTS + '/' + db.posts[0].id)
            .set({ 'authorization': 'Basic ' + codedAuth })
            .send(updatePost)
            .expect(400)
        //проверим, что действительно не создался блог
        const res2 = await req
            .get(SETTINGS.PATH.POSTS + '/' + db.posts[0].id)
            .expect(200, db.posts[0])
        expect(res2.body).toEqual(db.posts[0])
    })

    //не должен обновить с некорректным входным title 
    it(`shouldn't update post with incorrect input data`, async () => {
        setDB(dataset1)
        setPostsDB(dataset1)
        const updatePost: UpdatePostModel = {
            title: '       ', //incorrect input title
            shortDescription: 'shortDescription' + Date.now() + Math.random(),
            content: 'content' + Date.now() + Math.random(),
            blogId: dataset1.blogs[0].id,
        }

        await req
            .put(SETTINGS.PATH.POSTS + '/' + db.posts[0].id)
            .set({ 'authorization': 'Basic ' + codedAuth })
            .send(updatePost)
            .expect(400)
        //проверим, что действительно не создался курс
        const res2 = await req
            .get(SETTINGS.PATH.POSTS + '/' + db.posts[0].id)
            .expect(200, db.posts[0])
        expect(res2.body).toEqual(db.posts[0])
    })

    //не должен обновиться блог, которого нет
    it(`shouldn't update post that not exist`, async () => {
        setDB(dataset1)
        setPostsDB(dataset1)
        const updatePost: UpdatePostModel = {
            title: 'title1',
            shortDescription: 'shortDescription' + Date.now() + Math.random(),
            content: 'content' + Date.now() + Math.random(),
            blogId: dataset1.blogs[0].id,
        }

        await req
            .put(SETTINGS.PATH.POSTS + '/-100')
            .set({ 'authorization': 'Basic ' + codedAuth })
            .send(updatePost)
            .expect(404)
    })

    //должен обновиться пост с корректными входными данными
    it(`should update post with correct input data`, async () => {
        setDB(dataset1)
        setPostsDB(dataset1)
        const updatePost: UpdatePostModel = {
            title: 'title1',
            shortDescription: 'sh1',
            content: 'c1' + Date.now() + Math.random(),
            blogId: dataset1.blogs[0].id,
        }

        const res1 = await req
            .put(SETTINGS.PATH.POSTS + '/' + db.posts[0].id)
            .set({ 'authorization': 'Basic ' + codedAuth })
            .send(updatePost)
            .expect(204)
        //проверим, что действительно обновился пост
        const res2 = await req
            .get(SETTINGS.PATH.POSTS + '/' + db.posts[0].id)
            .expect(200, {
                ...db.posts[0],
                title: updatePost.title,
                shortDescription: updatePost.shortDescription,
                content: updatePost.content
            })
    })

    //удаление поста и возвращение пустого массива
    it(`should delete post and return empty array`, async () => {
        setDB(dataset1)
        setPostsDB(dataset1)
        //проверили, что пост есть в базе данных
        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, dataset1.posts)
        //удалим его
        await req
            .delete(SETTINGS.PATH.POSTS + '/' + db.posts[0].id)
            .set({ 'authorization': 'Basic ' + codedAuth })
            .expect(204)
        //проверим, что действительно удалился
        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, [])
    })

    //не должен удалить несуществующий пост
    it(`shouldn't delete post that not exist`, async () => {
        setDB(dataset1)
        setPostsDB(dataset1)
        //проверили, что пост есть в базе данных
        await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, dataset1.posts)

        await req
            .delete(SETTINGS.PATH.POSTS + '/-100')
            .set({ 'authorization': 'Basic ' + codedAuth })
            .expect(404)
        //проверим, что ничего не удалилось
        await req
            .get(SETTINGS.PATH.POSTS + '/' + db.posts[0].id)
            .expect(200, db.posts[0])
    })
})


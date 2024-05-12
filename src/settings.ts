import { config } from 'dotenv' //забираем спецфункцию из библиотеки dotenv
config() // добавление переменных из файла .env в process.env

export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3004,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TESTING: '/testing'
    },
}

//export const ADMIN_AUTH = 'YWRtaW46cXdlcnR5'
export const ADMIN_AUTH = 'admin:qwerty'
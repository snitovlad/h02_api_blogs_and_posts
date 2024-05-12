

//проверка формата адреса блога
export const websiteUrlRegex = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;

export function createId() {
    return String(Date.now() * 10000 + Math.random() * 1000)
}

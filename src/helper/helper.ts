

//проверка формата адреса блога
export const websiteUrlRegex = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;

export function createId() {
    return String(Date.now() * 10000 + Math.random() * 1000)
}

export function filterOfFirstErrorInEveryField(errors: any[]) {
    let allFields = errors.map(el => el.path)
    let fields: string[] = []
    for (let i = 0; i < allFields.length; i++) {
        if (fields.indexOf(allFields[i]) < 0) {
            fields.push(allFields[i])
        }
    }
    let errorCorrect: any[] = []
    for (let i = 0; i < fields.length; i++) {
        let errorObj = errors.filter(e => e.path === fields[i])[0]
        errorCorrect.push(errorObj)
    }
    //console.log("errorCorrect", errorCorrect);
    return errorCorrect
}

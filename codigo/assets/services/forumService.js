export class ForumService {
    constructor() {
        this.urlBase = ''
    }

    async getPostagens() {
        const resposta = await fetch(this.urlBase)
        return resposta.json()
    }

}
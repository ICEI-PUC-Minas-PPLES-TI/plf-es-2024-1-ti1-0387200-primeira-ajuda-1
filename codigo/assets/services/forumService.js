export class ForumService {
    constructor() {
        this.urlBase = 'https://primeira-ajuda-api.vercel.app/postagens'
    }

    async getPostagens() {
        const resposta = await fetch(this.urlBase)
        return resposta.json()
    }

    async createPostagem(postagem) {
        const resposta = await fetch(this.urlBase, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postagem)
        })
        return resposta.json()
    }

    async updatePostagem(id, postagem) {
        const resposta = await fetch(`${this.urlBase}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postagem)
        })
        return resposta.json()
    }

    async deletePostagem(id) {
        const resposta = await fetch(`${this.urlBase}/${id}`, {
            method: 'DELETE',
        })
        return resposta.json()
    }
}
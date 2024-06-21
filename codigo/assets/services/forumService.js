export class ForumService {
    constructor() {
        this.urlBase = 'https://primeira-ajuda-api.vercel.app/postagens'
    }

    async getPostagens() {
        try {
            const resposta = await fetch(this.urlBase)
            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }

    async getPostagemById(id) {
        try {
            const resposta = await fetch(`${this.urlBase}/${id}`)
            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }

    async createPostagem(postagem) {
        try {
            const resposta = await fetch(this.urlBase, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postagem)
            })
            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }

    async updatePostagem(id, postagem) {
        try {
            const resposta = await fetch(`${this.urlBase}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postagem)
            })
            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }

    async deletePostagem(id) {
        try {
            const resposta = await fetch(`${this.urlBase}/${id}`, {
                method: 'DELETE',
            })
            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }
}
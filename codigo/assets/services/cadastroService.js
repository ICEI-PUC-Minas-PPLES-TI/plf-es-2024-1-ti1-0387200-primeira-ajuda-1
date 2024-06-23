export class CadastroService {
    constructor() {
        this.urlBase = 'https://primeira-ajuda-api.vercel.app/usuarios'
    }

    async getUsuarios() {
        try {
            const resposta = await fetch(this.urlBase)
            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }

    async getUsuariosById(id) {
        try {
            const resposta = await fetch(`${this.urlBase}/${id}`)
            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }

    async createUsuario(usuario) {
        try {
            const resposta = await fetch(this.urlBase, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuario)
            })
            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }

    async updateUsuario(id, usuario) {
        try {
            const resposta = await fetch(`${this.urlBase}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuario)
            })
            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }

    async deleteUsuario(id) {
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
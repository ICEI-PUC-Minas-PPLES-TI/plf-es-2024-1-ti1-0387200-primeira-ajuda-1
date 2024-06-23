export class QuizService {
    constructor() {
        this.urlBase = 'https://primeira-ajuda-api.vercel.app/perguntas'
    }

    async getPerguntas() {
        try {
            const resposta = await fetch(this.urlBase)
            return resposta.json()
        } catch (error) {
            console.error(error)
            return [];
        }
    }

    async getPerguntaById(id) {
        try {
            const resposta = await fetch(`${this.urlBase}/${id}`)
            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }

    async createPergunta(pergunta) {
        try {
            const resposta = await fetch(this.urlBase, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pergunta)
            });
            return resposta.json();
        } catch (error) {
            console.error(error);
        }
    }

    async updatePergunta(id, pergunta) {
        try {
            const resposta = await fetch(`${this.urlBase}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pergunta)
            })
            return resposta.json()
        } catch (error) {
            console.error(error)
        }
    }

    async deletePergunta(id) {
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

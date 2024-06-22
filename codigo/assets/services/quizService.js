export class ApiService {
    constructor() {
        this.urlBase = 'https://primeira-ajuda-api.vercel.app/perguntas'
    }

    async getPerguntas() {
        try {
            const response = await fetch(this.urlBase);
            if (!response.ok) {
                throw new Error('Erro ao buscar perguntas');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async addPergunta(pergunta) {
        try {
            const response = await fetch(this.urlBase, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pergunta)
            });
            if (!response.ok) {
                throw new Error('Erro ao adicionar pergunta');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

const apiService = new ApiService();
export default apiService;
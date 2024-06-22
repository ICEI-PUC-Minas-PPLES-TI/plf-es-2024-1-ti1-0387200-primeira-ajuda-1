const baseUrl = 'https://primeira-ajuda-api.vercel.app/usuarios'

export async function getUsuario(id) {
    const response = await fetch(`${baseUrl}/${id}`);
    if (!response.ok) {
        console.error("Erro ao buscar o usuário", response.status);
        return null;
    }
    return await response.json();
}

export async function updateUsuario(id, usuario) {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });
    if (!response.ok) {
        console.error("Erro ao atualizar o usuário", response.status);
        return null;
    }
    return await response.json();
}

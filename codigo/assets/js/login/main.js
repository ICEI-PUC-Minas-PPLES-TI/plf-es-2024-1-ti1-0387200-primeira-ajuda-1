const usuario = JSON.parse(localStorage.getItem('usuario'))

const consultarSeletor = (variante) => document.querySelector(variante)
const avatar = consultarSeletor('#avatar')
const login = consultarSeletor('#login')
const logout = consultarSeletor('#logout')

logout.addEventListener('click', () => {
    localStorage.setItem('usuario', JSON.stringify({}))
    window.location.href = `/codigo/index.html`
})

window.addEventListener('DOMContentLoaded', () => {
    if (Object.values(usuario).length !== 0) {
        avatar.src = usuario.avatar
        logout.style.display = 'flex'
        login.style.display = 'none'
    } else {
        logout.style.display = 'none'
        login.style.display = 'flex'
    }
})
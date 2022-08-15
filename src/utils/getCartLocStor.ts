export const getCartLocStor = () => {
    const data = localStorage.getItem('cart')

    return data ? JSON.parse(data) : []
}
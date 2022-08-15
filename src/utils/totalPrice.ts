export const totalPrice = (cartItems: any) => {
    return cartItems.reduce((acc: number, el: any) => (acc += el.price * el.count), 0)
}
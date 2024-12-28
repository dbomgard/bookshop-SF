const getCartItems = () => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
};


const saveCartItems = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
};


const updateCartCountDisplay = (count) => {
    const cartCounter = document.querySelector(".cart_counter");
    cartCounter.textContent = count;
    cartCounter.style.display = count > 0 ? "block" : "none";
}


const clearLocalStorage = () => {
    localStorage.clear();
};

export {getCartItems, saveCartItems, updateCartCountDisplay, clearLocalStorage}

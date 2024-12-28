import { getCartItems, saveCartItems, updateCartCountDisplay } from './localStorage.js';




const cartCounter = document.querySelector(".cart_counter")


let cartItems = getCartItems() || []; 
let cartCount = cartItems.length;



updateCartCountDisplay(cartCount)


const countCartItems = (event) => {
    if (event.target.classList.contains("info_btn")){
        const btn = event.target
        const bookId = btn.dataset.bookId
        const isActive = btn.classList.contains("added");

            if (!isActive) {
                cartItems.push(bookId);
                cartCount++;
                btn.textContent = "In the cart";
                btn.classList.add("added");
                cartCounter.style.display = "block";
            } else {
                const index = cartItems.indexOf(bookId);
                if (index > -1) {
                    cartItems.splice(index, 1);
                    cartCount--;
                    btn.textContent = "Buy now";
                    btn.classList.remove("added");
                }
            }

            saveCartItems(cartItems); 
            updateCartCountDisplay(cartCount); 

    }
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".info_btn");
    buttons.forEach(btn => {
        const bookId = btn.dataset.bookId;
        if (cartItems.includes(bookId)) {
            btn.textContent = "In the cart";
            btn.classList.add("added");
        } else {
            btn.textContent = "Buy now"; 
        }
    });

    document.addEventListener("click", countCartItems);
});
   
export {countCartItems}
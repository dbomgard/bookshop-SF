
import { getCartItems } from "./localStorage.js"
let cartItems = getCartItems() || []
const categoriesLink = document.querySelectorAll(".categories_link")
const cardsBlock = document.querySelector(".cards_block")


const params = new URLSearchParams({})
let startIndex = 0
params.append("key", "AIzaSyBfjVWmSbeEwt2vNv9Sot1czhDFxchs3GM")
params.append("printType", "books")
params.append("startIndex", startIndex)
params.append("maxResults", "6")
params.append("langRestrict", "en")

const getCategory = () => {
    let activeCategory = document.querySelector(".categories_link.active").dataset.category
    return activeCategory
}

const selectCategory = (item) => {
    categoriesLink.forEach(link => link.classList.remove("active"))
    item.classList.add("active")
    cardsBlock.innerHTML = ""
    params.set("startIndex", "0")
    useRequest(displayBooks)
}



async function useRequest(callback) {
    try {
        let requestUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${getCategory()}&${params.toString()}`
        const response = await fetch(requestUrl);
        
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const data = await response.json();
        if (callback) {
            callback(data.items);
        }
    } catch (error) {
        console.error('Ошибка!', error);
    }
}


const displayBooks = (books) => {
    let title = ' '
    let authors = ''; 
    let thumbnail = ''; 
    let price = ''; 
    let averageRating = ''; 
    let ratingsCount = ''; 
    let description = ''; 

    
    books.forEach((book) => {
        console.log(book.id)
        authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown' 
        thumbnail = book.volumeInfo.imageLinks.thumbnail || ''
        title = book.volumeInfo.title || "Unknown"
        description = book.volumeInfo.description || "No description"
        price = book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount + " " + book.saleInfo.retailPrice.currencyCode : "Unavailable"

        ratingsCount = book.volumeInfo.averageRating ? book.volumeInfo.ratingsCount : " "

        averageRating = book.volumeInfo.averageRating || 0; 
        averageRating = Math.round(averageRating);

        
        let ratingStars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= averageRating) {
                ratingStars +=  `<img src="../../assets/star_active.svg" alt="" class="raiting_star">`
            } else {
                ratingStars += `<img src="../../assets/star.svg" alt="" class="raiting_star">`;
            }
        }

        const card = document.createElement("div")
        card.classList.add("cards_item")

        card.innerHTML = `<img src = ${thumbnail} alt="book cover" class="card_img">

                <div class="card_info">
                    <div class="info_author">${authors}</div>
                    <div class="info_title">${title}</div>
                    <div class="info_raiting">
                        <div>${ratingStars}</div>
                        ${ratingsCount} review</div>
                    <p class="info_text">${description}</p>
                    <div class="info_cost">${price}</div>
                    <button class="info_btn ${cartItems.includes(book.id)? "added" : ""}" data-book-id="${book.id}">
                        ${cartItems.includes(book.id) ? "in the cart" : "buy now"}
                    </button>
                </div>`
        cardsBlock.appendChild(card)
    })   
}

const loadMore = () => {
    startIndex +=6
    
    params.set("startIndex", startIndex)
    useRequest(displayBooks)
}

export {useRequest, displayBooks, selectCategory, loadMore}
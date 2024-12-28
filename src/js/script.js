import {selectImg, sliderAutoplay} from "./slider.js"
import {selectCategory, useRequest, displayBooks, loadMore} from "./renderBooks.js"
import {countCartItems} from "./cart.js"


const dotsParent = document.querySelector(".dots")
const categoriesLink = document.querySelectorAll(".categories_link")
const loadBtn = document.querySelector('.load_btn')
const navLinks = document.querySelectorAll('.nav_link')


const selectNavLink = (item) => {
    navLinks.forEach(link => link.classList.remove("active"))
    item.classList.add("active")
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        selectNavLink(link)
    })
})

document.addEventListener('DOMContentLoaded', sliderAutoplay())

dotsParent.addEventListener('click', event => {
    const id = event.target.dataset.id

    if (!id) return;
    selectImg(+id)
})


categoriesLink.forEach(link => {
    link.addEventListener('click', (event) => {
        selectCategory(link)
        event.preventDefault()
    })
})


useRequest(displayBooks)

loadBtn.addEventListener('click', () => {
    loadMore()
})


document.addEventListener('click', (event) => {
    countCartItems(event)
})

















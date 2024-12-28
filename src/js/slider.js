const dots = document.querySelectorAll('.dot')
const sliderImg = document.querySelector(".slider_img")

const imagesSrc = [
    {
        src: "../../assets/banner_first.png"
    },
    {
        src: "../../assets/banner_second.png"
    },
    {
        src: "../../assets/banner_third.png"
    }
]

const autoplayInterval = 5000

const selectImg = (id) => {
    sliderImg.src = imagesSrc[id-1].src
    dots.forEach(item => item.classList.remove("active"))

    dots[id-1].classList.add("active")
}

const changeImg = (index) => {
    sliderImg.src = imagesSrc[index].src

    dots.forEach(item => item.classList.remove("active"))

    dots[index].classList.add("active")
}


function sliderAutoplay() {
    setInterval(() => {
      let current = +document.querySelector(".dot.active").dataset.id - 1;
      let next = current === imagesSrc.length - 1? 0 : current + 1;
      changeImg(next);
    }, autoplayInterval);
}


export {changeImg, selectImg, imagesSrc, autoplayInterval, sliderAutoplay}
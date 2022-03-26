document.addEventListener('DOMContentLoaded', function() {
    let dogImageContainer = document.getElementById('dog-image-container')
    let dogUL = document.getElementById('dog-breeds')
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(function(jsonObject){
        let arrOfDogURLs = jsonObject.message
        arrOfDogURLs.forEach(url => {
            dogImageContainer.innerHTML += makeImageTagString(url)
        })
    })
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(response => {
        let dogBreedsArray = Object.keys(response.message)
        dogBreedsArray.forEach((breed) => {
            dogUL.innerHTML += `<li data-info="breed">${breed}</li>`
        })
    })
    dogUL.addEventListener("click", (event) => {
        if (event.target.dataset.info === "breed") {
            event.target.style.color = "green"
        }
    })
    let dogSelect = document.getElementById('breed-dropdown')
    dogSelect.addEventListener("change", (event) => {
        fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(response => {
            let dogBreedsArray = Object.keys(response.message)
            let filteredArray = dogBreedsArray.filter(breed => {
               return breed.startsWith(event.target.value) 
            })
            dogUL.innerHTML = ""
            filteredArray.forEach((breed) => {
                dogUL.innerHTML += `<li data-info="breed">${breed}</li>`
            })
        })
})
})


function makeImageTagString(url) { 
    return `<img src="${url}"/>`
}

// write your code here
let menu = document.querySelector('#ramen-menu')
let image = document.querySelector('.detail-image')
let dishName = document.querySelector('.name')
let restaurant = document.querySelector('.restaurant')
let rating = document.querySelector('#rating-display')
let comment = document.querySelector('#comment-display')
let form = document.querySelector('#new-ramen')

fetch('http://localhost:3000/ramens')
.then( resp => resp.json() )
.then ( ramenData => {
  image.src = ramenData[0].image
  dishName.innerHTML = ramenData[0].name
  restaurant.innerHTML = ramenData[0].restaurant
  rating.innerHTML = ramenData[0].rating
  comment.innerHTML = ramenData[0].comment
  ramenData.forEach( ramen => handleRamen(ramen) )
} )

form.addEventListener('submit', handleForm)

function handleRamen(ramen){
  let img = document.createElement('img')
  img.src = ramen.image
  img.addEventListener('click', function(e){
    //console.log(e.target)
    image.src = ramen.image
    dishName.innerHTML = ramen.name
    restaurant.innerHTML = ramen.restaurant
    rating.innerHTML = ramen.rating
    comment.innerHTML = ramen.comment

  })
  menu.appendChild(img)
}

function handleForm(e){
  e.preventDefault()
  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      'name': `${e.target.name.value}`,
      'image': `${e.target.image.value}`,
      "comment": `${e.target.comment.value}`,
      "rating": `${e.target.rating.value}`,
      "restaurant": `${e.target.restaurant.value}`

      }),
    })
  .then( resp => resp.json() )
  .then( ramen => handleRamen(ramen) )
  form.reset()
}

function deleteObj(id){
  fetch(`http://localhost:3000/ramens/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  }
})
.then(res => res.json())
.then( obj => console.log(obj))
}
const BASE_URLG = "https://rickandmortyapi.com/api/character/"
const BASE_URLP = "http://localhost:3000/characters"
let characterResults = [];
let randomNumberArray = [];
let imageGalleryArray =[];
let click1 = true;
const topGallery = document.querySelector("#top-gallery")
const bottomGallery = document.querySelector("#bottom-gallery")
const searchForm =document.createElement("form")
const characterSearchDiv = document.querySelector("#character-search")
const searchSelect = document.createElement("select")
const searchSelctArray = ["Dead","Alive","Unknown Status","Male","Female","Unknown Gender","Human","Mythological Creature","Alien"]
const characterImg = document.querySelector("#character-img")
const characterInfo = document.querySelector("#character-info")
let characterNameArray = []
init();
function init(){
    getAllCharacters()
    give8RandomNumbers()
    getGalleryCharacter()
  //delayDataPull();
  createSearchForm()
}
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                 Populating Image Gallery             ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
function getAllCharacters(){
  fetch(BASE_URLP)
  .then(resp => resp.json())
  .then(data => {
    characterResults.push(data)
  }) 
}
function give8RandomNumbers(){                  // WORKS
  for(let i = 0; i < 8; i++){
      randomNumberArray.push(Math.floor(Math.random()*671))
  }
  return randomNumberArray
}

function getGalleryCharacter(){
    fetch(BASE_URLP)
    .then(resp => resp.json())
    .then(data => {
        randomNumberArray.forEach(num => imageGalleryArray.push(data[num]))
        createGalleryImg()
  })
}

// console.log(imageGalleryArray)
function createGalleryImg(){
    imageGalleryArray.forEach(image => {
        const imageG = document.createElement("img")
        imageG.src = `${image.image}`
        imageG.style = "height: 150px; width: 150px"
        imageG.id =`ig${image.id}`
        topGallery.childElementCount >= 4?  bottomGallery.append(imageG):topGallery.append(imageG)
        //imageG.addEventListener("click", /*()=>console.log(image)*/)

    })
}

function createSearchForm(){
  characterSearchDiv.append(searchForm)
  const searchInputText = document.createElement("input")
  const searchInputBtn = document.createElement("input")
  searchInputBtn.type = "submit"
  searchInputBtn.textContent ="submit"
  searchInputText.type ="text"
  searchForm.append(searchSelect)
  searchForm.append(searchInputText)
  searchForm.append(searchInputBtn)
  searchSelctArray.forEach(element => {
    const searchSelectOption = document.createElement("option")
    searchSelectOption.textContent = element
    searchSelect.append(searchSelectOption)
  })
  ///// ignore first click of the searchSelect Dropdown
  searchSelect.addEventListener("click", ()=> {
    if(click1 === true) {
      click1 = false
     } else{
      searchSelect.value
      return click1 = true
    }
  })
  //// eventlistener for the searchInputText.value

  searchForm.addEventListener("submit", (e) =>{
    e.preventDefault()
  
    displaySearchResult(searchInputText.value)
  })
  
}


function displaySearchResult (searchInputText){
    console.log(searchInputText)
    for(let i=0;i<671;i++){
      characterNameArray.push(characterResults[0][i].name)
    }
    console.log(characterNameArray)
    // const indexFoundAt = characterResults.findIndex(element => console.log())
    console.log(indexFoundAt)
    // console.log(characterResults.filter(name => {
    //   if(searchInputText.value === name){
        

    //   }
    // })
} 






//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////                Original DATAPULL FROM API            ////\\////\\////\\////\\//
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
// async function delayDataPull(){
//   for (let i = 1; i < 671; i++) {
//     await sleep(2000)
//     getData(i)
//   }
// }
// function sleep(milliseconds){
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }
// function getData(characterNum) {
//   fetch(`${BASE_URLG}${characterNum}`)
//     .then((resp) => resp.json())
//     .then((data) => {
//       postToDBJSON(data)
//   });
// }
// function postToDBJSON (character){    
//     fetch(BASE_URLP,{                         
//         method: "POST",
//         headers: {"Content-Type":"application/json"},
//         body: JSON.stringify(character),
//     })
//     .then(resp=>resp.json())
//     .then(data=>data)
// }
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
//\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\////\\
// function displayCharacter(randomNum){
//     console.log(characterResult[0])
//     console.log(randomNum)
// }
    // give8RandomNumbers()                      // WORKS
    //getAllCharacters()                        // WORKS
    // displayCharacter()
    // intialNumPagePull()
    // getMissingCharacters()
// // make an randomizer to give us numbers between 1 to 671 to get ids
// //with the ids we results[${idfromrandomizer}]
// //create empty array tho shove in all results for that id
// //array.image into a for loop to store
// //then make img tags with a loop to place each url into the image.src
// //give img src style so that the boxes are limited to a size
//look into our database and pull all ids and put in array
// function addToDB(addData) {
//     fetch(BASE_URLP, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(addData)
//     })
//       .then(resp => resp.json())
//       .then(data => data)
//   }
// function getAllCharacters(){                   // WORKS
//     fetch(BASE_URLP)
//     .then(resp => resp.json())
//     .then(data => {
//         console.log(randomNumberArray)
//         randomNumberArray.forEach(element => imgIDCharacterImageGallery.push(data[element]))
//         console.log(data)
//         console.log(imgIDCharacterImageGallery)
//     })
// }
// function getMissingCharacters() {
//   fetch(BASE_URLP)
//     .then((resp) => resp.json())
//     .then((data) => {
//         forLoop(data)
//     });
// }
// function forLoop(data){
//   let num = data.length
//   for (let i = 0; i < num; i++){  
//       characterResults.push(data[i].id)
//   }
//   newGetRequstforMissingChars(characterResults)
// }
// let saveIDsToGet = []
// function newGetRequstforMissingChars(characterResults){
//   characterResults.forEach(element => { 
//    for(let i = 1; i < 671; i++){
//     if(i !== element){
//       saveIDsToGet.push(i)
//     }}
//   })
// }
